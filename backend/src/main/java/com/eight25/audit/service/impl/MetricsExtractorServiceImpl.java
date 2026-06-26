package com.eight25.audit.service.impl;

import com.eight25.audit.dto.response.MetricsResponse;
import com.eight25.audit.service.MetricsExtractorService;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.net.URI;

/**
 * Jsoup-backed implementation of {@link MetricsExtractorService}.
 *
 * <p>Each extraction concern is isolated in a dedicated private method.
 * The original {@link Document} is never mutated — clones are used where
 * structural removal is required (word count).</p>
 *
 * <p>No scores are calculated; no AI is called.</p>
 */
@Slf4j
@Service
public class MetricsExtractorServiceImpl implements MetricsExtractorService {

    private static final String NOT_AVAILABLE = "Not Available";

    /**
     * CSS selector for elements that should be excluded from word counting.
     * Targets non-content structural/technical tags.
     */
    private static final String NOISE_SELECTOR =
            "script, style, noscript, svg, canvas, header, footer, nav";

    /**
     * CSS selector union for CTA elements:
     * semantic buttons, submit inputs, ARIA role overrides, and class-based patterns.
     */
    private static final String CTA_SELECTOR =
            "button, input[type=submit], [role=button], "
            + "[class*=btn], [class*=button], [class*=primary], [class*=cta]";

    // ── Private data carriers (implementation details, not public API) ────────

    private record LinkMetrics(int internal, int external) {}

    private record ImageMetrics(int count, double missingAltPercentage) {}

    private record PageMetadata(String title, String description, String language) {}

    // ─────────────────────────────────────────────────────────────────────────
    // Public API
    // ─────────────────────────────────────────────────────────────────────────

    @Override
    public MetricsResponse extract(Document document) {
        log.debug("Extracting metrics for: {}", document.baseUri());

        LinkMetrics  links    = extractLinks(document);
        ImageMetrics images   = extractImages(document);
        PageMetadata metadata = extractMetadata(document);
        int[]        headings = extractHeadings(document);

        return MetricsResponse.builder()
                .wordCount(extractWordCount(document))
                .h1Count(headings[0])
                .h2Count(headings[1])
                .h3Count(headings[2])
                .ctaCount(extractCTA(document))
                .internalLinks(links.internal())
                .externalLinks(links.external())
                .imageCount(images.count())
                .missingAltPercentage(images.missingAltPercentage())
                .metaTitle(metadata.title())
                .metaDescription(metadata.description())
                .language(metadata.language())
                .build();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Private extraction methods
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Counts visible words in the page body, excluding noise elements
     * ({@code script}, {@code style}, {@code noscript}, {@code svg},
     * {@code canvas}, {@code header}, {@code footer}, {@code nav}).
     *
     * <p>The body is cloned before removal so the original document is not
     * mutated.</p>
     */
    private int extractWordCount(Document document) {
        Element body = document.body();
        if (body == null) {
            return 0;
        }

        Element clone = body.clone();
        clone.select(NOISE_SELECTOR).remove();

        String text = clone.text().trim();
        if (text.isEmpty()) {
            return 0;
        }

        return text.split("\\s+").length;
    }

    /**
     * Returns h1, h2, and h3 counts as a three-element int array
     * ({@code [h1Count, h2Count, h3Count]}).
     */
    private int[] extractHeadings(Document document) {
        return new int[]{
                document.select("h1").size(),
                document.select("h2").size(),
                document.select("h3").size()
        };
    }

    /**
     * Counts distinct call-to-action elements using a CSS union selector.
     * Jsoup deduplicates elements automatically when a union selector is used,
     * so an element matching multiple criteria is counted only once.
     */
    private int extractCTA(Document document) {
        return document.select(CTA_SELECTOR).size();
    }

    /**
     * Classifies all {@code <a href>} anchors as internal or external by
     * comparing the resolved absolute URL host against the document's own host.
     *
     * <p>Relative URLs are normalised via Jsoup's {@code absUrl("href")} which
     * uses the document's base URI automatically.</p>
     */
    private LinkMetrics extractLinks(Document document) {
        String pageHost = extractHost(document.baseUri());
        int internal = 0;
        int external = 0;

        for (Element anchor : document.select("a[href]")) {
            String absHref = anchor.absUrl("href").trim();
            if (absHref.isEmpty()) {
                continue;
            }

            String linkHost = extractHost(absHref);
            if (linkHost.isEmpty()) {
                continue;
            }

            if (linkHost.equalsIgnoreCase(pageHost)) {
                internal++;
            } else {
                external++;
            }
        }

        return new LinkMetrics(internal, external);
    }

    /**
     * Counts all {@code <img>} elements and calculates the percentage that
     * have a missing or empty {@code alt} attribute.
     *
     * <p>An image is considered to have a missing alt if the attribute is
     * absent entirely or its value is blank (empty string or whitespace only).</p>
     */
    private ImageMetrics extractImages(Document document) {
        Elements images = document.select("img");
        int total = images.size();

        if (total == 0) {
            return new ImageMetrics(0, 0.0);
        }

        long missingAlt = images.stream()
                .filter(img -> img.attr("alt").isBlank())
                .count();

        double percentage = roundToTwoDecimals((missingAlt * 100.0) / total);
        return new ImageMetrics(total, percentage);
    }

    /**
     * Extracts the page title, meta description, and HTML language attribute.
     * Returns {@link #NOT_AVAILABLE} for any value that is absent or blank.
     */
    private PageMetadata extractMetadata(Document document) {
        String title = document.title().trim();
        if (title.isEmpty()) {
            title = NOT_AVAILABLE;
        }

        String description = document
                .select("meta[name=description]")
                .attr("content")
                .trim();
        if (description.isEmpty()) {
            description = NOT_AVAILABLE;
        }

        String language = document.select("html").attr("lang").trim();
        if (language.isEmpty()) {
            language = NOT_AVAILABLE;
        }

        return new PageMetadata(title, description, language);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Utility helpers
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Parses the host component from a URL string.
     * Returns an empty string if the URL is malformed or has no host.
     */
    private String extractHost(String url) {
        if (url == null || url.isBlank()) {
            return "";
        }
        try {
            String host = URI.create(url).getHost();
            return host != null ? host : "";
        } catch (IllegalArgumentException e) {
            log.trace("Could not parse host from URL '{}': {}", url, e.getMessage());
            return "";
        }
    }

    /**
     * Rounds a double to two decimal places.
     */
    private double roundToTwoDecimals(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}

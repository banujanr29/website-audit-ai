package com.eight25.audit.service.impl;

import com.eight25.audit.exception.InvalidUrlException;
import com.eight25.audit.exception.WebsiteFetchException;
import com.eight25.audit.service.WebsiteScraperService;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Connection;
import org.jsoup.HttpStatusException;
import org.jsoup.Jsoup;
import org.jsoup.UnsupportedMimeTypeException;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.SocketTimeoutException;

/**
 * Jsoup-backed implementation of {@link WebsiteScraperService}.
 *
 * <p>Responsibilities:
 * <ol>
 *   <li>Validate the URL scheme before any I/O is attempted.</li>
 *   <li>Configure and execute the Jsoup connection.</li>
 *   <li>Map low-level network / Jsoup exceptions to domain exceptions.</li>
 * </ol>
 *
 * <p>No HTML parsing, metric extraction, or AI logic is performed here.
 * The returned {@link Document} is handed directly to the caller.</p>
 */
@Slf4j
@Service
public class WebsiteScraperServiceImpl implements WebsiteScraperService {

    private static final int TIMEOUT_MS = 15_000;

    private static final String USER_AGENT =
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            + "AppleWebKit/537.36 (KHTML, like Gecko) "
            + "Chrome/125.0.0.0 Safari/537.36";

    // ---------------------------------------------------------------
    // Public API
    // ---------------------------------------------------------------

    /**
     * {@inheritDoc}
     *
     * <p>The Jsoup connection is configured with:
     * <ul>
     *   <li>15-second combined connect + read timeout</li>
     *   <li>Redirect following enabled</li>
     *   <li>Realistic Chrome User-Agent to avoid bot-detection blocks</li>
     *   <li>Content-type checking disabled (handles non-HTML responses gracefully)</li>
     *   <li>{@code Accept-Encoding: gzip, deflate, br} header to request compression</li>
     * </ul>
     */
    @Override
    public Document fetch(String url) {
        validateUrl(url);

        log.info("Fetching URL: {}", url);

        try {
            Document document = buildConnection(url).get();
            log.debug("Successfully fetched [{}] — title: \"{}\"", url, document.title());
            return document;

        } catch (SocketTimeoutException e) {
            throw new WebsiteFetchException(
                    "Request timed out after " + TIMEOUT_MS + "ms while fetching: " + url, e);

        } catch (HttpStatusException e) {
            throw new WebsiteFetchException(
                    "HTTP " + e.getStatusCode() + " received from: " + url, e);

        } catch (UnsupportedMimeTypeException e) {
            throw new WebsiteFetchException(
                    "Unsupported content type '" + e.getMimeType() + "' returned by: " + url, e);

        } catch (IOException e) {
            throw new WebsiteFetchException(
                    "Failed to fetch URL '" + url + "': " + e.getMessage(), e);
        }
    }

    // ---------------------------------------------------------------
    // Private helpers
    // ---------------------------------------------------------------

    /**
     * Validates that {@code url} is non-blank and begins with a supported scheme.
     *
     * @throws InvalidUrlException if validation fails
     */
    private void validateUrl(String url) {
        if (url == null || url.isBlank()) {
            throw new InvalidUrlException("URL must not be null or blank");
        }

        String trimmed = url.trim();
        if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
            throw new InvalidUrlException(
                    "URL must begin with 'http://' or 'https://', got: '" + trimmed + "'");
        }
    }

    /**
     * Constructs a fully configured Jsoup {@link Connection} for the given URL.
     */
    private Connection buildConnection(String url) {
        return Jsoup.connect(url)
                .timeout(TIMEOUT_MS)
                .followRedirects(true)
                .userAgent(USER_AGENT)
                .ignoreContentType(true)
                .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
                .header("Accept-Language", "en-US,en;q=0.9")
                .header("Accept-Encoding", "gzip, deflate, br")
                .header("Connection", "keep-alive");
    }
}

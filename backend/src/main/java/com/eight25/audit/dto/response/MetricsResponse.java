package com.eight25.audit.dto.response;

import lombok.Builder;
import lombok.Value;

/**
 * Raw page metrics extracted from the scraped HTML.
 *
 * <p>Counts and text values are populated by the scraper layer.
 * Percentage fields are expressed as {@code 0.0 – 100.0}.</p>
 */
@Value
@Builder
public class MetricsResponse {

    // ── Content structure ─────────────────────────────────────────

    /** Total number of words on the page. */
    Integer wordCount;

    /** Number of {@code <h1>} elements. */
    Integer h1Count;

    /** Number of {@code <h2>} elements. */
    Integer h2Count;

    /** Number of {@code <h3>} elements. */
    Integer h3Count;

    // ── Engagement ────────────────────────────────────────────────

    /** Number of identified call-to-action elements. */
    Integer ctaCount;

    // ── Links ─────────────────────────────────────────────────────

    /** Number of links pointing to the same domain. */
    Integer internalLinks;

    /** Number of links pointing to external domains. */
    Integer externalLinks;

    // ── Images ───────────────────────────────────────────────────

    /** Total number of {@code <img>} elements on the page. */
    Integer imageCount;

    /**
     * Percentage of images missing an {@code alt} attribute,
     * expressed as {@code 0.0 – 100.0}.
     */
    Double missingAltPercentage;

    // ── SEO meta ─────────────────────────────────────────────────

    /** Content of the {@code <title>} tag; {@code null} if absent. */
    String metaTitle;

    /** Content of the {@code <meta name="description">} tag; {@code null} if absent. */
    String metaDescription;
}

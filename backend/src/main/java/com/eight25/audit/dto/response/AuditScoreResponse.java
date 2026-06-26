package com.eight25.audit.dto.response;

import lombok.Builder;
import lombok.Value;

/**
 * Aggregated scores for each audit category.
 *
 * <p>Each score is expressed as a value from {@code 0} to {@code 100}.
 * A {@code null} value indicates that the category could not be scored
 * (e.g. not enough data).</p>
 */
@Value
@Builder
public class AuditScoreResponse {

    /** Weighted average of all category scores. */
    Double overall;

    /** Search engine optimisation score. */
    Double seo;

    /** Content quality and depth score. */
    Double content;

    /** Accessibility score (WCAG alignment). */
    Double accessibility;

    /** Call-to-action effectiveness score. */
    Double cta;

    /** Image optimization score. */
    Double images;
}

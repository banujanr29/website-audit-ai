package com.eight25.audit.dto.response;

import lombok.Builder;
import lombok.Value;

/**
 * A single actionable recommendation produced by the audit.
 *
 * <p>Recommendations are ordered by {@link Priority} in the enclosing
 * {@link AuditResponse} list so consumers can address the most critical
 * issues first.</p>
 */
@Value
@Builder
public class RecommendationResponse {

    /**
     * Urgency level of this recommendation.
     *
     * @see Priority
     */
    Priority priority;

    /**
     * Short, actionable headline for the recommendation
     * (e.g. "Add a meta description to improve CTR").
     */
    String title;

    /**
     * Detailed explanation of why this change is important and
     * what impact it is expected to have.
     */
    String reason;
}

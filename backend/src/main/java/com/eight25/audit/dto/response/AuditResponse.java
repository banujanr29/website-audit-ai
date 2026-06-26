package com.eight25.audit.dto.response;

import lombok.Builder;
import lombok.Value;

import java.util.List;

/**
 * Top-level audit response returned by {@code POST /api/audit}.
 *
 * <p>Aggregates every aspect of the analysis into a single, self-contained
 * payload: the audited URL, category scores, raw page metrics, AI-generated
 * insights, prioritised recommendations, and an optional prompt trace log.</p>
 */
@Value
@Builder
public class AuditResponse {

    /**
     * The URL that was audited, normalised to its canonical form
     * (e.g. {@code https://example.com/}).
     */
    String url;

    /**
     * Numeric scores for each audit category and an overall composite score.
     *
     * @see AuditScoreResponse
     */
    AuditScoreResponse score;

    /**
     * Raw quantitative page metrics extracted from the scraped HTML.
     *
     * @see MetricsResponse
     */
    MetricsResponse metrics;

    /**
     * Qualitative, AI-generated analysis across five audit dimensions.
     *
     * @see AIInsightsResponse
     */
    AIInsightsResponse insights;

    /**
     * Ordered list of actionable recommendations, sorted from highest
     * to lowest {@link Priority}.
     *
     * @see RecommendationResponse
     */
    List<RecommendationResponse> recommendations;

    /**
     * Full trace of the LLM prompt exchange.
     * May be {@code null} when prompt logging is disabled.
     *
     * @see PromptLogResponse
     */
    PromptLogResponse promptLogs;
}

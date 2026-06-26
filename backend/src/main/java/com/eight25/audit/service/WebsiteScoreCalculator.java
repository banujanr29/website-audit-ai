package com.eight25.audit.service;

import com.eight25.audit.dto.response.AuditScoreResponse;
import com.eight25.audit.dto.response.MetricsResponse;

/**
 * Calculates a deterministic audit score based on factual page metrics.
 */
public interface WebsiteScoreCalculator {

    /**
     * Calculates the SEO, Content, Accessibility, CTA, Image, and Overall scores.
     *
     * @param metrics the extracted metrics from the page
     * @return a fully populated AuditScoreResponse
     */
    AuditScoreResponse calculate(MetricsResponse metrics);
}

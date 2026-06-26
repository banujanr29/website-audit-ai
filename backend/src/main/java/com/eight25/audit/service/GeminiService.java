package com.eight25.audit.service;

import com.eight25.audit.dto.response.GeminiResult;
import com.eight25.audit.dto.response.MetricsResponse;

/**
 * Service for communicating with the Gemini API to retrieve AI-driven insights.
 */
public interface GeminiService {

    /**
     * Analyses the given metrics and returns structured insights and recommendations.
     *
     * @param url     the URL of the audited page
     * @param metrics the extracted factual metrics
     * @return the result from Gemini, containing insights, recommendations, and prompt logs
     */
    GeminiResult analyze(String url, MetricsResponse metrics);
}

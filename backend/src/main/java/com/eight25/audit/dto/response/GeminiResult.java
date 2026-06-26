package com.eight25.audit.dto.response;

import java.util.List;

/**
 * Encapsulates the results of a Gemini AI analysis.
 */
public record GeminiResult(
        AIInsightsResponse insights,
        List<RecommendationResponse> recommendations,
        PromptLogResponse promptLog
) {}

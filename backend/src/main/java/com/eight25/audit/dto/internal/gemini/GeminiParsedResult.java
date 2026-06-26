package com.eight25.audit.dto.internal.gemini;

import com.eight25.audit.dto.response.Priority;
import java.util.List;

/**
 * Internal record mapping the expected structured JSON response from Gemini.
 * Maps cleanly via Jackson without needing complex builders.
 */
public record GeminiParsedResult(
        InsightsDto insights,
        List<RecommendationDto> recommendations
) {
    public record InsightsDto(
            String seo,
            String messaging,
            String cta,
            String contentDepth,
            String ux
    ) {}

    public record RecommendationDto(
            Priority priority,
            String title,
            String reason
    ) {}
}

package com.eight25.audit.dto.response;

import lombok.Builder;
import lombok.Value;

/**
 * AI-generated qualitative insights for each audit dimension.
 *
 * <p>Each field contains a human-readable narrative produced by the
 * language model. Values may be {@code null} if the model did not
 * return analysis for that dimension.</p>
 */
@Value
@Builder
public class AIInsightsResponse {

    /**
     * Analysis of the page's search engine optimisation signals:
     * title, meta description, heading hierarchy, keyword presence, etc.
     */
    String seo;

    /**
     * Assessment of the page's messaging clarity, value proposition,
     * and alignment with the target audience.
     */
    String messaging;

    /**
     * Evaluation of call-to-action placement, wording, visibility,
     * and effectiveness.
     */
    String cta;

    /**
     * Review of content depth, authority signals, originality,
     * and coverage of the topic.
     */
    String contentDepth;

    /**
     * Observations on the user experience: layout, readability,
     * visual hierarchy, and navigation clarity.
     */
    String ux;
}

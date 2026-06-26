package com.eight25.audit.dto.response;

import lombok.Builder;
import lombok.Value;

/**
 * Full trace of the prompts sent to and the raw output received from the
 * language model — useful for debugging, auditing AI behaviour, and
 * observability dashboards.
 *
 * <p>This data is intentionally kept separate from the user-facing
 * {@link AIInsightsResponse} so it can be toggled off in production
 * responses if desired.</p>
 */
@Value
@Builder
public class PromptLogResponse {

    /**
     * The system-level instruction that defines the model's role and
     * output format constraints.
     */
    String systemPrompt;

    /**
     * The user-turn prompt assembled from the scraped page data,
     * sent to the model for analysis.
     */
    String userPrompt;

    /**
     * JSON-serialised representation of the structured page data
     * (metrics, headings, links, etc.) injected into the prompt.
     */
    String structuredInput;

    /**
     * The raw, unprocessed string response returned by the language model
     * before any parsing or transformation.
     */
    String rawOutput;
}

package com.eight25.audit.service.impl;

import com.eight25.audit.dto.response.MetricsResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;

/**
 * Constructs the prompt and context injected into the Gemini model.
 */
@Component
@RequiredArgsConstructor
public class PromptBuilder {

  private final ObjectMapper objectMapper;

  private static final String SYSTEM_INSTRUCTION = """
      You are a Senior Website SEO, UX, and Accessibility Auditor.

      Your task is to analyze ONLY the factual website metrics provided.

      Rules:
      1. Base every conclusion ONLY on the supplied metrics.
      2. Never invent or assume information that is not present.
      3. If there is insufficient evidence for a conclusion, explicitly state that.
      4. Every recommendation must be supported by one or more provided metrics.
      5. Return ONLY valid JSON matching the schema below.
      6. Do NOT use markdown.
      7. Do NOT wrap the JSON inside ```json blocks.
      8. Do NOT include explanations outside the JSON response.

      Evaluation Criteria:
      - SEO
        • Meta title
        • Meta description
        • Heading structure (H1, H2, H3)

      - Content Quality
        • Word count
        • Content depth
        • Heading hierarchy

      - Accessibility
        • Missing image ALT attributes
        • Overall accessibility observations

      - Calls To Action
        • CTA visibility
        • CTA frequency

      - User Experience
        • Overall page structure
        • Content organization

      Required JSON Schema:

      {
        "insights": {
          "seo": "string",
          "messaging": "string",
          "cta": "string",
          "contentDepth": "string",
          "ux": "string"
        },
        "recommendations": [
          {
            "priority": "HIGH|MEDIUM|LOW",
            "title": "string",
            "reason": "string"
          }
        ]
      }
      """;

  @SneakyThrows
  public String buildUserPrompt(String url, MetricsResponse metrics) {
    String metricsJson = getStructuredInput(metrics);
    return String.format("""
        URL: %s

        METRICS:
        %s

        You are a Senior Website Auditor.
        Your task is to analyse ONLY the supplied metrics. Do not infer anything that is not supported by evidence.
        Every recommendation MUST reference one or more supplied metrics.
        If a metric is missing, explicitly state that there is insufficient evidence.
        Never fabricate observations.
        Return ONLY valid JSON.
        """, url, metricsJson);
  }

  @SneakyThrows
  public String getStructuredInput(MetricsResponse metrics) {
    return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(metrics);
  }

  public String getSystemInstruction() {
    return SYSTEM_INSTRUCTION;
  }
}

package com.eight25.audit.service.impl;

import com.eight25.audit.dto.internal.gemini.GeminiApiDtos.*;
import com.eight25.audit.dto.internal.gemini.GeminiParsedResult;
import com.eight25.audit.dto.response.AIInsightsResponse;
import com.eight25.audit.dto.response.GeminiResult;
import com.eight25.audit.dto.response.MetricsResponse;
import com.eight25.audit.dto.response.PromptLogResponse;
import com.eight25.audit.dto.response.RecommendationResponse;
import com.eight25.audit.exception.GeminiIntegrationException;
import com.eight25.audit.service.GeminiService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.Duration;
import java.util.List;

@Slf4j
@Service
public class GeminiServiceImpl implements GeminiService {

    private final WebClient webClient;
    private final PromptBuilder promptBuilder;
    private final ObjectMapper objectMapper;
    private final String apiKey;

    public GeminiServiceImpl(
            WebClient.Builder webClientBuilder,
            PromptBuilder promptBuilder,
            ObjectMapper objectMapper,
            @Value("${gemini.api.url}") String apiUrl,
            @Value("${gemini.api.key}") String apiKey) {
        this.webClient = webClientBuilder.baseUrl(apiUrl).build();
        this.promptBuilder = promptBuilder;
        this.objectMapper = objectMapper;
        this.apiKey = apiKey;
    }

    @Override
    public GeminiResult analyze(String url, MetricsResponse metrics) {
        String systemInstruction = promptBuilder.getSystemInstruction();
        String userPrompt = promptBuilder.buildUserPrompt(url, metrics);
        String structuredInput = promptBuilder.getStructuredInput(metrics);

        log.info("API Key loaded: {}", apiKey != null && !apiKey.isBlank());

        if (apiKey != null) {
            log.info("Key prefix: {}...", apiKey.substring(0, Math.min(8, apiKey.length())));
        }

        GeminiRequest requestPayload = buildRequest(systemInstruction, userPrompt);

        String rawOutput;
        try {
            GeminiResponse apiResponse = webClient.post()
                    .uri(uriBuilder -> uriBuilder.queryParam("key", apiKey).build())
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestPayload)
                    .retrieve()
                    .bodyToMono(GeminiResponse.class)
                    .timeout(Duration.ofSeconds(45))
                    .block();

            rawOutput = extractText(apiResponse);

        } catch (WebClientResponseException e) {
            log.error("Gemini API HTTP Error {}: {}", e.getStatusCode(), e.getResponseBodyAsString(), e);
            throw new GeminiIntegrationException("HTTP " + e.getStatusCode() + " from Gemini API");
        } catch (Exception e) {
            log.error("Gemini API communication failed", e);
            throw new GeminiIntegrationException("Failed to communicate with Gemini API", e);
        }

        GeminiParsedResult parsedResult = parseOutput(rawOutput);

        PromptLogResponse promptLog = PromptLogResponse.builder()
                .systemPrompt(systemInstruction)
                .userPrompt(userPrompt)
                .structuredInput(structuredInput)
                .rawOutput(rawOutput)
                .build();

        return new GeminiResult(
                mapInsights(parsedResult.insights()),
                mapRecommendations(parsedResult.recommendations()),
                promptLog);
    }

    private GeminiRequest buildRequest(String systemInstruction, String userPrompt) {
        return GeminiRequest.builder()
                .systemInstruction(Content.builder()
                        .parts(List.of(Part.builder().text(systemInstruction).build()))
                        .build())
                .contents(List.of(Content.builder()
                        .parts(List.of(Part.builder().text(userPrompt).build()))
                        .build()))
                .generationConfig(
                        GenerationConfig.builder()
                                .temperature(0.2)
                                .responseMimeType("application/json")
                                .build())
                .build();
    }

    private String extractText(GeminiResponse response) {
        if (response == null || response.candidates() == null || response.candidates().isEmpty()) {
            throw new GeminiIntegrationException("Invalid AI response: No candidates returned");
        }
        var content = response.candidates().get(0).content();
        if (content == null || content.parts() == null || content.parts().isEmpty()) {
            throw new GeminiIntegrationException("Invalid AI response: Empty content parts");
        }
        return content.parts().get(0).text();
    }

    private GeminiParsedResult parseOutput(String rawOutput) {
        try {
            String cleaned = cleanJson(rawOutput);

            return objectMapper.readValue(
                    cleaned,
                    GeminiParsedResult.class);
        } catch (JsonProcessingException e) {
            log.error("Failed to parse Gemini output: {}", rawOutput, e);
            throw new GeminiIntegrationException("JSON parsing error: " + e.getMessage(), e);
        }
    }

    private AIInsightsResponse mapInsights(GeminiParsedResult.InsightsDto dto) {
        if (dto == null)
            return AIInsightsResponse.builder().build();
        return AIInsightsResponse.builder()
                .seo(dto.seo())
                .messaging(dto.messaging())
                .cta(dto.cta())
                .contentDepth(dto.contentDepth())
                .ux(dto.ux())
                .build();
    }

    private List<RecommendationResponse> mapRecommendations(List<GeminiParsedResult.RecommendationDto> dtos) {
        if (dtos == null)
            return List.of();
        return dtos.stream()
                .map(d -> RecommendationResponse.builder()
                        .priority(d.priority())
                        .title(d.title())
                        .reason(d.reason())
                        .build())
                .toList();
    }

    private String cleanJson(String response) {

        if (response == null) {
            return "";
        }

        response = response.trim();

        if (response.startsWith("```json")) {
            response = response.substring(7);
        }

        if (response.startsWith("```")) {
            response = response.substring(3);
        }

        if (response.endsWith("```")) {
            response = response.substring(0, response.length() - 3);
        }

        return response.trim();
    }
}

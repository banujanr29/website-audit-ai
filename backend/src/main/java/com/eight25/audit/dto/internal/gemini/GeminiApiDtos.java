package com.eight25.audit.dto.internal.gemini;

import lombok.Builder;
import lombok.Value;

import java.util.List;

/**
 * DTOs representing the exact JSON schema for the Gemini REST API requests and
 * responses.
 */
public class GeminiApiDtos {

    @Value
    @Builder
    public static class GeminiRequest {
        Content systemInstruction;
        List<Content> contents;
        GenerationConfig generationConfig;
    }

    @Value
    @Builder
    public static class Content {
        List<Part> parts;
    }

    @Value
    @Builder
    public static class Part {
        String text;
    }

    @Value
    @Builder
    public static class GenerationConfig {
        Double temperature;
        Double topP;
        String responseMimeType;
    }

    // Records for clean JSON deserialization of the API response wrapper
    public record GeminiResponse(List<Candidate> candidates) {
    }

    public record Candidate(ContentRecord content) {
    }

    public record ContentRecord(List<PartRecord> parts) {
    }

    public record PartRecord(String text) {
    }
}

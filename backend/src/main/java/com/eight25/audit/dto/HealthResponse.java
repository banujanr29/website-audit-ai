package com.eight25.audit.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

/**
 * Response DTO returned by {@code GET /api/health}.
 */
@Builder
public record HealthResponse(

        @JsonProperty("status")
        String status,

        @JsonProperty("application")
        String application
) {}

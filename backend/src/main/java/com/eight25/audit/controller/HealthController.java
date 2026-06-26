package com.eight25.audit.controller;

import com.eight25.audit.dto.HealthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Simple liveness / readiness probe endpoint.
 *
 * <p>{@code GET /api/health} returns a JSON body confirming the service is UP.
 * This is intentionally separate from the Spring Boot Actuator health endpoint
 * so the frontend can call a stable, application-owned contract.</p>
 */
@RestController
@RequestMapping("/api/health")
public class HealthController {

    private static final String APPLICATION_NAME = "Website Audit AI";

    /**
     * Returns a lightweight health payload.
     *
     * @return 200 OK with {@link HealthResponse}
     */
    @GetMapping
    public ResponseEntity<HealthResponse> health() {
        HealthResponse response = HealthResponse.builder()
                .status("UP")
                .application(APPLICATION_NAME)
                .build();
        return ResponseEntity.ok(response);
    }
}

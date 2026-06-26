package com.eight25.audit.controller;

import com.eight25.audit.dto.request.AuditRequest;
import com.eight25.audit.dto.response.AuditResponse;
import com.eight25.audit.service.AuditService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for initiating website audits.
 */
@Slf4j
@RestController
@RequestMapping("/api/audit")
@RequiredArgsConstructor
public class AuditController {

    private final AuditService auditService;

    /**
     * Executes a full website audit.
     *
     * @param request the audit request containing the target URL
     * @return the HTTP 200 response with the audit results
     */
    @PostMapping
    public ResponseEntity<AuditResponse> auditWebsite(@Valid @RequestBody AuditRequest request) {
        log.info("Received audit request for URL: {}", request.getUrl());
        AuditResponse response = auditService.auditWebsite(request);
        return ResponseEntity.ok(response);
    }
}

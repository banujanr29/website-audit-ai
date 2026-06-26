package com.eight25.audit.service;

import com.eight25.audit.dto.request.AuditRequest;
import com.eight25.audit.dto.response.AuditResponse;

/**
 * Orchestrates the full website audit process.
 */
public interface AuditService {

    /**
     * Executes the audit flow for the given request.
     *
     * @param request the audit request containing the target URL
     * @return the complete audit response including metrics and scores
     */
    AuditResponse auditWebsite(AuditRequest request);
}

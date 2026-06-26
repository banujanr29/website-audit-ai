package com.eight25.audit.service.impl;

import com.eight25.audit.dto.request.AuditRequest;
import com.eight25.audit.dto.response.AuditResponse;
import com.eight25.audit.dto.response.AuditScoreResponse;
import com.eight25.audit.dto.response.MetricsResponse;
import com.eight25.audit.service.AuditService;
import com.eight25.audit.service.MetricsExtractorService;
import com.eight25.audit.service.WebsiteScoreCalculator;
import com.eight25.audit.service.WebsiteScraperService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * Implementation of the audit orchestration layer.
 * Coordinates fetching, metric extraction, and scoring.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuditServiceImpl implements AuditService {

    private final WebsiteScraperService scraperService;
    private final MetricsExtractorService metricsExtractorService;
    private final WebsiteScoreCalculator scoreCalculator;

    @Override
    public AuditResponse auditWebsite(AuditRequest request) {
        log.info("Starting audit pipeline for URL: {}", request.getUrl());

        // 1. Fetch
        Document document = scraperService.fetch(request.getUrl());

        // 2. Extract metrics
        MetricsResponse metrics = metricsExtractorService.extract(document);

        // 3. Calculate scores
        AuditScoreResponse score = scoreCalculator.calculate(metrics);

        log.info("Completed audit pipeline for URL: {}", request.getUrl());

        // 4. Assemble response (AI features deferred)
        return AuditResponse.builder()
                .url(request.getUrl())
                .score(score)
                .metrics(metrics)
                .recommendations(Collections.emptyList())
                .build();

    }
}

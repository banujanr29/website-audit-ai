package com.eight25.audit.service.impl;

import com.eight25.audit.dto.request.AuditRequest;
import com.eight25.audit.dto.response.AuditResponse;
import com.eight25.audit.dto.response.AuditScoreResponse;
import com.eight25.audit.dto.response.GeminiResult;
import com.eight25.audit.dto.response.MetricsResponse;
import com.eight25.audit.service.AuditService;
import com.eight25.audit.service.GeminiService;
import com.eight25.audit.service.MetricsExtractorService;
import com.eight25.audit.service.WebsiteScoreCalculator;
import com.eight25.audit.service.WebsiteScraperService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

/**
 * Implementation of the audit orchestration layer.
 * Coordinates fetching, metric extraction, scoring, and AI analysis.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuditServiceImpl implements AuditService {

    private final WebsiteScraperService scraperService;
    private final MetricsExtractorService metricsExtractorService;
    private final WebsiteScoreCalculator scoreCalculator;
    private final GeminiService geminiService;

    @Override
    public AuditResponse auditWebsite(AuditRequest request) {
        log.info("Starting audit for URL: {}", request.getUrl());

        // 1. Fetch
        Document document = scraperService.fetch(request.getUrl());

        // 2. Extract metrics
        MetricsResponse metrics = metricsExtractorService.extract(document);
        log.info("Metrics extracted for URL: {}", request.getUrl());

        // 3. Calculate scores
        AuditScoreResponse score = scoreCalculator.calculate(metrics);
        log.info("Score calculated for URL: {}", request.getUrl());

        // 4. Request AI Analysis
        GeminiResult geminiResult = geminiService.analyze(request.getUrl(), metrics);
        log.info("Gemini analysis completed for URL: {}", request.getUrl());

        log.info("Audit completed for URL: {}", request.getUrl());

        // 5. Assemble response
        return AuditResponse.builder()
                .url(request.getUrl())
                .score(score)
                .metrics(metrics)
                .insights(geminiResult.insights())
                .recommendations(geminiResult.recommendations())
                .promptLogs(geminiResult.promptLog())
                .build();
    }
}

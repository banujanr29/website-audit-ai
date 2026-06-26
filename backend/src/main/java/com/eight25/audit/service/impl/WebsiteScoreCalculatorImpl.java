package com.eight25.audit.service.impl;

import com.eight25.audit.dto.response.AuditScoreResponse;
import com.eight25.audit.dto.response.MetricsResponse;
import com.eight25.audit.service.WebsiteScoreCalculator;
import org.springframework.stereotype.Service;

import static com.eight25.audit.util.AppConstants.NOT_AVAILABLE;

/**
 * Deterministic scoring engine for website metrics.
 */
@Service
public class WebsiteScoreCalculatorImpl implements WebsiteScoreCalculator {

    @Override
    public AuditScoreResponse calculate(MetricsResponse metrics) {
        if (metrics == null) {
            throw new IllegalArgumentException("MetricsResponse cannot be null");
        }

        double seo = calculateSeoScore(metrics);
        double content = calculateContentScore(metrics);
        double accessibility = calculateAccessibilityScore(metrics);
        double cta = calculateCtaScore(metrics);
        double images = calculateImageScore(metrics);

        double overall = Math.min(100.0, seo + content + accessibility + cta + images);

        return AuditScoreResponse.builder()
                .overall(overall)
                .seo(seo)
                .content(content)
                .accessibility(accessibility)
                .cta(cta)
                .images(images)
                .build();
    }

    private double calculateSeoScore(MetricsResponse metrics) {
        int score = 0;

        if (isValidMeta(metrics.getMetaTitle())) {
            score += 8;
        }
        if (isValidMeta(metrics.getMetaDescription())) {
            score += 8;
        }
        if (metrics.getH1Count() != null && metrics.getH1Count() == 1) {
            score += 8;
        }
        if (metrics.getH2Count() != null && metrics.getH2Count() >= 1) {
            score += 6;
        }

        return Math.min(30.0, score);
    }

    private double calculateContentScore(MetricsResponse metrics) {
        int score = 0;
        int wordCount = metrics.getWordCount() != null ? metrics.getWordCount() : 0;

        if (wordCount > 1000) {
            score += 20;
        } else if (wordCount > 300) {
            score += 10;
        }

        int h3 = metrics.getH3Count() != null ? metrics.getH3Count() : 0;

        if (h3 >= 1) {
            score += 5;
        }

        return Math.min(25.0, score);
    }

    private double calculateAccessibilityScore(MetricsResponse metrics) {
        double missingAlt = metrics.getMissingAltPercentage() != null ? metrics.getMissingAltPercentage() : 0.0;

        int score = 0;
        if (missingAlt == 0.0) {
            score = 20;
        } else if (missingAlt < 10.0) {
            score = 15;
        } else if (missingAlt < 30.0) {
            score = 10;
        }

        return Math.min(20.0, score);
    }

    private double calculateCtaScore(MetricsResponse metrics) {
        int ctaCount = metrics.getCtaCount() != null ? metrics.getCtaCount() : 0;

        int score = 0;
        if (ctaCount >= 5) {
            score = 15;
        } else if (ctaCount >= 3) {
            score = 10;
        } else if (ctaCount >= 1) {
            score = 5;
        }

        return Math.min(15.0, score);
    }

    private double calculateImageScore(MetricsResponse metrics) {
        int imageCount = metrics.getImageCount() != null ? metrics.getImageCount() : 0;
        double missingAlt = metrics.getMissingAltPercentage() != null ? metrics.getMissingAltPercentage() : 0.0;

        int score = 0;
        if (imageCount > 0) {
            score += 5;
        }
        if (missingAlt < 10.0) {
            score += 5;
        }

        return Math.min(10.0, score);
    }

    private boolean isValidMeta(String meta) {
        return meta != null && !meta.isBlank() && !NOT_AVAILABLE.equals(meta);
    }
}

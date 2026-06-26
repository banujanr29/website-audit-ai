package com.eight25.audit.service;

import com.eight25.audit.dto.response.MetricsResponse;
import org.jsoup.nodes.Document;

/**
 * Contract for extracting factual page metrics from a parsed HTML document.
 *
 * <p>Implementations must:
 * <ul>
 *   <li>Extract only raw, measurable facts — no scoring or AI analysis.</li>
 *   <li>Never mutate the supplied {@link Document}.</li>
 *   <li>Return a fully-populated {@link MetricsResponse}; fields default to
 *       {@code 0}, {@code 0.0}, or {@code "Not Available"} when data is absent.</li>
 * </ul>
 */
public interface MetricsExtractorService {

    /**
     * Extracts all page metrics from the given parsed HTML document.
     *
     * @param document the Jsoup document to analyse (must not be {@code null})
     * @return a fully populated {@link MetricsResponse}
     */
    MetricsResponse extract(Document document);
}

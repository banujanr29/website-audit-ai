package com.eight25.audit.service;

import com.eight25.audit.exception.InvalidUrlException;
import com.eight25.audit.exception.WebsiteFetchException;
import org.jsoup.nodes.Document;

/**
 * Contract for fetching and parsing a remote web page.
 *
 * <p>Implementations are responsible for all network I/O, redirect handling,
 * and converting low-level exceptions into domain exceptions. Callers receive
 * a fully-parsed Jsoup {@link Document} ready for metric extraction or
 * AI analysis — no raw HTML or connection management leaks through this
 * interface.</p>
 */
public interface WebsiteScraperService {

    /**
     * Fetches the page at {@code url} and returns its parsed HTML document.
     *
     * @param url a well-formed HTTP or HTTPS URL (must not be {@code null} or blank)
     * @return the parsed {@link Document} for the given URL
     * @throws InvalidUrlException  if {@code url} is null, blank, or does not begin
     *                              with {@code http://} or {@code https://}
     * @throws WebsiteFetchException if the page cannot be fetched due to a network
     *                              error, timeout, or non-2xx HTTP status
     */
    Document fetch(String url);
}

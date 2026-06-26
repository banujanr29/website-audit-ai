package com.eight25.audit.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when a network-level or HTTP-level error prevents the page from
 * being fetched and parsed.
 *
 * <p>Wraps lower-level exceptions such as:
 * <ul>
 *   <li>{@link java.net.SocketTimeoutException} — connection or read timeout</li>
 *   <li>{@link org.jsoup.HttpStatusException} — non-2xx HTTP response</li>
 *   <li>{@link java.io.IOException} — general I/O failure</li>
 * </ul>
 * The original cause is always preserved in the exception chain.</p>
 */
@ResponseStatus(HttpStatus.BAD_GATEWAY)
public class WebsiteFetchException extends RuntimeException {

    public WebsiteFetchException(String message) {
        super(message);
    }

    public WebsiteFetchException(String message, Throwable cause) {
        super(message, cause);
    }
}

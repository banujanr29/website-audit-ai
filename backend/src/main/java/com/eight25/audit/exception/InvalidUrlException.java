package com.eight25.audit.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when the supplied URL fails structural validation before any
 * network request is attempted.
 *
 * <p>Examples of invalid URLs:
 * <ul>
 *   <li>blank / null strings</li>
 *   <li>URLs that do not begin with {@code http://} or {@code https://}</li>
 *   <li>Malformed URL syntax rejected by {@link java.net.URL}</li>
 * </ul>
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidUrlException extends RuntimeException {

    public InvalidUrlException(String message) {
        super(message);
    }

    public InvalidUrlException(String message, Throwable cause) {
        super(message, cause);
    }
}

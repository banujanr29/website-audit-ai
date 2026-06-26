package com.eight25.audit.exception;

/**
 * Exception thrown when communication with the Gemini API fails,
 * including HTTP errors, timeouts, and JSON parsing failures.
 */
public class GeminiIntegrationException extends RuntimeException {
    
    public GeminiIntegrationException(String message) {
        super(message);
    }
    
    public GeminiIntegrationException(String message, Throwable cause) {
        super(message, cause);
    }
}

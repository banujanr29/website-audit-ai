package com.eight25.audit.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.List;

/**
 * Centralised exception handling for all REST controllers.
 *
 * <p>Every exception is mapped to a consistent {@link ApiError} response so
 * the frontend always receives a predictable error structure.</p>
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // ---------------------------------------------------------------
    // Domain-specific scraper exceptions
    // ---------------------------------------------------------------

    @ExceptionHandler(InvalidUrlException.class)
    public ResponseEntity<ApiError> handleInvalidUrl(
            InvalidUrlException ex,
            HttpServletRequest request) {

        log.warn("Invalid URL for request [{}]: {}", request.getRequestURI(), ex.getMessage());

        ApiError error = ApiError.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(WebsiteFetchException.class)
    public ResponseEntity<ApiError> handleWebsiteFetch(
            WebsiteFetchException ex,
            HttpServletRequest request) {

        log.error("Failed to fetch website for request [{}]: {}", request.getRequestURI(), ex.getMessage(), ex);

        ApiError error = ApiError.builder()
                .status(HttpStatus.BAD_GATEWAY.value())
                .error(HttpStatus.BAD_GATEWAY.getReasonPhrase())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(error);
    }

    // ---------------------------------------------------------------
    // AI Integration errors
    // ---------------------------------------------------------------

    @ExceptionHandler(GeminiIntegrationException.class)
    public ResponseEntity<ApiError> handleGeminiIntegration(
            GeminiIntegrationException ex,
            HttpServletRequest request) {

        log.error("Gemini AI integration failed for request [{}]: {}", request.getRequestURI(), ex.getMessage(), ex);

        ApiError error = ApiError.builder()
                .status(HttpStatus.SERVICE_UNAVAILABLE.value())
                .error(HttpStatus.SERVICE_UNAVAILABLE.getReasonPhrase())
                .message("AI analysis is currently unavailable. Please try again later.")
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(error);
    }

    // ---------------------------------------------------------------
    // Validation errors — @Valid / @Validated on request bodies
    // ---------------------------------------------------------------

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpServletRequest request) {

        List<String> details = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fe -> "'" + fe.getField() + "' " + fe.getDefaultMessage())
                .toList();

        log.warn("Validation failed for request [{}]: {}", request.getRequestURI(), details);

        ApiError error = ApiError.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .message("Validation failed")
                .path(request.getRequestURI())
                .details(details)
                .build();

        return ResponseEntity.badRequest().body(error);
    }

    // ---------------------------------------------------------------
    // Constraint violations — path / query parameter validation
    // ---------------------------------------------------------------

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiError> handleConstraintViolation(
            ConstraintViolationException ex,
            HttpServletRequest request) {

        List<String> details = ex.getConstraintViolations()
                .stream()
                .map(cv -> cv.getPropertyPath() + " " + cv.getMessage())
                .toList();

        log.warn("Constraint violation for request [{}]: {}", request.getRequestURI(), details);

        ApiError error = ApiError.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .message("Constraint violation")
                .path(request.getRequestURI())
                .details(details)
                .build();

        return ResponseEntity.badRequest().body(error);
    }

    // ---------------------------------------------------------------
    // Missing request parameter
    // ---------------------------------------------------------------

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ApiError> handleMissingParam(
            MissingServletRequestParameterException ex,
            HttpServletRequest request) {

        log.warn("Missing parameter '{}' for request [{}]", ex.getParameterName(), request.getRequestURI());

        ApiError error = ApiError.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .message("Required parameter '" + ex.getParameterName() + "' is missing")
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.badRequest().body(error);
    }

    // ---------------------------------------------------------------
    // Type mismatch (e.g. string passed where int expected)
    // ---------------------------------------------------------------

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiError> handleTypeMismatch(
            MethodArgumentTypeMismatchException ex,
            HttpServletRequest request) {

        String message = String.format(
                "Parameter '%s' should be of type '%s'",
                ex.getName(),
                ex.getRequiredType() != null ? ex.getRequiredType().getSimpleName() : "unknown");

        log.warn("Type mismatch for request [{}]: {}", request.getRequestURI(), message);

        ApiError error = ApiError.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .message(message)
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.badRequest().body(error);
    }

    // ---------------------------------------------------------------
    // HTTP method not supported
    // ---------------------------------------------------------------

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiError> handleMethodNotSupported(
            HttpRequestMethodNotSupportedException ex,
            HttpServletRequest request) {

        log.warn("Method '{}' not allowed for request [{}]", ex.getMethod(), request.getRequestURI());

        ApiError error = ApiError.builder()
                .status(HttpStatus.METHOD_NOT_ALLOWED.value())
                .error(HttpStatus.METHOD_NOT_ALLOWED.getReasonPhrase())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(error);
    }

    // ---------------------------------------------------------------
    // Fallback — catch-all for unexpected exceptions
    // ---------------------------------------------------------------

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGenericException(
            Exception ex,
            HttpServletRequest request) {

        log.error("Unhandled exception for request [{}]", request.getRequestURI(), ex);

        ApiError error = ApiError.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .error(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase())
                .message("An unexpected error occurred. Please try again later.")
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.internalServerError().body(error);
    }
}

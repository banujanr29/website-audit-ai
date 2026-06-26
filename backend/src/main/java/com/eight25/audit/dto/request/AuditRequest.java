package com.eight25.audit.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Value;

/**
 * Incoming request payload for a website audit.
 *
 * <p>The {@code url} field must be a well-formed HTTP or HTTPS URL.
 * Validation is enforced at the controller layer via {@code @Valid}.</p>
 */
@Value
@Builder
public class AuditRequest {

    /**
     * The target URL to audit.
     * Must be a valid HTTP or HTTPS URL.
     */
    @NotBlank(message = "URL must not be blank")
    @Pattern(
            regexp = "^https?://[\\w\\-]+(\\.[\\w\\-]+)+(:\\d+)?(/[\\w\\-._~:/?#\\[\\]@!$&'()*+,;=%]*)?$",
            message = "URL must be a valid HTTP or HTTPS address (e.g. https://example.com)"
    )
    String url;
}

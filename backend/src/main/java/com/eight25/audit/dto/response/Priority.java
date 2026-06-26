package com.eight25.audit.dto.response;

/**
 * Priority levels for audit recommendations, ordered from highest to lowest urgency.
 */
public enum Priority {

    /** Critical issue — must be addressed immediately. */
    HIGH,

    /** Notable issue — should be addressed in the near term. */
    MEDIUM,

    /** Minor improvement — low urgency but beneficial. */
    LOW
}

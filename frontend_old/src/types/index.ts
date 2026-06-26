/**
 * Shared TypeScript types for the Website Audit AI application.
 *
 * Intentionally empty at the project foundation stage.
 * Domain-specific types will be added here when business logic is implemented.
 */

/* ── API error shape (mirrors backend ApiError) ─────────────── */
export interface ApiError {
  timestamp: string
  status: number
  error: string
  message: string
  path: string
  details?: string[]
}

/* ── Health response (mirrors GET /api/health) ───────────────── */
export interface HealthResponse {
  status: string
  application: string
}

/* ── Audit domain types (stubs) ──────────────────────────────── */

/** Severity level for an audit issue */
export type Severity = 'critical' | 'warning' | 'info' | 'pass'

/** A single audit category result */
export interface AuditCategory {
  id: string
  name: string
  score: number        // 0–100
  issueCount: number
  severity: Severity
}

/** Top-level audit report */
export interface AuditReport {
  id: string
  url: string
  createdAt: string
  overallScore: number
  categories: AuditCategory[]
}

/** Form payload for submitting an audit */
export interface AuditRequest {
  url: string
}

/**
 * Shared utility functions.
 *
 * This module is intentionally minimal at the project foundation stage.
 * Domain helpers will be added as business logic is implemented.
 */

/**
 * Clamp a number between min and max bounds.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Return a score colour token based on a 0–100 scale.
 *
 * 0–49  → danger
 * 50–79 → warning
 * 80+   → success
 */
export function scoreToColor(score: number): string {
  if (score >= 80) return 'var(--color-success)'
  if (score >= 50) return 'var(--color-warning)'
  return 'var(--color-danger)'
}

/**
 * Format an ISO date string to a human-readable format.
 * e.g. "2025-01-15T10:30:00" → "Jan 15, 2025 at 10:30"
 */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

/**
 * Truncate a URL to a readable display form.
 * e.g. "https://www.example.com/path/to/page" → "example.com/path/to/page"
 */
export function displayUrl(rawUrl: string): string {
  try {
    const { hostname, pathname } = new URL(rawUrl)
    return `${hostname}${pathname === '/' ? '' : pathname}`
  } catch {
    return rawUrl
  }
}

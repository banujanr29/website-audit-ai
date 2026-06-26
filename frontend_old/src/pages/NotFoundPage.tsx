/**
 * NotFoundPage — 404 catch-all route.
 */
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div
      id="not-found-page"
      className="min-h-dvh flex flex-col items-center justify-center px-4 animate-fade-in"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* Decorative blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 30%, rgba(99,102,241,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Error code */}
      <p
        className="text-8xl font-black mb-4 gradient-text"
        aria-label="Error 404"
      >
        404
      </p>

      <h1 className="text-2xl md:text-3xl font-bold mb-3 text-center">
        Page Not Found
      </h1>
      <p
        className="text-base text-center max-w-sm mb-10"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Looks like this URL wandered off the map. Let's get you back on track.
      </p>

      <Link id="not-found-home-link" to="/" className="btn-primary text-base px-8 py-3">
        ← Back to Home
      </Link>
    </div>
  )
}

/**
 * AuditPage — URL submission form and results placeholder.
 *
 * Intentionally contains no business logic.
 * Form wired with React Hook Form + Zod schema validation only.
 */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

/* ── Zod schema ───────────────────────────────────────────── */
const auditSchema = z.object({
  url: z
    .string()
    .min(1, 'URL is required')
    .url('Please enter a valid URL (e.g. https://example.com)'),
})

type AuditFormValues = z.infer<typeof auditSchema>

/* ── Component ────────────────────────────────────────────── */
export default function AuditPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuditFormValues>({
    resolver: zodResolver(auditSchema),
    defaultValues: { url: '' },
  })

  /* Placeholder — business logic will be added later */
  const onSubmit = (_data: AuditFormValues) => {
    // TODO: call audit service
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">

      {/* ── Page header ───────────────────────────────────────── */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-3 tracking-tight">
          Website <span className="gradient-text">Audit</span>
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Enter a URL below to start a comprehensive AI-powered audit.
        </p>
      </div>

      {/* ── Audit form ────────────────────────────────────────── */}
      <section
        id="audit-form-section"
        aria-labelledby="audit-form-heading"
        className="card"
      >
        <h2 id="audit-form-heading" className="sr-only">Audit form</h2>

        <form
          id="audit-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Website audit submission form"
        >
          {/* URL input */}
          <div className="mb-6">
            <label
              htmlFor="audit-url-input"
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Website URL
            </label>

            <div className="flex gap-3">
              <div className="relative flex-1">
                {/* Globe icon */}
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--color-text-muted)' }}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
                <input
                  id="audit-url-input"
                  type="url"
                  placeholder="https://example.com"
                  className="input-base pl-9"
                  autoComplete="url"
                  aria-describedby={errors.url ? 'audit-url-error' : undefined}
                  aria-invalid={!!errors.url}
                  {...register('url')}
                />
              </div>

              <button
                id="audit-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="btn-primary shrink-0"
                aria-label="Submit audit"
              >
                {isSubmitting ? (
                  <svg className="animate-spin-slow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                )}
                {isSubmitting ? 'Auditing…' : 'Audit'}
              </button>
            </div>

            {errors.url && (
              <p
                id="audit-url-error"
                role="alert"
                className="mt-2 text-sm"
                style={{ color: 'var(--color-danger)' }}
              >
                {errors.url.message}
              </p>
            )}
          </div>
        </form>
      </section>

      {/* ── Results placeholder ──────────────────────────────── */}
      <section
        id="audit-results-placeholder"
        aria-label="Audit results will appear here"
        className="mt-8 card text-center py-16"
        style={{ border: '2px dashed var(--color-border)' }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(99,102,241,0.1)' }}
          aria-hidden="true"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <p className="text-base font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>
          No report yet
        </p>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Submit a URL above to generate your audit report.
        </p>
      </section>

    </div>
  )
}

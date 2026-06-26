import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

interface NavItem {
  label: string
  to: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home',  to: '/' },
  { label: 'Audit', to: '/audit' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  /* Close mobile menu on route change */
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  /* Add glass shadow on scroll */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      id="main-navbar"
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${scrolled ? 'glass shadow-lg' : 'bg-transparent'}
      `}
      style={{ borderBottom: scrolled ? '1px solid var(--color-border)' : 'none' }}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────── */}
          <NavLink
            to="/"
            id="navbar-logo"
            className="flex items-center gap-2.5 group"
            aria-label="Website Audit AI — go to home"
          >
            {/* Icon mark */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
              aria-hidden="true"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </div>
            <span className="text-base font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              Audit<span className="gradient-text">AI</span>
            </span>
          </NavLink>

          {/* ── Desktop links ─────────────────────── */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  id={`nav-link-${item.label.toLowerCase()}`}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `
                    px-4 py-2 rounded-md text-sm font-medium
                    transition-all duration-200
                    ${isActive
                      ? 'text-white'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-white/5'
                    }
                  `}
                  style={({ isActive }) =>
                    isActive
                      ? { background: 'rgba(99,102,241,0.15)', color: 'var(--color-accent)' }
                      : {}
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── CTA ───────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <NavLink
              id="navbar-cta"
              to="/audit"
              className="btn-primary text-sm py-2 px-4"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Start Audit
            </NavLink>
          </div>

          {/* ── Mobile hamburger ─────────────────── */}
          <button
            id="navbar-mobile-toggle"
            type="button"
            className="md:hidden p-2 rounded-md transition-colors duration-200"
            style={{ color: 'var(--color-text-muted)' }}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6"  y2="6"  />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* ── Mobile dropdown ───────────────────── */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden glass animate-fade-in pb-4"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <ul className="flex flex-col gap-1 pt-3 px-2" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    id={`mobile-nav-${item.label.toLowerCase()}`}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => `
                      block px-4 py-2.5 rounded-md text-sm font-medium
                      transition-all duration-200
                      ${isActive
                        ? 'text-[var(--color-accent)] bg-[rgba(99,102,241,0.12)]'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-white/5'
                      }
                    `}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <NavLink
                  id="mobile-cta"
                  to="/audit"
                  className="btn-primary w-full justify-center text-sm"
                >
                  Start Audit
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

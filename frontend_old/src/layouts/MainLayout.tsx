import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'

/**
 * Shell layout shared by all authenticated/public pages.
 * Renders the Navbar at the top and the matched page via <Outlet />.
 */
export default function MainLayout() {
  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'var(--color-bg-primary)' }}>
      <Navbar />

      {/* Page content pushed below the fixed navbar (64px / 4rem) */}
      <main id="main-content" className="flex-1 pt-16">
        <Outlet />
      </main>

      <footer
        id="main-footer"
        className="py-6 text-center text-sm"
        style={{ color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)' }}
      >
        © {new Date().getFullYear()} Website Audit AI · Built with ❤️ and caffeine
      </footer>
    </div>
  )
}

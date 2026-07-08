import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  { to: '/styles', label: 'Styles' },
  { to: '/pricing', label: 'Pricing' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`glass flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5 transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_10px_40px_-12px_rgba(124,92,255,0.35)]' : ''
        }`}
      >
        <Link to="/" className="font-display text-lg font-700 tracking-tight">
          <span className="text-frost">folio</span>
          <span className="text-gradient font-bold">lab</span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/10 text-frost' : 'text-mist hover:text-frost'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/start" className="btn-primary ml-2 !px-5 !py-1.5 text-sm">
            Start my build
          </Link>
        </div>

        {/* Mobile */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full text-mist hover:text-frost sm:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="glass absolute top-[4.4rem] w-[calc(100%-2rem)] max-w-5xl rounded-2xl p-3 sm:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="block rounded-xl px-4 py-3 text-mist hover:bg-white/5 hover:text-frost"
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/start" className="btn-primary mt-2 w-full justify-center">
            Start my build
          </Link>
        </div>
      )}
    </header>
  )
}

import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  { to: '/styles', label: 'Work & styles' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/portal', label: 'Client portal' },
]

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3.75 9h10.5M10 4.75 14.25 9 10 13.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className={'site-nav mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5 ' + (scrolled ? 'site-nav-scrolled' : '')}>
        <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="FolioLabz home">
          <span className="font-display text-xl font-bold tracking-[-0.03em] sm:text-2xl">
            <span className="text-frost">Folio</span><span className="text-violet">Labz</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 'nav-link ' + (isActive ? 'nav-link-active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Link to="/start" className="btn-primary !px-5 !py-2.5 text-sm">Start my build <Arrow /></Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-frost/15 text-frost md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="site-nav mx-auto mt-2 max-w-7xl p-3 md:hidden">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className="block rounded-xl px-4 py-3 text-sm font-medium text-mist hover:bg-frost/5 hover:text-frost">
              {link.label}
            </NavLink>
          ))}
          <Link to="/start" className="btn-primary mt-2 w-full justify-center">Start my build <Arrow /></Link>
        </div>
      )}
    </header>
  )
}

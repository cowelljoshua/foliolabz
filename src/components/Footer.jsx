import { Link } from 'react-router-dom'
import { site } from '../config/site.js'

export default function Footer() {
  return (
    <footer className="px-6 pb-8 pt-20 lg:px-10">
      <div className="footer-shell mx-auto max-w-7xl">
        <div className="grid gap-12 px-7 py-12 sm:px-10 lg:grid-cols-[1.4fr_.6fr_.6fr] lg:py-14">
          <div className="max-w-md">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="font-display text-2xl font-bold tracking-[-0.03em] text-white">Folio<span className="text-[#91a6ff]">Labz</span></span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              Portfolios made easy.
            </p>
            <a href={'mailto:' + site.email} className="mt-5 inline-block text-sm font-semibold text-white transition hover:text-[#91a6ff]">
              {site.email}
            </a>
          </div>

          <div>
            <p className="footer-label">Explore</p>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/58">
              <Link to="/styles" className="hover:text-white">Work & styles</Link>
              <Link to="/pricing" className="hover:text-white">Pricing</Link>
              <Link to="/start" className="hover:text-white">Start a build</Link>
            </div>
          </div>

          <div>
            <p className="footer-label">Clients</p>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/58">
              <Link to="/portal" className="hover:text-white">Client portal</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 px-7 py-5 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>© {new Date().getFullYear()} FolioLabz. Built by {site.founder.name}.</p>
          <p>Design · Build · Launch</p>
        </div>
      </div>
    </footer>
  )
}

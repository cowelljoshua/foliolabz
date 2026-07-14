import { Link } from 'react-router-dom'
import { site } from '../config/site.js'

// Footer styled like a blueprint title block: labeled cells in a ruled frame.
export default function Footer() {
  return (
    <footer className="mt-24 px-6 pb-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border hairline bg-ink-900/50">
        <div className="grid sm:grid-cols-[1.4fr_1fr_1fr]">
          <div className="border-b hairline p-6 sm:border-b-0 sm:border-r">
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-mist/80">Project</p>
            <p className="font-head mt-2 text-lg">
              <span className="text-frost">Folio</span>
              <span className="text-gradient">Labz</span>
            </p>
            <p className="mt-1 text-sm text-mist">Yes, this site is my work too.</p>
          </div>
          <div className="border-b hairline p-6 sm:border-b-0 sm:border-r">
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-mist/80">Drawn by</p>
            <p className="mt-2 text-sm font-medium text-frost">{site.founder.name}</p>
            <a href={`mailto:${site.email}`} className="mt-1 block text-sm text-mist hover:text-frost">
              {site.email}
            </a>
          </div>
          <div className="p-6">
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-mist/80">Index</p>
            <div className="mt-2 flex flex-col items-start gap-1 text-sm text-mist">
              <Link to="/styles" className="hover:text-frost">Styles</Link>
              <Link to="/pricing" className="hover:text-frost">Pricing</Link>
              <Link to="/portal" className="hover:text-frost">Client portal</Link>
            </div>
          </div>
        </div>
        <div className="border-t hairline px-6 py-3 text-center font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-mist/60">
          Sheet 01 · Drawn for you, launched by me
        </div>
      </div>
    </footer>
  )
}

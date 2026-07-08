import { Link } from 'react-router-dom'
import { site } from '../config/site.js'

export default function Footer() {
  return (
    <footer className="mt-24 border-t hairline">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-lg font-bold">
            <span className="text-frost">folio</span>
            <span className="text-gradient">lab</span>
          </p>
          <p className="mt-1 text-sm text-mist">
            Yes, this site is my work too.
          </p>
        </div>
        <div className="flex items-center gap-5 text-sm text-mist">
          <Link to="/styles" className="hover:text-frost">Styles</Link>
          <Link to="/pricing" className="hover:text-frost">Pricing</Link>
          <a href={`mailto:${site.email}`} className="hover:text-frost">{site.email}</a>
        </div>
      </div>
    </footer>
  )
}

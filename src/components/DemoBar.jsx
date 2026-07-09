import { Link } from 'react-router-dom'

// Floating bar shown on every style demo page:
// back to the gallery, or carry this style into the intake form.
export default function DemoBar({ styleId, styleName }) {
  return (
    <div className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      <div className="glass flex items-center gap-2 rounded-full py-2 pl-4 pr-2 shadow-[0_16px_50px_-12px_rgba(0,0,0,0.7)]">
        <Link to="/styles" className="text-sm font-medium text-mist transition-colors hover:text-frost">
          ← All styles
        </Link>
        <span className="mx-1 hidden text-white/20 sm:inline">|</span>
        <span className="hidden items-center gap-2 text-sm text-mist sm:inline-flex">
          <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-300">
            Example
          </span>
          <span className="font-semibold text-frost">{styleName}</span>
        </span>
        <Link to={`/start?style=${styleId}`} className="btn-primary !px-4 !py-1.5 text-sm">
          I like this one
        </Link>
      </div>
    </div>
  )
}

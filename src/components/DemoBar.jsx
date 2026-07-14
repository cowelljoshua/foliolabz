import { Link } from 'react-router-dom'
import { demoStyles } from '../config/site.js'

// Floating controls shown on every style demo page:
// browse between styles, return to the gallery, or carry this style into the intake form.
export default function DemoBar({ styleId, styleName }) {
  const currentIndex = demoStyles.findIndex((style) => style.id === styleId)
  const previousStyle = demoStyles[(currentIndex - 1 + demoStyles.length) % demoStyles.length]
  const nextStyle = demoStyles[(currentIndex + 1) % demoStyles.length]
  const carouselButton =
    'fixed top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border hairline bg-ink-800/85 text-2xl text-frost shadow-lg backdrop-blur-md transition duration-200 hover:scale-105 hover:bg-ink-800 focus:outline-none focus:ring-2 focus:ring-violet sm:h-14 sm:w-14'

  return (
    <>
      <Link
        to={`/styles/${previousStyle.id}`}
        aria-label={`Previous style: ${previousStyle.name}`}
        title={`Previous: ${previousStyle.name}`}
        className={`${carouselButton} left-3 sm:left-5`}
      >
        &larr;
      </Link>
      <Link
        to={`/styles/${nextStyle.id}`}
        aria-label={`Next style: ${nextStyle.name}`}
        title={`Next: ${nextStyle.name}`}
        className={`${carouselButton} right-3 sm:right-5`}
      >
        &rarr;
      </Link>

      <div className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
        <div className="glass flex items-center gap-2 rounded-full py-2 pl-4 pr-2 shadow-[0_16px_44px_-12px_rgba(0,0,0,0.65)]">
          <Link to="/styles" className="text-sm font-medium text-mist transition-colors hover:text-frost">
            &larr; All styles
          </Link>
          <span className="mx-1 hidden text-frost/20 sm:inline">|</span>
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
    </>
  )
}
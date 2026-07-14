// Blueprint panel: raised surface, chalk hairline, gentle lift on hover.
// (spotColor is accepted for backwards compatibility and ignored.)
export default function SpotlightCard({ children, className = '', spotColor: _spotColor }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border hairline bg-ink-800 shadow-[0_16px_34px_-26px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:border-frost/30 hover:shadow-[0_22px_40px_-26px_rgba(0,0,0,0.85)] ${className}`}
    >
      {children}
    </div>
  )
}

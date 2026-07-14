// Paper card: warm surface, ink hairline, gentle lift on hover.
// (spotColor is accepted for backwards compatibility and ignored.)
export default function SpotlightCard({ children, className = '', spotColor: _spotColor }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border hairline bg-ink-800 shadow-[0_14px_30px_-24px_rgba(24,34,48,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:border-frost/30 hover:shadow-[0_20px_36px_-24px_rgba(24,34,48,0.45)] ${className}`}
    >
      {children}
    </div>
  )
}

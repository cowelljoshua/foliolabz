// Drafting-paper backdrop: a fine grid with heavier guide lines,
// faded at the edges, plus a few registration crosses. Pure CSS,
// sits absolutely behind content.
export default function GridPaper({ className = '' }) {
  const cross = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* fine grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(24,34,48,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,34,48,0.055) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 90% 75% at 50% 40%, black 35%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 75% at 50% 40%, black 35%, transparent 100%)',
        }}
      />
      {/* heavier guide lines every 5 squares */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(24,34,48,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,34,48,0.07) 1px, transparent 1px)',
          backgroundSize: '160px 160px',
          maskImage: 'radial-gradient(ellipse 90% 75% at 50% 40%, black 30%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 75% at 50% 40%, black 30%, transparent 95%)',
        }}
      />
      {/* registration crosses */}
      <span className="absolute left-[12%] top-[22%] text-frost/25">{cross}</span>
      <span className="absolute right-[14%] top-[30%] text-frost/25">{cross}</span>
      <span className="absolute bottom-[24%] left-[20%] text-frost/20">{cross}</span>
      <span className="absolute bottom-[18%] right-[22%] text-frost/20">{cross}</span>
    </div>
  )
}

// Wrapper with an animated conic-gradient border (pure CSS, see index.css).
export default function StarBorder({ children, className = '' }) {
  return (
    <div className={`star-border ${className}`}>
      <div className="relative">{children}</div>
    </div>
  )
}

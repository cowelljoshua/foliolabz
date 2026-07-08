// Text with a light sweep running across it (pure CSS, see index.css).
export default function ShinyText({ children, className = '' }) {
  return <span className={`shiny-text ${className}`}>{children}</span>
}

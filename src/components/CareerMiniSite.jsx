import MiniSite from './MiniSite.jsx'

// Palette examples deliberately show color only.
// The final page structure is designed later around the client's real content.
export default function CareerMiniSite({ direction }) {
  return <MiniSite swatch={direction.swatch} />
}

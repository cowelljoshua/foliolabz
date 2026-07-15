// A compact color-only preview. The uneven bands make the
// primary color easy to spot without suggesting a page layout.
export default function MiniSite({ swatch }) {
  return (
    <div className="grid h-full w-full grid-cols-[1.5fr_1fr_1fr] overflow-hidden">
      {swatch.map((color) => (
        <div key={color} style={{ background: color }} />
      ))}
    </div>
  )
}

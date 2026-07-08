import { rush, site } from '../config/site.js'

// The one and only add-on: a rocket switch that moves the build to the front of the line.
export default function RushSwitch({ on, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
        on ? 'border-cyan/60 bg-cyan/10 shadow-[0_0_30px_-8px_rgba(34,211,238,0.4)]' : 'hairline bg-white/[0.03] hover:border-white/25'
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`text-2xl transition-transform duration-500 ${on ? '-translate-y-1 translate-x-1 -rotate-12' : ''}`}
          aria-hidden="true"
        >
          🚀
        </span>
        <span>
          <span className="font-display block text-sm font-semibold">
            {rush.label} <span className="text-cyan">+${rush.price}</span>
          </span>
          <span className="mt-0.5 block text-xs text-mist">
            {on ? `Front of the line: ${site.delivery.rush}.` : `Standard delivery is ${site.delivery.standard}.`}
          </span>
        </span>
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${on ? 'bg-cyan' : 'bg-white/15'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all duration-300 ${on ? 'left-[1.4rem]' : 'left-0.5'}`}
        />
      </span>
    </button>
  )
}

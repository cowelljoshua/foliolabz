function launchDateLabel(value) {
  if (!value) return ''
  const parsed = new Date(`${value}T12:00:00`)
  if (Number.isNaN(parsed.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(parsed)
}

export default function ClientProjectStatus({ progress = [], nextStep = '', targetLaunchDate = '', previewUrl = '' }) {
  const milestones = Array.isArray(progress) ? progress : []
  if (milestones.length === 0 && !nextStep && !targetLaunchDate && !previewUrl) return null
  const completed = milestones.filter((milestone) => milestone.done).length
  const percent = milestones.length ? Math.round((completed / milestones.length) * 100) : 0

  return (
    <section className="glass mt-4 rounded-3xl p-6 sm:p-7" aria-label="Detailed project updates">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan">Your project updates</p>
          <h2 className="font-display mt-1 text-xl font-semibold">What is happening next</h2>
        </div>
        {milestones.length > 0 && <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">{completed} of {milestones.length} milestones</span>}
      </div>

      {nextStep && <div className="mt-5 rounded-2xl border border-cyan/20 bg-cyan/[0.05] p-4"><p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan">Next step</p><p className="mt-1 text-sm text-frost">{nextStep}</p></div>}

      {(targetLaunchDate || previewUrl) && (
        <div className="mt-4 flex flex-wrap gap-3">
          {targetLaunchDate && <span className="rounded-full border border-frost/10 px-3.5 py-2 text-xs text-mist">Target launch: <strong className="text-frost">{launchDateLabel(targetLaunchDate)}</strong></span>}
          {previewUrl && <a href={previewUrl} target="_blank" rel="noreferrer" className="rounded-full bg-violet px-4 py-2 text-xs font-bold text-white hover:bg-violet-soft">Open private preview</a>}
        </div>
      )}

      {milestones.length > 0 && (
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {milestones.map((milestone, index) => (
            <div key={milestone.id || index} className={`flex items-center gap-3 rounded-2xl border p-3 ${milestone.done ? 'border-mint/25 bg-mint/[0.05]' : 'border-frost/10 bg-frost/[0.025]'}`}>
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${milestone.done ? 'border-mint bg-mint text-ink-950' : 'border-frost/20 text-mist'}`}>{milestone.done ? '✓' : index + 1}</span>
              <span className={`text-sm ${milestone.done ? 'text-frost' : 'text-mist'}`}>{milestone.label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

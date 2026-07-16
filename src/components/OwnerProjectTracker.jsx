import { trackerPhases } from '../config/projectTracker.js'

function FieldLabel({ children }) {
  return <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-mist">{children}</span>
}

export default function OwnerProjectTracker({ tracker, onChange, publicFields, onPublicChange }) {
  const tasks = tracker.tasks || []
  const completed = tasks.filter((task) => task.done).length
  const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0

  function updateTracker(key, value) {
    onChange({ ...tracker, [key]: value })
  }

  function updateTask(index, key, value) {
    onChange({
      ...tracker,
      tasks: tasks.map((task, taskIndex) => taskIndex === index ? { ...task, [key]: value } : task),
    })
  }

  function addTask() {
    onChange({
      ...tracker,
      tasks: [...tasks, {
        id: `custom-${Date.now()}`,
        phase: 'Build',
        label: 'New task',
        done: false,
        client_visible: false,
        client_label: 'Project update',
        owner_note: '',
        due_date: '',
      }],
    })
  }

  function removeTask(index) {
    onChange({ ...tracker, tasks: tasks.filter((_, taskIndex) => taskIndex !== index) })
  }

  return (
    <section className="glass rounded-3xl p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet">Project operations</p>
          <h3 className="font-display mt-2 text-2xl font-semibold">Detailed project tracker</h3>
          <p className="mt-2 text-sm text-mist">Private notes stay here. Only tasks marked “Client sees this” are copied into the client portal.</p>
        </div>
        <div className="min-w-44 rounded-2xl border border-frost/10 bg-frost/[0.03] p-4 text-right">
          <p className="font-display text-2xl font-semibold">{percent}%</p>
          <p className="text-xs text-mist">{completed} of {tasks.length} tasks</p>
        </div>
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-frost/10">
        <div className="h-full rounded-full bg-violet transition-[width]" style={{ width: `${percent}%` }} />
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-3">
        <label><FieldLabel>Next action for you</FieldLabel><textarea className="field-input min-h-24" value={tracker.next_owner_action} onChange={(event) => updateTracker('next_owner_action', event.target.value)} placeholder="The very next thing you need to do" /></label>
        <label><FieldLabel>Blocked by</FieldLabel><textarea className="field-input min-h-24" value={tracker.blocked_by} onChange={(event) => updateTracker('blocked_by', event.target.value)} placeholder="Missing copy, approval, payment..." /></label>
        <label><FieldLabel>Private project notes</FieldLabel><textarea className="field-input min-h-24" value={tracker.owner_notes} onChange={(event) => updateTracker('owner_notes', event.target.value)} placeholder="Anything only you should see" /></label>
      </div>

      <div className="mt-7 rounded-2xl border border-cyan/20 bg-cyan/[0.04] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan">Client-facing update</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <label><FieldLabel>What the client should do or expect next</FieldLabel><textarea className="field-input min-h-24" value={publicFields.next_step || ''} onChange={(event) => onPublicChange('next_step', event.target.value)} placeholder="I am reviewing your files and will confirm the plan next." /></label>
          <label><FieldLabel>Target launch date</FieldLabel><input className="field-input" type="date" value={publicFields.target_launch_date || ''} onChange={(event) => onPublicChange('target_launch_date', event.target.value)} /></label>
          <label><FieldLabel>Private preview link</FieldLabel><input className="field-input" type="url" value={publicFields.preview_url || ''} onChange={(event) => onPublicChange('preview_url', event.target.value)} placeholder="https://preview.example.com" /></label>
        </div>
      </div>

      <div className="mt-8 space-y-7">
        {trackerPhases.map((phase) => {
          const phaseTasks = tasks.map((task, index) => ({ task, index })).filter(({ task }) => task.phase === phase)
          if (phaseTasks.length === 0) return null
          return (
            <div key={phase}>
              <div className="mb-3 flex items-center gap-3"><h4 className="font-display text-lg font-semibold">{phase}</h4><span className="h-px flex-1 bg-frost/10" /></div>
              <div className="grid gap-3">
                {phaseTasks.map(({ task, index }) => (
                  <article key={task.id} className={`rounded-2xl border p-4 ${task.done ? 'border-mint/30 bg-mint/[0.04]' : 'border-frost/10 bg-frost/[0.025]'}`}>
                    <div className="flex flex-wrap items-start gap-3">
                      <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3">
                        <input className="mt-1" type="checkbox" checked={task.done} onChange={(event) => updateTask(index, 'done', event.target.checked)} />
                        <span className={`font-semibold ${task.done ? 'text-mint line-through decoration-mint/40' : 'text-frost'}`}>{task.label}</span>
                      </label>
                      {task.client_visible && <span className="rounded-full bg-cyan/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-cyan">Client sees this</span>}
                    </div>
                    <details className="mt-3 border-t border-frost/10 pt-3">
                      <summary className="cursor-pointer text-xs font-semibold text-mist hover:text-frost">Details and visibility</summary>
                      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <label><FieldLabel>Task</FieldLabel><input className="field-input" value={task.label} onChange={(event) => updateTask(index, 'label', event.target.value)} /></label>
                        <label><FieldLabel>Phase</FieldLabel><select className="field-input" value={task.phase} onChange={(event) => updateTask(index, 'phase', event.target.value)}>{trackerPhases.map((option) => <option key={option}>{option}</option>)}</select></label>
                        <label><FieldLabel>Due date</FieldLabel><input className="field-input" type="date" value={task.due_date} onChange={(event) => updateTask(index, 'due_date', event.target.value)} /></label>
                        <label><FieldLabel>Private task note</FieldLabel><input className="field-input" value={task.owner_note} onChange={(event) => updateTask(index, 'owner_note', event.target.value)} /></label>
                      </div>
                      <div className="mt-4 grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-end">
                        <label className="flex items-center gap-3 rounded-2xl border border-frost/10 px-4 py-3"><input type="checkbox" checked={task.client_visible} onChange={(event) => updateTask(index, 'client_visible', event.target.checked)} /><span className="text-sm font-semibold">Client sees this milestone</span></label>
                        <label><FieldLabel>Client-safe wording</FieldLabel><input className="field-input" value={task.client_label} onChange={(event) => updateTask(index, 'client_label', event.target.value)} disabled={!task.client_visible} /></label>
                        <button type="button" onClick={() => removeTask(index)} className="rounded-full border border-[#e98b84]/30 px-4 py-2 text-sm text-[#e98b84] hover:bg-[#e98b84]/10">Remove</button>
                      </div>
                    </details>
                  </article>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <button type="button" onClick={addTask} className="mt-7 rounded-full border border-frost/15 px-4 py-2 text-sm font-semibold hover:bg-frost/5">+ Add custom task</button>
    </section>
  )
}

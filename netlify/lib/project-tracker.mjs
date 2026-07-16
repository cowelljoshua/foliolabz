const phases = new Set(['Intake', 'Plan', 'Build', 'Review', 'Launch', 'Handoff'])

function text(value, max = 4000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function date(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value || '') ? value : null
}

export function safeUrl(value) {
  const candidate = text(value, 2000)
  if (!candidate) return ''
  try {
    const parsed = new URL(candidate)
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.toString() : ''
  } catch {
    return ''
  }
}

export function sanitizeOwnerTracker(value) {
  const source = value && typeof value === 'object' ? value : {}
  const tasks = Array.isArray(source.tasks) ? source.tasks.slice(0, 80).map((task, index) => ({
    id: text(task?.id, 120) || `task-${index + 1}`,
    phase: phases.has(task?.phase) ? task.phase : 'Build',
    label: text(task?.label, 240) || `Task ${index + 1}`,
    done: task?.done === true,
    client_visible: task?.client_visible === true,
    client_label: text(task?.client_label, 240) || text(task?.label, 240) || `Project update ${index + 1}`,
    owner_note: text(task?.owner_note, 2000),
    due_date: date(task?.due_date) || '',
  })) : []

  return {
    owner_notes: text(source.owner_notes, 12000),
    blocked_by: text(source.blocked_by, 4000),
    next_owner_action: text(source.next_owner_action, 4000),
    tasks,
  }
}

export function clientProgressFromTracker(tracker) {
  return tracker.tasks
    .filter((task) => task.client_visible)
    .map((task) => ({ id: task.id, label: task.client_label, done: task.done }))
}

export function operationRecord(email, tracker) {
  return {
    email,
    owner_notes: tracker.owner_notes,
    blocked_by: tracker.blocked_by,
    next_owner_action: tracker.next_owner_action,
    tracker: { tasks: tracker.tasks },
    updated_at: new Date().toISOString(),
  }
}

export function mergeOwnerTracker(operation) {
  return {
    owner_notes: operation?.owner_notes || '',
    blocked_by: operation?.blocked_by || '',
    next_owner_action: operation?.next_owner_action || '',
    tasks: Array.isArray(operation?.tracker?.tasks) ? operation.tracker.tasks : [],
  }
}

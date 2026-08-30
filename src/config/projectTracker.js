export const trackerPhases = ['Intake', 'Plan', 'Build', 'Review', 'Launch', 'Handoff']

const taskTemplate = [
  ['brief-received', 'Intake', 'Review the complete intake and uploaded files', true, 'Brief received'],
  ['confirm-scope', 'Intake', 'Confirm package, scope, and price', true, 'Scope confirmed'],
  ['confirm-assets', 'Intake', 'List missing copy, photos, resume, links, and project assets', false, ''],
  ['send-kickoff', 'Intake', 'Send kickoff message with timeline and next request', false, ''],
  ['plan-pages', 'Plan', 'Finalize pages, sections, and navigation', false, ''],
  ['plan-direction', 'Plan', 'Confirm visual direction, palette, and references', true, 'Design direction set'],
  ['set-launch-target', 'Plan', 'Set the internal target launch date', false, ''],
  ['build-structure', 'Build', 'Build page structure and responsive layout', true, 'Build underway'],
  ['add-content', 'Build', 'Add final copy, projects, resume, and contact details', false, ''],
  ['test-features', 'Build', 'Test links, forms, downloads, accessibility, and mobile layout', false, ''],
  ['publish-preview', 'Review', 'Publish the private preview and add its link', true, 'Private preview ready'],
  ['revision-one', 'Review', 'Complete revision round 1', true, 'Revisions in progress'],
  ['revision-two', 'Review', 'Complete revision round 2 if needed', false, ''],
  ['revision-three', 'Review', 'Complete revision round 3 if needed', false, ''],
  ['final-approval', 'Launch', 'Receive written final approval from the client', true, 'Final design approved'],
  ['collect-balance', 'Launch', 'Confirm the remaining balance is paid', false, ''],
  ['domain-launch', 'Launch', 'Connect domain, verify HTTPS, and run production QA', true, 'Site launched'],
  ['send-handoff', 'Handoff', 'Send the live link, support instructions, and receipt', true, 'Handoff complete'],
]

export function createDefaultTracker() {
  return {
    owner_notes: '',
    blocked_by: '',
    next_owner_action: 'Review the intake and confirm the project scope.',
    tasks: taskTemplate.map(([id, phase, label, client_visible, client_label], index) => ({
      id,
      phase,
      label,
      done: index === 0,
      client_visible,
      client_label,
      owner_note: '',
      due_date: '',
    })),
  }
}

export function normalizeTracker(value) {
  const fallback = createDefaultTracker()
  if (!value || !Array.isArray(value.tasks) || value.tasks.length === 0) return fallback
  return {
    owner_notes: value.owner_notes || '',
    blocked_by: value.blocked_by || '',
    next_owner_action: value.next_owner_action || '',
    tasks: value.tasks.map((task, index) => ({
      id: task.id || `task-${index + 1}`,
      phase: trackerPhases.includes(task.phase) ? task.phase : 'Build',
      label: task.label || `Task ${index + 1}`,
      done: task.done === true,
      client_visible: task.client_visible === true,
      client_label: task.client_label || task.label || `Task ${index + 1}`,
      owner_note: task.owner_note || '',
      due_date: task.due_date || '',
    })),
  }
}

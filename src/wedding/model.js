export function blankPlan() {
  return {
    names: "Our wedding",
    date: "",
    venue: "",
    budget: 25000,
    tasks: [
      {
        id: crypto.randomUUID(),
        title: "Dream up your wedding together",
        category: "Getting started",
        owner: "Together",
        date: "",
        done: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Decide on a comfortable budget",
        category: "Getting started",
        owner: "Together",
        date: "",
        done: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Start your guest list",
        category: "Guests",
        owner: "Together",
        date: "",
        done: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Explore venues you both love",
        category: "Venue",
        owner: "Together",
        date: "",
        done: false,
      },
    ],
    guests: [],
    expenses: [],
    timeline: [],
    notes: [],
  };
}
export const totals = (p) => ({
  spent: p.expenses.reduce((s, x) => s + Number(x.amount), 0),
  paid: p.expenses
    .filter((x) => x.paid)
    .reduce((s, x) => s + Number(x.amount), 0),
  done: p.tasks.filter((x) => x.done).length,
  attending: p.guests.filter((x) => x.rsvp === "Attending").length,
});
export const escapeHtml = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

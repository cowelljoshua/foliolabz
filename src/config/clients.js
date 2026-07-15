// ============================================================
// YOUR CLIENT LIST (this file is your "spreadsheet")
// ============================================================
// One entry per client, keyed by the email they used on the form.
// When they enter that email in the client portal (/portal), they
// see exactly their situation: what balance is due, their domain
// status, and the edit-request options. No login, no backend.
//
// HOW TO UPDATE: edit this file, save, push to GitHub. Netlify
// redeploys automatically (about a minute) and the portal is current.
//
// Fields:
//   name         Their full name (shown as "Welcome back, First").
//   package      "launch" or "pro". Sets the balance owed.
//   rush         true if they added rush (+$75 on the balance).
//   balancePaid  false while they still owe the balance, true once paid.
//   buildStatus  "brief", "building", "review", "polish", or "live".
//   payLink      OPTIONAL personal Stripe link for their balance. Use for
//                rush builds or special deals; leave "" to use the standard
//                launchBalance/proBalance link from site.js.
//   domain       The available custom domain you confirmed, e.g. "janedoe.com".
//                Leave "" until you confirm an available name with the client.
//   domainActive Leave false after adding the confirmed domain. This tells the client
//                payment has not started and the domain cannot go live yet. Flip to
//                true once their $30/yr subscription is running and you connect it.
//
// NOTE: this list ships inside the public site code, so keep it to
// names + project status only. Never put anything sensitive here.
// ============================================================

export const clients = {
  // A demo profile so you can try the portal yourself. Delete anytime.
  "demo@foliolabz.com": {
    name: "Demo Client",
    package: "launch",
    rush: false,
    balancePaid: false,
    buildStatus: "building",
    payLink: "",
    domain: "",
    domainActive: false,
  },

  "joshuacowell2005@gmail.com": {
    name: "Joshua Cowell",
    package: "launch",
    rush: false,
    balancePaid: false,
    buildStatus: "brief",
    payLink: "",
    domain: "",
    domainActive: false,
  },

  // ---- real clients below, copy the block above as a template ----
}

// Package prices live here so the portal can do the math for you.
const PRICES = { launch: 300, pro: 550 }
const DEPOSIT = 50
const RUSH = 75

// Look up a client by email (case/space insensitive).
export function findClient(email) {
  const key = (email || "").trim().toLowerCase()
  const record = clients[key]
  return record ? { ...record, email: key } : null
}

// What this client still owes on their build.
export function balanceFor(client) {
  if (!client || client.balancePaid) return 0
  return (PRICES[client.package] || 0) - DEPOSIT + (client.rush ? RUSH : 0)
}

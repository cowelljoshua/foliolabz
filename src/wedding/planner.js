import { blankPlan, totals, escapeHtml as e } from "./model.js";
export function mountWedding(root, db) {
  let disposed = false;

  let user = null,
    workspace = null,
    plan = blankPlan(),
    demo = false,
    view = "overview",
    filter = "All",
    page = 1,
    busy = false,
    lastFocus;
  const app = root.querySelector("#app"),
    dialog = root.querySelector("#dialog");
  const money = (x) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(x);
  const date = (x) =>
    x
      ? new Date(x + "T12:00:00").toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Date to be decided";
  const icons = {
    overview: "◈",
    tasks: "☑",
    budget: "◷",
    guests: "♧",
    timeline: "◴",
    notes: "✎",
  };
  const labels = {
    overview: "Overview",
    tasks: "Checklist",
    budget: "Budget",
    guests: "Guest list",
    timeline: "Wedding day",
    notes: "Notes & ideas",
  };
  function notice(text) {
    root.querySelector("#notice").textContent = text;
  }
  function modal(title, body, submit) {
    lastFocus = root.activeElement;
    dialog.innerHTML = `<form novalidate><div class="section-head"><h2 id="dialog-title">${e(title)}</h2><button type="button" class="quiet" data-close aria-label="Close dialog">×</button></div>${body}<p class="error" id="form-error" role="alert"></p><div class="dialog-actions"><button type="button" class="secondary" data-close>Cancel</button><button type="submit" class="primary">Save changes</button></div></form>`;
    dialog
      .querySelectorAll("[data-close]")
      .forEach((x) => (x.onclick = () => dialog.close()));
    dialog.querySelector("form").onsubmit = async (ev) => {
      ev.preventDefault();
      const form = ev.currentTarget;
      const invalid = [...form.elements].find(
        (el) => el.willValidate && !el.validity.valid,
      );
      if (invalid) {
        invalid.setAttribute("aria-invalid", "true");
        invalid.setAttribute("aria-describedby", "form-error");
        form.querySelector("#form-error").textContent =
          `Please enter a valid ${invalid.labels?.[0]?.textContent.toLowerCase() || "value"}.`;
        invalid.focus();
        return;
      }
      const btn = form.querySelector("[type=submit]");
      btn.disabled = true;
      try {
        await submit(Object.fromEntries(new FormData(form)));
        dialog.close();
      } catch (err) {
        form.querySelector("#form-error").textContent = err.message;
      } finally {
        btn.disabled = false;
      }
    };
    dialog.showModal();
  }
  dialog.addEventListener(
    "close",
    () => lastFocus?.isConnected && lastFocus.focus(),
  );
  const field = (name, label, value = "", type = "text", extra = "") =>
    `<label>${label}<input name="${name}" type="${type}" value="${e(value)}" ${extra}></label>`;
  const select = (name, label, options, value) =>
    `<label for="field-${name}">${label}</label><select id="field-${name}" name="${name}">${options.map((x) => `<option ${x === value ? "selected" : ""}>${e(x)}</option>`).join("")}</select>`;
  async function save(next) {
    if (busy)
      throw Error("A save is already in progress. Try again in a moment.");
    busy = true;
    try {
      if (demo) {
        sessionStorage.setItem("wedding-demo", JSON.stringify(next));
        plan = next;
      } else {
        const { data, error } = await db
          .from("wedding_plans")
          .update({ data: next, revision: workspace.revision + 1 })
          .eq("id", workspace.id)
          .eq("revision", workspace.revision)
          .select()
          .maybeSingle();
        if (error) throw error;
        if (!data)
          throw Error(
            "The plan changed on another device. Close this form, refresh the plan, then apply your edit again. Your changes have not been saved.",
          );
        workspace = data;
        plan = data.data;
      }
      render();
      notice(demo ? "Saved in this demo tab" : "Saved to your shared plan");
    } finally {
      busy = false;
    }
  }
  async function refresh() {
    if (demo || !workspace || busy || dialog.open) return;
    const { data, error } = await db
      .from("wedding_plans")
      .select("*")
      .eq("id", workspace.id)
      .single();
    if (error) {
      notice("Could not refresh. Check your connection and try Refresh.");
      return;
    }
    if (data.revision !== workspace.revision) {
      workspace = data;
      plan = data.data;
      render();
      notice("Updated with the latest shared plan");
    }
  }
  function authScreen() {
    if (disposed) return;
    app.innerHTML = `<div class="auth-layout"><section class="auth-art"><div class="wordmark">ever after<span>THE WEDDING PLANNER</span></div><div class="auth-copy"><p class="eyebrow">FOR THE TWO OF YOU</p><h1>A beautiful day.<br>A little less<br><em>overwhelming.</em></h1><p>All the details, decisions, and daydreams.<br>One place to bring them together.</p></div><div class="rings" aria-hidden="true">♡</div><small>YOUR NEXT CHAPTER STARTS HERE</small></section><section class="auth-form"><p class="eyebrow">LET’S MAKE IT YOURS</p><h2>Plan it together.</h2><p>Sign in to your private wedding planner.</p>${!db ? '<p class="setup-note">Preview is ready. Shared sign-in will be available once the Supabase project is connected.</p>' : ""}<form id="auth" novalidate>${field("email", "Email address", "", "email", 'required autocomplete="email"')}${field("password", "Password", "", "password", 'required minlength="8" autocomplete="current-password"')}<label class="show-password"><input id="show-password" type="checkbox"> Show password</label><p id="auth-error" class="error" role="alert"></p><button type="submit" class="primary" ${!db ? "disabled" : ""}>Sign in</button><button type="button" class="secondary" id="signup" ${!db ? "disabled" : ""}>Create an account</button><button type="button" class="quiet" id="reset" ${!db ? "disabled" : ""}>Forgot password?</button></form><div class="demo-line"><span>Just having a look?</span><button class="text-button" id="demo">Explore the demo →</button></div></section></div>`;
    root.querySelector("#show-password").onchange = (ev) =>
      (root.querySelector("[name=password]").type = ev.target.checked
        ? "text"
        : "password");
    const run = async (mode) => {
      const form = root.querySelector("#auth"),
        email = form.email.value.trim(),
        password = form.password.value;
      const errorEl = root.querySelector("#auth-error");
      if (!form.email.validity.valid || !email) {
        errorEl.textContent = "Enter a valid email address.";
        form.email.focus();
        return;
      }
      if (mode !== "reset" && password.length < 8) {
        errorEl.textContent = "Use a password with at least 8 characters.";
        form.password.focus();
        return;
      }
      form.querySelectorAll("button").forEach((b) => (b.disabled = true));
      try {
        let result;
        if (mode === "signup")
          result = await db.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo:
                location.origin + import.meta.env.BASE_URL + "wedding",
            },
          });
        else if (mode === "reset")
          result = await db.auth.resetPasswordForEmail(email, {
            redirectTo:
              location.origin +
              import.meta.env.BASE_URL +
              "reset-password?return=wedding",
          });
        else result = await db.auth.signInWithPassword({ email, password });
        if (result.error) throw result.error;
        if (mode === "signup")
          errorEl.textContent =
            "Check your email to confirm your account, then sign in.";
        if (mode === "reset")
          errorEl.textContent =
            "If an account exists, a password reset link will arrive by email.";
      } catch (err) {
        errorEl.textContent = err.message;
      } finally {
        form.querySelectorAll("button").forEach((b) => (b.disabled = false));
      }
    };
    root.querySelector("#auth").onsubmit = (ev) => {
      ev.preventDefault();
      run("signin");
    };
    root.querySelector("#signup").onclick = () => run("signup");
    root.querySelector("#reset").onclick = () => run("reset");
    root.querySelector("#demo").onclick = () => {
      demo = true;
      try {
        plan =
          JSON.parse(sessionStorage.getItem("wedding-demo")) || blankPlan();
      } catch {
        plan = blankPlan();
      }
      render();
    };
  }
  async function loadWorkspace() {
    if (disposed) return;
    const { data, error } = await db
      .from("wedding_plans")
      .select("*")
      .order("created_at")
      .limit(1);
    if (disposed) return;
    if (error) {
      app.innerHTML = `<div class="onboard"><h1>Let’s reconnect.</h1><p>${e(error.message)}</p><button id="retry" class="primary">Try again</button><button id="out" class="secondary">Sign out</button></div>`;
      root.querySelector("#retry").onclick = loadWorkspace;
      root.querySelector("#out").onclick = () => db.auth.signOut();
      return;
    }
    if (data.length) {
      workspace = data[0];
      plan = workspace.data;
      render();
    } else onboarding();
  }
  function onboarding() {
    app.innerHTML = `<div class="onboard"><p class="eyebrow">YOUR NEXT CHAPTER</p><h1>Make room for your day.</h1><p>Create your plan, or ask your partner to add your sign-in email to theirs.</p><form id="setup" novalidate>${field("names", "Your names", "", "text", 'required placeholder="e.g. Alex & Jamie"')}${field("partner", "Partner’s sign-in email", "", "email", "required")}<p class="error" id="setup-error" role="alert"></p><button type="submit" class="primary">Create our planner</button></form><button id="retry" class="text-button">My partner already added me — refresh</button><button id="out" class="text-button">Sign out</button></div>`;
    root.querySelector("#retry").onclick = loadWorkspace;
    root.querySelector("#out").onclick = () => db.auth.signOut();
    root.querySelector("#setup").onsubmit = async (ev) => {
      ev.preventDefault();
      const f = ev.currentTarget;
      if (
        !f.names.value.trim() ||
        !f.partner.validity.valid ||
        !f.partner.value
      ) {
        root.querySelector("#setup-error").textContent =
          "Enter your names and a valid partner email.";
        return;
      }
      const b = f.querySelector("button");
      b.disabled = true;
      const p = blankPlan();
      p.names = f.names.value.trim();
      const { error } = await db
        .from("wedding_plans")
        .insert({
          owner_id: user.id,
          partner_email: f.partner.value.trim().toLowerCase(),
          data: p,
        });
      if (error) {
        root.querySelector("#setup-error").textContent = error.message;
        b.disabled = false;
      } else await loadWorkspace();
    };
  }
  function render() {
    if (disposed) return;
    const t = totals(plan);
    app.innerHTML = `<aside class="sidebar"><a class="wordmark" href="wedding">ever after<span>OUR WEDDING PLANNER</span></a><div class="couple"><div class="monogram">${e(plan.names === "Our wedding" ? "&" : plan.names[0])}</div><strong>${e(plan.names)}</strong><small>${e(date(plan.date))}</small></div><nav aria-label="Planner">${Object.entries(
      labels,
    )
      .map(
        ([k, v]) =>
          `<button data-view="${k}" class="nav-item ${view === k ? "active" : ""}" ${view === k ? 'aria-current="page"' : ""}><span aria-hidden="true">${icons[k]}</span>${v}${k === "tasks" ? `<small>${plan.tasks.filter((x) => !x.done).length}</small>` : ""}</button>`,
      )
      .join(
        "",
      )}</nav><div class="sidebar-bottom"><p>A little planning.<br>A lifetime of memories.</p><button class="text-button" id="settings">⚙ Wedding details</button></div></aside><div class="workspace"><header><span class="breadcrumb">Our wedding <span>/</span> ${labels[view]}</span><div class="header-actions"><span class="save-state">${demo ? "Demo · this tab only" : "Private shared workspace"}</span><button class="quiet" id="refresh">Refresh</button><button class="avatar" id="account" aria-label="${demo ? "Exit demo" : "Sign out"}">${demo ? "↗" : "↪"}</button></div></header><main><div class="page-heading"><div><p class="eyebrow">${view === "overview" ? "THE BEGINNING OF YOUR FOREVER" : "A LITTLE CLOSER TO “I DO”"}</p><h1>${view === "overview" ? "Your day, coming together." : labels[view]}</h1><p>${{ overview: "Big dreams, little details. Let’s make space for both.", tasks: "One thing at a time. You’ve got this, together.", budget: "Keep the numbers clear, and the decisions a little easier.", guests: "The people who make your day feel like you.", timeline: "A little structure for a day you’ll always remember.", notes: "A home for the ideas you don’t want to forget." }[view]}</p></div><button class="primary" id="add">${view === "overview" ? "+ Add a task" : view === "budget" ? "+ Add an expense" : view === "guests" ? "+ Add a guest" : view === "timeline" ? "+ Add a moment" : view === "notes" ? "+ Add a note" : "+ Add a task"}</button></div>${view === "overview" ? overview(t) : listView(t)}<footer>Made for the two of you <span>♡</span> One lovely detail at a time.</footer></main></div>`;
    app.querySelectorAll("[data-view]").forEach(
      (b) =>
        (b.onclick = () => {
          view = b.dataset.view;
          filter = "All";
          page = 1;
          render();
        }),
    );
    root.querySelector("#add").onclick = () =>
      edit(view === "overview" ? "tasks" : view);
    root.querySelector("#settings").onclick = settings;
    root.querySelector("#refresh").onclick = () => refresh();
    root.querySelector("#account").onclick = async () => {
      if (demo) {
        demo = false;
        authScreen();
      } else {
        await db.auth.signOut();
      }
    };
    app
      .querySelectorAll("[data-edit]")
      .forEach((b) => (b.onclick = () => edit(b.dataset.kind, b.dataset.edit)));
    app.querySelectorAll("[data-toggle]").forEach(
      (b) =>
        (b.onchange = async () => {
          const next = structuredClone(plan);
          const row = next.tasks.find((x) => x.id === b.dataset.toggle);
          row.done = b.checked;
          try {
            await save(next);
          } catch (err) {
            b.checked = !b.checked;
            notice(err.message);
          }
        }),
    );
    app.querySelectorAll("[data-filter]").forEach(
      (b) =>
        (b.onclick = () => {
          filter = b.dataset.filter;
          page = 1;
          render();
        }),
    );
    app.querySelectorAll("[data-page]").forEach(
      (b) =>
        (b.onclick = () => {
          page += Number(b.dataset.page);
          render();
        }),
    );
    root.querySelector("#details-cta")?.addEventListener("click", settings);
  }
  function overview(t) {
    const days = plan.date
      ? Math.ceil(
          (new Date(plan.date + "T00:00:00") -
            new Date(new Date().toDateString())) /
            86400000,
        )
      : null;
    return `<section class="countdown"><div><p class="eyebrow">THE DAY WE SAY “I DO”</p><h2>${e(plan.names)}</h2><p>${e(date(plan.date))} <span>·</span> ${e(plan.venue || "Somewhere wonderful")}</p><button class="text-button" id="details-cta">${plan.date ? "Edit wedding details" : "Set your wedding date"} ↗</button></div><div class="countdown-number"><strong>${days === null ? "∞" : Math.max(0, days)}</strong><span>${days === null ? "SO MUCH TO LOOK FORWARD TO" : days < 0 ? "HAPPILY EVER AFTER" : "DAYS UNTIL FOREVER"}</span></div><div class="botanical" aria-hidden="true">✽</div></section><div class="stats"><section><p>THE CHECKLIST</p><strong>${t.done}<small> / ${plan.tasks.length}</small></strong><span>little things, checked off</span><progress value="${t.done}" max="${plan.tasks.length || 1}"></progress></section><section><p>THE BUDGET</p><strong>${money(t.spent)}</strong><span>of ${money(plan.budget)} planned${t.spent > plan.budget ? " · over budget" : ""}</span><progress value="${Math.min(t.spent, plan.budget)}" max="${plan.budget || 1}"></progress></section><section><p>THE GUEST LIST</p><strong>${plan.guests.length}<small> people</small></strong><span>${t.attending} attending · ${plan.guests.filter((x) => x.rsvp === "Awaiting reply").length} awaiting a reply</span><div class="guest-dots" aria-hidden="true">● ● ● ● ●</div></section></div><div class="overview-grid"><section class="panel"><div class="section-head"><div><p class="eyebrow">A LITTLE PROGRESS</p><h2>Up next</h2></div><button class="text-button" data-view="tasks">View checklist ↗</button></div>${
      plan.tasks
        .filter((x) => !x.done)
        .slice(0, 4)
        .map(taskRow)
        .join("") ||
      '<p class="empty">All caught up. Take a moment to enjoy it.</p>'
    }</section><section class="note-card"><p class="eyebrow">A NOTE TO THE TWO OF YOU</p><h2>The best part?<br>You’re doing<br>this <em>together.</em></h2><p>Start with what matters most to you.<br>The rest will find its place.</p><span aria-hidden="true">♡</span></section></div>`;
  }
  function taskRow(x) {
    return `<div class="task-row"><label class="check"><input type="checkbox" data-toggle="${x.id}" ${x.done ? "checked" : ""}><span class="${x.done ? "done" : ""}">${e(x.title)}<small>${e(x.category)} · ${e(x.owner)}${x.date ? " · " + e(date(x.date)) : ""}</small></span></label><button class="quiet" data-kind="tasks" data-edit="${x.id}" aria-label="Edit ${e(x.title)}">↗</button></div>`;
  }
  function listView(t) {
    const kind = view === "budget" ? "expenses" : view;
    let rows = plan[kind];
    if (view === "tasks" && filter !== "All")
      rows = rows.filter((x) => (filter === "Completed" ? x.done : !x.done));
    if (view === "timeline")
      rows = [...rows].sort((a, b) => a.time.localeCompare(b.time));
    page = Math.max(1, Math.min(page, Math.ceil(rows.length / 10) || 1));
    const subset = rows.slice((page - 1) * 10, page * 10);
    return `${view === "budget" ? `<div class="budget-summary"><span>Budget <strong>${money(plan.budget)}</strong></span><span>Planned <strong>${money(t.spent)}</strong></span><span>Paid <strong>${money(t.paid)}</strong></span><span>${t.spent > plan.budget ? "Over budget" : "Remaining"} <strong>${money(Math.abs(plan.budget - t.spent))}</strong></span></div>` : ""}<section class="panel">${view === "tasks" ? `<div class="filters">${["All", "To do", "Completed"].map((x) => `<button data-filter="${x}" class="${filter === x ? "selected" : ""}" aria-pressed="${filter === x}">${x}</button>`).join("")}</div>` : ""}${!rows.length ? `<div class="empty"><span aria-hidden="true">${icons[view]}</span><h2>${filter === "Completed" ? "Your first small win is waiting." : "A fresh page, just for you."}</h2><p>Use the add button above to ${view === "guests" ? "start your guest list" : view === "budget" ? "plan your first expense" : view === "timeline" ? "shape your wedding day" : view === "notes" ? "save an idea" : "add a task"}.</p></div>` : subset.map((x) => (view === "tasks" ? taskRow(x) : `<div class="record-row"><div>${view === "timeline" ? `<span class="time">${e(x.time)}</span>` : ""}<h3>${e(x.title || x.name)}</h3><p>${e(view === "budget" ? x.category + " · " + (x.paid ? "Paid" : "Not paid yet") : view === "guests" ? x.rsvp + (x.meal ? " · " + x.meal : "") : x.text || x.location || "")}</p></div><div class="row-end">${view === "budget" ? `<strong>${money(x.amount)}</strong>` : ""}<button class="secondary" data-edit="${x.id}" data-kind="${view}">Edit</button></div></div>`)).join("")}<div class="pagination"><span>${rows.length ? `${(page - 1) * 10 + 1}–${Math.min(page * 10, rows.length)} of ${rows.length}` : "0 items"}</span><div><button class="quiet" data-page="-1" ${page === 1 ? "disabled" : ""}>Previous</button><button class="quiet" data-page="1" ${page * 10 >= rows.length ? "disabled" : ""}>Next</button></div></div></section>`;
  }
  function edit(type, id) {
    const kind = type === "budget" ? "expenses" : type;
    const row = plan[kind].find((x) => x.id === id) || {};
    let body = "";
    if (type === "tasks")
      body =
        field("title", "Task", row.title, "text", 'required maxlength="200"') +
        field("category", "Category", row.category || "Planning") +
        select(
          "owner",
          "Who’s on it?",
          ["Together", "Partner 1", "Partner 2"],
          row.owner,
        ) +
        field("date", "Due date", row.date, "date");
    if (type === "budget")
      body =
        field(
          "title",
          "Expense",
          row.title,
          "text",
          'required maxlength="200"',
        ) +
        field("category", "Category", row.category || "Venue") +
        field(
          "amount",
          "Amount (USD)",
          row.amount ?? "",
          "number",
          'required min="0" max="100000000" step="0.01"',
        ) +
        select(
          "paid",
          "Payment",
          ["Not paid yet", "Paid"],
          row.paid ? "Paid" : "Not paid yet",
        );
    if (type === "guests")
      body =
        field(
          "name",
          "Guest name",
          row.name,
          "text",
          'required maxlength="200"',
        ) +
        select(
          "rsvp",
          "RSVP",
          ["Not invited yet", "Awaiting reply", "Attending", "Declined"],
          row.rsvp,
        ) +
        field("meal", "Meal or dietary notes", row.meal);
    if (type === "timeline")
      body =
        field(
          "title",
          "Moment",
          row.title,
          "text",
          'required maxlength="200"',
        ) +
        field("time", "Time", row.time, "time", "required") +
        field("location", "Location or details", row.location);
    if (type === "notes")
      body =
        field("title", "Title", row.title, "text", 'required maxlength="200"') +
        `<label>Your idea<textarea name="text" rows="7" style="resize: none" maxlength="10000">${e(row.text)}</textarea></label>`;
    if (id)
      body +=
        '<button type="button" id="remove" class="danger">Delete this item</button>';
    modal(
      `${id ? "Edit" : "Add"} ${{ tasks: "a task", budget: "an expense", guests: "a guest", timeline: "a moment", notes: "a note" }[type]}`,
      body,
      async (values) => {
        const next = structuredClone(plan),
          record = { ...row, ...values, id: id || crypto.randomUUID() };
        if (type === "tasks") record.done = !!row.done;
        if (type === "budget") {
          record.amount = Number(values.amount);
          record.paid = values.paid === "Paid";
        }
        if (id) next[kind] = next[kind].map((x) => (x.id === id ? record : x));
        else next[kind].push(record);
        await save(next);
      },
    );
    root.querySelector("#remove")?.addEventListener("click", () => {
      dialog.close();
      modal(
        "Delete this item?",
        `<p>Delete “${e(row.title || row.name)}” from your shared plan? This cannot be undone.</p>`,
        async () => {
          const next = structuredClone(plan);
          next[kind] = next[kind].filter((x) => x.id !== id);
          await save(next);
        },
      );
      dialog.querySelector("[type=submit]").textContent = "Delete item";
      dialog.querySelector("[data-close]").focus();
    });
  }
  function settings() {
    modal(
      "Your wedding details",
      field(
        "names",
        "Your names",
        plan.names,
        "text",
        'required maxlength="120"',
      ) +
        field("date", "Wedding date", plan.date, "date") +
        field("venue", "Venue or location", plan.venue) +
        field(
          "budget",
          "Total budget (USD)",
          plan.budget,
          "number",
          'required min="0" max="100000000" step="0.01"',
        ) +
        (!demo
          ? `<p class="setup-note">Shared with ${e(workspace.partner_email)}. Both of you can edit the plan.</p>`
          : ""),
      async (values) =>
        save({ ...plan, ...values, budget: Number(values.budget) }),
    );
  }
  let subscription;
  if (db) {
    subscription = db.auth.onAuthStateChange((event, session) => {
      user = session?.user || null;
      if (event === "TOKEN_REFRESHED") return;
      if (event === "PASSWORD_RECOVERY") {
        modal(
          "Choose a new password",
          field(
            "password",
            "New password",
            "",
            "password",
            'required minlength="8" autocomplete="new-password"',
          ),
          async (v) => {
            const { error } = await db.auth.updateUser({
              password: v.password,
            });
            if (error) throw error;
            notice("Password updated");
            setTimeout(loadWorkspace, 0);
          },
        );
      } else if (user) {
        demo = false;
        setTimeout(loadWorkspace, 0);
      } else {
        workspace = null;
        plan = blankPlan();
        authScreen();
      }
    }).data.subscription;
  } else authScreen();
  const timer = setInterval(refresh, 15000);
  return () => {
    disposed = true;
    clearInterval(timer);
    subscription?.unsubscribe();
    dialog.close();
  };
}

# Foliolab: Your Setup Checklist

The site is built. Three things are left, and they are all yours because they need
your accounts: **Stripe** (payments), **Netlify** (hosting + the intake form), and a
couple of config touches. Budget about an hour total.

---

## 0. Two-minute config touches (do these first)

Open `src/config/site.js`:

1. **Email**: near the top, set `email:` to the address you want clients using. It is
   currently a guess.
2. **Caroline's site**: when it is live, find `realSites`, paste her URL into the
   `caroline` entry, and change `live: false` to `live: true`.
3. **Prices**: every price on the whole site lives in this one file. Change a number,
   save, redeploy, done.

---

## 1. Stripe (about 30 minutes)

Stripe takes card payments and deposits them into your bank automatically
(2.9% + 30¢ per charge; no monthly cost).

### Create the account
1. Go to https://stripe.com and sign up (choose "Individual" unless you form an LLC later).
2. Complete the identity + bank steps so payouts work.

### Create six Payment Links
In the Stripe dashboard: **Payment Links → + New**. For each one below, click
**+ Add new product** while creating the link.

| # | Link name | How to set it up |
|---|-----------|------------------|
| 1 | Launch | Product "Website: Launch", one-time price **$300** |
| 2 | Launch + Care | Product "Care Plan (Launch)", **recurring $25/month**. Then on the same link click **Add another product** and attach a one-time **$300** "Launch setup" product. One checkout, both charges. |
| 3 | Pro | Product "Website: Pro", one-time **$550** |
| 4 | Pro + Care | Recurring **$25/month** plus one-time **$550** setup, same trick as #2 |
| 5 | Resume Polish | One-time **$40** |
| 6 | Polish + Meeting | One-time **$75** |

> If the dashboard will not let you mix one-time + recurring in one link, make the
> recurring-only link and collect the setup fee with the trick below instead. Stripe
> changes this UI occasionally.

### Paste the links into the site
Copy each link URL (looks like `https://buy.stripe.com/abc123`) into `stripeLinks`
in `src/config/site.js`. Any link you leave as `""` simply hides its Pay button, so
you can go live before finishing this.

### The custom-quote recipe (Signature builds and rush orders)
These are priced per client, so you send a personal link. Two minutes each:

1. Client's form arrives in your email with their choices and estimate ranges.
2. Reply confirming the exact total.
3. Stripe dashboard → **Payment Links → + New → Add new product**, name it
   "Website build: [their name]", set the agreed amount, create, copy, and email
   them the link.

That is the entire "billing system." No code involved.

### Handy Stripe facts
- Refunds (for the resume guarantee): open the payment in the dashboard, click Refund.
- Clients on the Care Plan can cancel themselves if you send them a
  **customer portal** link (Settings → Billing → Customer portal → activate).
- Use **Test mode** (toggle, top right) to try a fake checkout with card
  `4242 4242 4242 4242` before going live.

---

## 2. Netlify (about 15 minutes)

Netlify hosts the site free AND receives the intake form, including file uploads.
No server needed. (This is why we are not using GitHub Pages: it cannot receive forms.)

1. Push this folder to a GitHub repo (private is fine):
   ```
   git init
   git add .
   git commit -m "Foliolab site"
   ```
   then create a repo on github.com and follow its push instructions.
2. Go to https://app.netlify.com, sign up with GitHub, click
   **Add new site → Import an existing project**, pick the repo.
   Build settings are auto-detected from `netlify.toml`. Deploy.
3. Turn on email notifications: **Site → Forms → Form notifications →
   Add notification → Email**, choose your email. Do it for both forms
   (`website-intake` and `resume-intake`).
4. **Test it**: open your live site, submit the intake form with a small file
   attached. You should get an email where the `summary` field reads as one
   clean client brief, with download links for the files.

### Form limits (free tier)
- 100 submissions/month, 10 MB per file upload. Plenty to start.
- The form itself asks clients to stay under 8 MB of attachments and email you
  anything bigger, so you should never hit the ceiling by accident.
- If you ever outgrow it, Netlify Forms Level 1 ($19/mo) is one click. That fits
  your "up to $15/mo" budget closely enough to decide later; there is no rush.

---

## 3. Nice-to-haves (whenever)

- **Custom domain** (~$12/year): buy it right inside Netlify
  (Domain management → Add a domain), HTTPS is automatic. foliolab.com,
  foliolab.site, getfoliolab.com, whatever is free.
- **Screenshot thumbnails**: see `public/examples/README.txt`. Optional polish
  for the Styles page while live previews load.
- **Meetings**: for the $75 resume tier and Signature strategy calls, replying by
  email to schedule works fine. If you get busy, make a free https://calendly.com
  and paste the link into your reply template.
- **Edit requests**: when a site is ready, reply to that client's intake
  notification email and add the client to the To: line. Tell them "reply here
  with any changes." One thread per client, full history, zero tools.
- **Your resume**: the "View my resume" button on the pricing page serves
  `public/josh-resume.pdf`. Swap that file whenever you update your resume.

---

## How to give a client a PRIVATE preview of their site

The site promises "a private preview link before launch." Here is how to actually
deliver one. Easiest first.

**Option A: an unguessable Netlify link (free, recommended to start).**
1. Build the client's site as its own Netlify site (each client site is a separate
   little project, separate from this Foliolab marketing site).
2. Netlify gives it a random subdomain like `luminous-otter-3fa19c.netlify.app`.
   That URL is effectively private: nobody finds it unless you send it.
3. Add a "no-index" tag so search engines never list the preview. In that client
   project's `index.html` `<head>`, add:
   `<meta name="robots" content="noindex">`
   (Remove it, or it is harmless to leave, once they approve. Their real launched
   site with a custom domain should NOT have it.)
4. Email them the link: "Here is your private preview, reply with any changes."

**Option B: Netlify Deploy Previews (free, good once you use GitHub per client).**
Every branch/pull request gets its own unique preview URL automatically. Push a
`preview` branch, share the generated deploy-preview link. Same privacy as A.

**Option C: a real password wall (paid).**
Netlify's built-in password protection is on the Pro plan ($19/mo per site) under
Site configuration → Access & security. Only worth it if a client insists on a
password. For 99% of clients, Option A is plenty.

> Want me to bake a lightweight password gate into a client build instead of paying
> Netlify? I can add a simple one. Just ask.

---

## The 5-round edit promise (say this in your launch email)

Every build includes up to **5 rounds of changes** to get it perfect before launch.
When you email a client their preview link, spell out the one rule that keeps this
sane for you:

> "You have up to 5 rounds of edits to make this perfect. Each round can be as long
> as you like, so send me everything you want changed in one go. Just be specific:
> tell me the exact text, the section, or the color, and I will handle the rest."

Being specific is what keeps a "round" from turning into ten tiny back-and-forths.
Bundling changes into clear, specific emails is the whole trick.

---

## Working on the site

```
npm install       (first time only)
npm run dev       (local preview at the printed URL)
npm run build     (production build; Netlify runs this for you)
```

Netlify redeploys automatically every time you push to GitHub.

One quirk to remember: the intake form only truly submits on the deployed
Netlify site. Locally it simulates success so you can click through the flow.

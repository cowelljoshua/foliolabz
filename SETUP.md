# FolioLabz: Your Setup Checklist

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

### Payment Links: done ✅
All nine links are created and pasted into `stripeLinks` in `src/config/site.js`.
This is the map from Stripe's link name to the site's key, for whenever you need to
swap one out:

| `stripeLinks` key | Stripe link name | Price |
|---|---|---|
| `deposit` | Deposit | $50 one-time, starts every website build |
| `launchBalance` | Launch Package | $250 one-time (Launch $300 minus the deposit) |
| `proBalance` | Pro Package | $500 one-time (Pro $550 minus the deposit) |
| `domainMonthly` | Monthly Custom Domain | $4/mo recurring |
| `domainYearly` | Yearly Custom Domain | $20/yr recurring |
| `editWording` | Website Wording Edit | $10 one-time |
| `editDesign` | Website Design Edits | $40 one-time |
| `resumePolish` | Resume Polish | $40 one-time |
| `resumeMeeting` | Resume Polish Pro | $75 one-time (this is the polish + 30-min meeting tier) |

If you ever need to recreate one: Stripe dashboard → **Payment Links → + New →
Add new product**, then copy the new URL into the matching key above and redeploy.
Any link left as `""` simply hides its Pay button (the site shows "I'll email you a
link" instead), which is how you can go live before every link exists.

> **The client portal** (`/portal`) is where existing clients pay a balance, start a
> custom domain (monthly or yearly, their choice), or request an edit. It uses every
> key above except `deposit` and `resumePolish`/`resumeMeeting` (those two live on
> the public Resume Polish section instead).

---

## Your client list (src/config/clients.js)

This file is your customer spreadsheet. Add one entry per client (copy the template
at the top of the file) and the portal recognizes their email: they skip typing
their name, see exactly their balance (computed from their package + rush), their
domain status, and nothing they do not need. Unknown emails still get the generic
"pick your package" flow, so a client you have not entered yet is never locked out.

The routine, in order:
1. A form submission lands in your email.
2. Add the client to `clients.js`: email, name, `package: "launch"` or `"pro"`,
   `rush` if they chose it.
3. If they mention wanting a `.com`, put it in `domain`. Flip `domainActive: true`
   once their subscription is running.
4. When their balance payment arrives in Stripe, flip `balancePaid: true`.
5. Save, commit, push. Netlify redeploys in about a minute.

Rush balances: the standard $250/$500 links do not include the $75, so for a rush
client either paste a personal Stripe link into their `payLink` field or leave it
`""`; the portal then tells them a payment link is coming by email instead of
showing a wrong amount.

There is a demo profile, `demo@foliolabz.com`, so you can try the portal as a
client. Delete it whenever.

One honest caveat: this list ships inside the site's public code. Names and project
status only, never anything sensitive. Fine at this scale; real hidden accounts
would need a backend, which we deliberately skipped.

### How website billing works now (deposit first, balance at launch)
Every website is **$50 to start, the rest when it goes live**. So:

1. Client submits the form and pays the **$50 deposit** link. That locks in their spot.
2. You build the site and share the private preview.
3. Once they love it and it is ready to go live, you send a **personal payment link
   for the balance** (Launch $300 leaves $250; Pro $550 leaves $500; add $75 if they
   chose rush). Make it the same way each time: Stripe dashboard → **Payment Links →
   + New → Add new product**, name it "Website balance: [their name]", set the amount,
   create, copy, email it. Two minutes.
4. They pay, you flip the site live.

That is the entire "billing system." No code involved. The $50 deposit link is the
only one the site charges automatically; every balance is a quick personal link.

### Handy Stripe facts
- Refunds (for the resume guarantee, or a deposit if you cannot take a job): open the
  payment in the dashboard, click Refund.
- Domain billing: when a client wants their own `.com`, buy it (~$20/yr) and bill it
  through Stripe. The client picks $4/mo or $20/yr in the portal. Note the margin: at
  $20/yr you roughly break even after the domain cost and Stripe fees, while $4/mo
  ($48/yr) actually earns. If you want yearly to profit too, bump that Stripe price.
- Use **Test mode** (toggle, top right) to try a fake checkout with card
  `4242 4242 4242 4242`. Real links must be created in **live** mode, test-mode links
  do not move real money.

---

## 2. Netlify (about 15 minutes)

Netlify hosts the site free AND receives the intake form, including file uploads.
No server needed. (This is why we are not using GitHub Pages: it cannot receive forms.)

1. Push this folder to a GitHub repo (private is fine):
   ```
   git init
   git add .
   git commit -m "FolioLabz site"
   ```
   then create a repo on github.com and follow its push instructions.
2. Go to https://app.netlify.com, sign up with GitHub, click
   **Add new site → Import an existing project**, pick the repo.
   Build settings are auto-detected from `netlify.toml`. Deploy.
3. Turn on email notifications: **Site → Forms → Form notifications →
   Add notification → Email**, choose your email. Do it for all three forms
   (`website-intake`, `resume-intake`, and `client-request` from the client portal).
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

## Hosting and domains (how it actually works)

This trips up a lot of people, so here is the plain truth.

**Hosting is free. Really.** Netlify (and GitHub Pages) host sites at no cost, with
no time limit. You can keep every client site online forever and pay $0. That is
why the site tells clients "hosting is included free." Do not charge a hosting fee to
survive; you do not need one.

**The site's domain offer: free address, or a custom one you handle.** This is what
the pricing page and FAQ now promise, so handle it this way:
- **Free (default):** launch on a clean Netlify address like `janedoe.netlify.app`.
  $0, live today. Great for students.
- **Custom `.com` / `.net` (billed by you):** buy the domain yourself
  (Namecheap ~$20/yr including their WHOIS privacy), connect it in Netlify
  (Domain management → Add a domain, HTTPS is automatic), and bill the client
  through Stripe. The client portal lets them pick either the `domainMonthly`
  recurring price ($4/mo) or the `domainYearly` recurring price ($20/yr). Either
  way the client never touches a domain company; you own the account and just keep
  it pointed at their site.

**What the site promises clients:** hosting free on a `.netlify.app` address, or
your own `.com` for $4/mo (or $20/yr) that you set up and bill. Nothing about a Care
Plan (that was removed) and no talk of them buying their own domain.

---

## 3. Nice-to-haves (whenever)

- **Custom domain** (~$20/year cost, you bill it via Stripe at $4/mo or $20/yr): buy
  it at Namecheap, connect it in Netlify (Domain management → Add a domain), HTTPS is
  automatic. See the hosting section above.
- **Screenshot thumbnails**: see `public/examples/README.txt`. Optional polish
  for the Styles page while live previews load.
- **Meetings**: for the $75 resume tier and the Pro strategy call, replying by
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
   little project, separate from this FolioLabz marketing site).
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

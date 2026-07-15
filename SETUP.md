# FolioLabz: Your Setup Checklist

The site is built. Three things are left, and they are all yours because they need
your accounts: **Stripe** (payments), **Netlify** (hosting + the intake form), and a
couple of config touches. Budget about an hour total.

---

## 🚨 YOUR LAUNCH TO-DO LIST (updated 2026-07-13)

These are the things only you can do. The first two block your launch posts.

- [ ] **1. Fix file uploads (BROKEN on the live site right now).** The upload code
  is in place, but the accounts behind it are not, so the intake form currently
  shows "File uploads are not configured yet" and the resume track cannot be
  submitted at all (it requires a resume upload). Do section
  **"2. Cloudinary + Turnstile + Netlify"** below: create the Cloudinary preset,
  create the Turnstile widget, paste all the environment variables into Netlify,
  and redeploy. About 30 minutes. **Do not post the launch announcement until
  this works.**
- [x] **2. Add your photo. DONE (2026-07-14):** the rocket photo is cropped to
  `public/josh-founder.jpg` and shows in the home-page story section. Optional
  upgrade whenever: a close-up of your face (no sunglasses, ~600x600) saved as
  `public/josh-headshot.jpg`, then set `founder.showPhoto: true` in
  `src/config/site.js` to also get the small round avatar by your signature.
- [ ] **3. Dress rehearsal on the live site.** After #1: submit the website form
  with a couple of real files, submit the resume form, and send one portal
  request. Confirm all three land in your email, the files appear in Cloudinary,
  and every link in the summary opens.
- [ ] **4. Get two one-line testimonials.** Ask David and Caroline for one honest
  sentence each about their site. Send them to me (Claude) with "add testimonials"
  and I will build the section; the site intentionally ships without fake quotes.
- [ ] **5. Pick an analytics option before launch week.** Netlify Analytics
  ($9/mo, zero setup) or GoatCounter (free, one script tag; tell me and I will add
  it). Without one you will not know what your launch posts actually did.
- [ ] **6. Add real clients to `src/config/clients.js`** (David, Caroline) so the
  portal recognizes their emails. Two-minute copy-paste of the demo template.

Things already handled for you (2026-07-13): social link previews (Open Graph
tags + `public/og.png`), real screenshot thumbnails in `public/examples/`, and the
new paper theme. If you ever change the primary domain away from foliolabz.com,
update the `og:` URLs in `index.html`.

---

## 0. Two-minute config touches (do these first)

Open `src/config/site.js`:

1. **Email**: near the top, set `email:` to the address you want clients using. It is
   currently a guess.
2. **Caroline's site**: done, it is live in `realSites`. When you launch a new
   client site, copy one of those entries, drop a thumbnail in `public/examples/`,
   and set `live: true`.
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
| `domainYearly` | Yearly Custom Domain | $30/yr recurring |
| `editWording` | Website Wording Edit | $10 one-time |
| `editDesign` | Website Design Edits | $40 one-time |
| `resumePolish` | Resume Polish | $40 one-time |
| `resumeMeeting` | Resume Polish Pro | $75 one-time (this is the polish + 30-min meeting tier) |

If you ever need to recreate one: Stripe dashboard → **Payment Links → + New →
Add new product**, then copy the new URL into the matching key above and redeploy.
Any link left as `""` simply hides its Pay button (the site shows "I'll email you a
link" instead), which is how you can go live before every link exists.

> **The client portal** (`/portal`) is where existing clients pay a balance, start a
> custom domain after you confirm availability, or request an edit. Domain billing is
> always $30/year. It uses every
> key above except `deposit` and `resumePolish`/`resumeMeeting` (those two live on
> the public Resume Polish section instead).

---

## Your client list (src/config/clients.js)

This file is your customer spreadsheet. Add one entry per client (copy the template
at the top of the file) and the portal recognizes their email: they skip typing
their name, see exactly their balance (computed from their package + rush), their
domain status, and nothing they do not need. Unknown emails still get the generic
"pick your package" flow, so a client you have not entered yet is never locked out.

The secure portal routine, in order:
1. A form submission lands in your email.
2. In **SQL Editor**, add their private `client_profiles` record with their email and build details. Do not create an Authentication user or send an invitation—the portal does that automatically the first time they sign in.
3. Keep their profile current in **SQL Editor**. The table structure and example query are in `supabase/client_profiles.sql`.
4. For a custom domain request, check any names they supplied. Once one is confirmed, add it to their private profile and leave `domain_active` off until their subscription is active.
5. When their balance payment arrives in Stripe, update `balance_due` to `0` in their profile.

Clients sign in with a secure email link; their browser can retrieve only the profile row matching their authenticated email. No client names, emails, balances, or domains are stored in the public website code.

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
- Domain billing: check availability before putting a name in the client file. The
  portal then asks the client to start the $30/year subscription. Buy and connect the
  domain only after that payment is active.
- Use **Test mode** (toggle, top right) to try a fake checkout with card
  `4242 4242 4242 4242`. Real links must be created in **live** mode, test-mode links
  do not move real money.

---

## 2. Cloudinary + Turnstile + Netlify (about 30 minutes)

The intake wizard now sends every file directly from the customer's browser to
Cloudinary. Netlify receives only ordinary text fields, clickable Cloudinary URLs,
and a compact JSON manifest. A 160 MB batch of photos therefore creates only a few
kilobytes of Netlify form data.

### A. Create the signed Cloudinary upload preset

1. Create a Cloudinary account and open **Settings → Upload → Upload presets**.
2. Add a preset named `foliolabz_signed_intake` and set its signing mode to
   **Signed**. Do not use an unsigned preset for this form.
3. Set the maximum file size to **15 MB** (`15728640` bytes).
4. Allow these formats: `jpg,jpeg,png,heic,webp,pdf,doc,docx`.
5. Add an incoming image transformation of `c_limit,w_4000,h_4000`. The browser
   already shrinks oversized local phone photos; this preset rule also covers
   supported remote-source images.
6. Save the preset. Copy the cloud name, API key, and API secret from Cloudinary's
   API Keys page.

The API key and preset name are public identifiers. The **API secret is private**
and must never be placed in a `VITE_` variable or frontend file.

### B. Create the Cloudflare Turnstile widget

1. In Cloudflare, open **Turnstile → Add widget**.
2. Add the production FolioLabz hostname and the Netlify preview hostname you use
   for testing. Choose the managed widget type.
3. Copy the site key and secret key.

Customers complete this check once. The server exchanges it for a one-hour upload
session, so a 30-file batch does not ask for 30 CAPTCHAs.

### C. Add Netlify environment variables

In **Netlify → Site configuration → Environment variables**, add the values shown
in `.env.example`. Use the same Cloudinary cloud name, API key, and signed preset
for both the public `VITE_` entries and their server-side counterparts:

| Variable | Where it is used |
|---|---|
| `VITE_CLOUDINARY_CLOUD_NAME` | Browser upload widget |
| `VITE_CLOUDINARY_API_KEY` | Browser upload widget; safe to expose |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Browser upload widget |
| `VITE_TURNSTILE_SITE_KEY` | Browser security check |
| `CLOUDINARY_CLOUD_NAME` | Netlify Functions |
| `CLOUDINARY_API_KEY` | Netlify Functions |
| `CLOUDINARY_UPLOAD_PRESET` | Signature allowlist |
| `CLOUDINARY_API_SECRET` | Signature, tagging, and cleanup; private |
| `TURNSTILE_SECRET_KEY` | CAPTCHA verification; private |
| `UPLOAD_TOKEN_SECRET` | A new random 32+ character value; private |
| `CLOUDINARY_ABANDONED_DAYS` | Optional; defaults to `7` |

Redeploy after adding or changing a `VITE_` variable because Vite embeds those
public values at build time.

### D. What the server automation does

- `upload-authorize` verifies Turnstile and issues a short-lived upload session.
- `cloudinary-signature` signs only the customer's session folder and approved
  preset. The Cloudinary API secret never reaches the browser.
- Netlify rate limits CAPTCHA authorization to 10 requests per minute and upload
  signatures to 90 per minute per IP/domain, leaving room for a 30-file batch.
- `cloudinary-form-events` waits for Netlify to verify the form, then marks every
  listed asset as submitted.
- `cloudinary-cleanup` runs daily and deletes only uploads that are still pending
  after seven days. Submitted customer files are preserved.

Each submission is organized below
`foliolabz/intake/<upload-session>/<file-category>`. The form saves both the secure
URL and Cloudinary public/asset IDs.

### E. Deploy and test

1. Deploy to Netlify. In **Forms**, keep email notifications enabled for
   `website-intake`, `resume-intake`, and `client-request`.
2. Submit the website intake with several files totaling more than 8 MB.
3. Confirm the Cloudinary Media Library receives the originals in the session
   folder while the Netlify form shows URLs and no binary file fields.
4. Open links from the `summary` field and confirm they resolve.
5. Check the Functions log once: the verified form event should add the
   `foliolabz-submitted` tag. New uploads initially carry `foliolabz-pending`.

The uploader supports multiple files, drag-and-drop, phone camera selection,
Google Drive, Dropbox, upload progress, previews, retry/removal controls, five
files per project, 30 files per intake, and 15 MB per file. The Submit button stays
disabled while a queue is active.

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
  through Stripe. The client may submit up to three names or leave them blank. Once
  you confirm an available name in `clients.js`, the portal shows the `domainYearly` recurring price
  ($30/yr). Buy and connect it only after that payment is active. The client never
  touches a domain company; you own the account and keep it pointed at their site.

**What the site promises clients:** hosting free on a `.netlify.app` address, or
your own `.com` for $30/yr that you set up and bill. Nothing about a Care
Plan (that was removed) and no talk of them buying their own domain.

---

## 3. Nice-to-haves (whenever)

- **Custom domain** (~$20/year cost, you bill it via Stripe at $30/yr): buy
  it at Namecheap, connect it in Netlify (Domain management → Add a domain), HTTPS is
  automatic. See the hosting section above.
- **Screenshot thumbnails**: already generated (2026-07-13) into
  `public/examples/` as the `*-hd.png` thumbnails configured in `src/config/site.js`. To refresh one or
  add a new client, see `public/examples/README.txt`.
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

## The 3-round edit promise (say this in your launch email)

Every build includes up to **3 rounds of changes** to get it perfect before launch
(this matches what the site promises everywhere). When you email a client their
preview link, spell out the one rule that keeps this sane for you:

> "You have up to 3 rounds of edits to make this perfect. Each round can be as long
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

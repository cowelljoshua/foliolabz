# FolioLabz Remaining Setup Guide

Last audited: July 16, 2026

This is the single checklist for getting the public intake form, file uploads, secure client portal, automatic Supabase profiles, and private owner dashboard working together.

Do not paste secret keys into this file, GitHub, frontend source code, or any variable beginning with `VITE_`.

---

## 1. Current audit: what is confirmed

### Confirmed in the local project

- [x] The site builds successfully for production.
- [x] The public website, intake wizard, Netlify Forms definitions, client portal, and owner dashboard code exist.
- [x] `/portal` uses Supabase passwordless email links.
- [x] `/owner` has a password sign-in and server-side owner allowlist.
- [x] New website submissions call a private Netlify Function that creates the initial Supabase client profile.
- [x] The complete submitted brief is saved in the private `intake` JSON field.
- [x] The intake email also contains a basic fallback SQL insert statement.
- [x] Cloudinary uploads are implemented as signed uploads.
- [x] Turnstile verification is implemented before uploads are unlocked.
- [x] Netlify Forms are declared for `website-intake`, `resume-intake`, and `client-request`.
- [x] A daily function exists to remove abandoned Cloudinary uploads after seven days.
- [x] Stripe payment links appear to be filled in within `src/config/site.js`.

### Confirmed in the local `.env`

Only these two values currently exist locally:

- [x] `VITE_SUPABASE_URL`
- [x] `VITE_SUPABASE_PUBLISHABLE_KEY`

### Not verifiable from the local project

These settings live inside your hosted accounts, so they must be checked manually:

- [ ] Which environment variables are currently saved in Netlify.
- [ ] Whether the latest local code has been committed and deployed. It has not been pushed at the time of this audit.
- [ ] Whether `client_profiles` exists with every required column.
- [ ] Whether the Supabase Row Level Security policy exists and is correct.
- [ ] Whether Supabase Auth URLs and email login are configured.
- [ ] Whether your owner Authentication user exists and has a working password.
- [ ] Whether a Cloudinary signed upload preset exists.
- [ ] Whether Cloudflare Turnstile is configured for the live hostname.
- [ ] Whether Netlify form email notifications are enabled.
- [ ] Whether Stripe links have been tested in live mode.

### Confirmed on the live site on July 16, 2026

- [x] The production site loads on desktop and at a 390 px mobile viewport without horizontal overflow.
- [x] Public pages load without broken images or browser console errors.
- [x] The resume intake reports "Uploads unlocked," confirming that the live upload gate is configured.
- [x] The secure client portal and private owner sign-in screens are available.
- [ ] Submissions, email delivery, authentication, file storage, cleanup, and Stripe payments still require a controlled live dress rehearsal.

---

## 2. Launch blockers, in order

Complete these in this order:

1. [ ] Verify or repair the Supabase table and policy.
2. [ ] Create the Supabase server secret and add all Supabase variables to Netlify.
3. [ ] Create your owner Authentication account and add `OWNER_EMAIL` to Netlify.
4. [x] Create the Cloudinary signed upload preset (the live upload gate unlocks).
5. [x] Create the Cloudflare Turnstile widget (the live upload gate unlocks).
6. [x] Add all Cloudinary and Turnstile variables to Netlify (the live upload gate unlocks).
7. [ ] Push the current local changes and allow Netlify to redeploy.
8. [ ] Enable Netlify form email notifications.
9. [ ] Run the complete live-site test plan at the bottom of this file.

Until steps 1–7 are complete, the new owner dashboard and automatic profile creation will not work on the live site. Until Cloudinary and Turnstile are configured, file uploads remain unavailable.

---

## 3. Supabase database verification and repair

### Step 3A: run this read-only audit first

Open Supabase → **SQL Editor** → **New query**. Paste and run:

```sql
select
  column_name,
  data_type,
  is_nullable,
  column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'client_profiles'
order by ordinal_position;

select
  policyname,
  cmd,
  roles,
  qual
from pg_policies
where schemaname = 'public'
  and tablename = 'client_profiles';
```

This query only reads configuration. It does not add, change, or delete anything.

### Expected `client_profiles` columns

You should see all of these:

- `email`
- `name`
- `package`
- `rush`
- `balance_due`
- `build_status`
- `pay_link`
- `domain`
- `domain_active`
- `created_at`
- `updated_at`
- `intake`

You should also see a SELECT policy named:

`Clients can view their own portal`

Its rule should compare the row email with the authenticated user's email.

### Step 3B: choose the correct repair path

#### If `client_profiles` does not exist

Run the complete file:

`supabase/client_profiles.sql`

Run it once. It creates the table, adds the `intake` field, enables Row Level Security, and creates the client-only SELECT policy.

#### If the table exists but `intake` is missing

Run only:

`supabase/add-intake-column.sql`

That statement is safe for an existing table and does not delete any rows.

#### If the table and `intake` exist

Do not rerun the complete schema file. Its policy creation can fail when the policy already exists. Continue to the Supabase Auth setup.

#### If the table exists but the policy is missing

Run:

```sql
alter table public.client_profiles enable row level security;

grant select on public.client_profiles to authenticated;
revoke insert, update, delete on public.client_profiles from anon, authenticated;

create policy "Clients can view their own portal"
on public.client_profiles
for select
to authenticated
using (email = lower((select auth.jwt() ->> 'email')));
```

Do not run that block if a policy with the same name already exists.

### Step 3C: inspect existing rows

In Supabase → **Table Editor** → `client_profiles`:

- [ ] Confirm every email is lowercase.
- [ ] Confirm `package` is exactly `launch` or `pro`.
- [ ] Confirm `build_status` is exactly `brief`, `building`, `review`, `polish`, or `live`.
- [ ] Confirm balances are numbers without dollar signs.
- [ ] Confirm `domain_active` and `rush` are true/false values.
- [ ] Export a CSV backup before making bulk edits if real client rows already exist.

### What happens after this is working

New website intake submissions automatically insert a profile with:

- normalized email and name;
- package and rush choice;
- calculated remaining balance;
- starting build status of `brief`;
- the entire submitted form inside `intake`;
- uploaded-file URLs inside the intake data.

A repeated public form submission cannot overwrite an existing client profile.

---

## 4. Supabase API keys and Netlify variables

Open Supabase → **Project Settings** → **API Keys**.

You need:

- the project URL;
- the publishable key (`sb_publishable_...`);
- a server secret (`sb_secret_...`) or legacy `service_role` key.

The publishable key is safe in browser code. The secret/server key bypasses Row Level Security and must exist only in Netlify Functions.

Open Netlify → your FolioLabz project → **Project configuration** → **Environment variables**.

Add:

| Variable | Value | Recommended scope | Secret? |
|---|---|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL | Builds | No |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_...` | Builds | No |
| `SUPABASE_URL` | Same Supabase project URL | Functions | No |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase `sb_secret_...` or legacy service-role key | Functions | Yes |
| `SITE_URL` | `https://foliolabz.com` | Functions | No |
| `OWNER_EMAIL` | The exact lowercase email for your owner account | Functions | No |

Notes:

- Mark `SUPABASE_SERVICE_ROLE_KEY` as containing a secret value.
- Never name the server key `VITE_SUPABASE_SERVICE_ROLE_KEY`.
- `OWNER_EMAIL` can contain multiple comma-separated emails later.
- Redeploy after changing any `VITE_` variable because it is embedded during the build.

---

## 5. Supabase Authentication setup

### Client portal email links

Open Supabase → **Authentication** → **URL Configuration**.

Set:

- **Site URL:** `https://foliolabz.com`
- **Additional redirect URL:** `https://foliolabz.com/portal`

If the live site uses a different hostname, use that exact hostname instead.

Then verify under **Authentication** → **Providers**:

- [ ] Email authentication is enabled.
- [ ] Email confirmations/magic links can be sent.

Clients do not need to be manually invited. The flow is:

1. Their profile exists in `client_profiles`.
2. They enter their email at `/portal`.
3. A server function verifies that the profile exists.
4. Supabase creates their Auth user when needed and emails a magic link.
5. Row Level Security returns only the matching client profile.

### Owner account

The owner is the one account that should be created manually.

Open Supabase → **Authentication** → **Users** → **Add user**:

- Use the exact email entered in Netlify's `OWNER_EMAIL`.
- Choose a strong unique password.
- Enable auto-confirm for this owner account.

If an Auth user with that email already exists, do not create a duplicate. Use Supabase's password recovery/reset flow to establish a password for that user.

After deployment, sign in at:

`https://foliolabz.com/owner`

The owner page is not linked in the public navigation. More importantly, every owner data request is checked again on the server against `OWNER_EMAIL`.

---

## 6. Cloudinary file-upload setup

### Step 6A: create the Cloudinary account

Create or open your Cloudinary account and choose the product environment used for FolioLabz.

Copy these values from Cloudinary's API Keys page:

- Cloud name
- API key
- API secret

The API secret is private.

### Step 6B: create the signed preset

Open Cloudinary → **Settings** → **Upload** → **Upload presets** → **Add Upload Preset**.

Use:

- **Preset name:** `foliolabz_signed_intake`
- **Signing mode:** Signed
- **Maximum file size:** 15 MB / `15728640` bytes
- **Allowed formats:** `jpg,jpeg,png,heic,webp,pdf,doc,docx`
- **Image size limit:** maximum 4000 × 4000 using an incoming limit transformation if the UI supports it

Do not make this preset unsigned. The website asks a Netlify Function to create a signature for every approved upload.

The code places uploads under:

`foliolabz/intake/<session-id>/<category>`

New files receive a pending tag. A verified form submission adds a submitted tag. The scheduled cleanup function removes only old files that remain pending.

### Step 6C: add Cloudinary values to Netlify

| Variable | Value | Recommended scope | Secret? |
|---|---|---|---|
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloud name | Builds | No |
| `VITE_CLOUDINARY_API_KEY` | API key | Builds | No |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | `foliolabz_signed_intake` | Builds | No |
| `CLOUDINARY_CLOUD_NAME` | Cloud name | Functions | No |
| `CLOUDINARY_API_KEY` | API key | Functions | No |
| `CLOUDINARY_UPLOAD_PRESET` | `foliolabz_signed_intake` | Functions | No |
| `CLOUDINARY_API_SECRET` | API secret | Functions | Yes |
| `CLOUDINARY_ABANDONED_DAYS` | `7` | Functions | No |

Mark `CLOUDINARY_API_SECRET` as secret.

---

## 7. Cloudflare Turnstile setup

Cloudinary uploads remain locked until the visitor completes Turnstile.

Open Cloudflare → **Turnstile** → **Add widget**.

Suggested settings:

- **Name:** `FolioLabz intake uploads`
- **Widget mode:** Managed
- **Production hostname:** `foliolabz.com`
- Add the active Netlify hostname if you also test there.

Copy the site key and secret key.

Add these to Netlify:

| Variable | Value | Recommended scope | Secret? |
|---|---|---|---|
| `VITE_TURNSTILE_SITE_KEY` | Turnstile site key | Builds | No |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key | Functions | Yes |
| `UPLOAD_TOKEN_SECRET` | A new random secret of at least 32 characters | Functions | Yes |

Use a password manager to generate `UPLOAD_TOKEN_SECRET`. Do not reuse a password or another API key.

Mark both `TURNSTILE_SECRET_KEY` and `UPLOAD_TOKEN_SECRET` as secret.

Turnstile requires both browser rendering and server-side validation; the project already implements both pieces.

---

## 8. Complete Netlify environment-variable checklist

Use this as the final comparison against Netlify:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SITE_URL=https://foliolabz.com
OWNER_EMAIL=

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_API_KEY=
VITE_CLOUDINARY_UPLOAD_PRESET=foliolabz_signed_intake
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_UPLOAD_PRESET=foliolabz_signed_intake
CLOUDINARY_API_SECRET=
CLOUDINARY_ABANDONED_DAYS=7

VITE_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
UPLOAD_TOKEN_SECRET=
```

Do not commit a completed version of that block.

After saving the variables, trigger a new production deploy.

---

## 9. Netlify Forms and notifications

The project already contains hidden form declarations for:

- `website-intake`
- `resume-intake`
- `client-request`

After a successful deploy:

1. Open Netlify → **Forms**.
2. Confirm all three names appear.
3. Enable an email notification to your business email for each form.
4. Check spam after the first test submission.
5. Do not delete the hidden forms from `index.html`; Netlify uses them during the build to discover field names.

The website form still sends its readable summary email. Automatic Supabase profile creation happens separately after the Netlify form accepts the submission.

---

## 10. Deploy the pending code

At the time of this audit, the following work exists locally but is not on `origin/main`:

- homepage font correction;
- expanded section choices;
- corrected deposit/brief step order;
- full-intake Supabase storage;
- automatic client profile creation;
- `/owner` dashboard;
- owner-only client-management function;
- SQL intake-column migration.

Before testing the live site:

1. Commit these changes.
2. Push `main` to GitHub.
3. Wait for Netlify's production deploy to finish.
4. Confirm the deploy log includes the Netlify Functions.

Do not test `/owner` or automatic profiles against the live site until this deploy is complete.

---

## 11. End-to-end live test plan

Use test information rather than a real client's data for the first pass.

### Test A: website intake and uploads

- [ ] Open `/start?package=launch` in a private/incognito window.
- [ ] Complete Turnstile and confirm uploads unlock.
- [ ] Upload one image.
- [ ] Upload one PDF or Word resume.
- [ ] Add a sample project with one file.
- [ ] Submit the form.
- [ ] Confirm `/thanks` loads.
- [ ] Confirm the `website-intake` submission appears in Netlify Forms.
- [ ] Confirm the readable summary reaches your email.
- [ ] Confirm a new row appears in Supabase `client_profiles`.
- [ ] Confirm `intake` contains the full form data.
- [ ] Confirm uploaded-file URLs appear inside `intake`.
- [ ] Confirm files appear in Cloudinary under the expected session folder.
- [ ] Confirm submitted files receive the submitted tag.

### Test B: client portal

- [ ] Open `/portal` in a private/incognito window.
- [ ] Enter the exact email from Test A.
- [ ] Confirm the magic-link email arrives.
- [ ] Open the link and confirm only that profile loads.
- [ ] Try an email that has no profile and confirm it cannot enter the dashboard.

### Test C: owner dashboard

- [ ] Open `/owner`.
- [ ] Sign in using the manually created owner account.
- [ ] Confirm the Test A client appears.
- [ ] Open the client and confirm the complete brief is readable.
- [ ] Change build status and save.
- [ ] Change the balance and save.
- [ ] Sign out and confirm the data is no longer visible.
- [ ] Try a non-owner Supabase account and confirm the owner API rejects it.

### Test D: resume service

- [ ] Submit the resume-only flow with a PDF or Word document.
- [ ] Confirm `resume-intake` appears in Netlify Forms.
- [ ] Confirm the email notification includes a working Cloudinary link.

### Test E: client request

- [ ] While signed into a client profile, submit a domain or edit request.
- [ ] Confirm `client-request` appears in Netlify Forms and reaches your email.

### Test F: payments

- [ ] Open each Stripe link from the website.
- [ ] Confirm the product name and amount are correct.
- [ ] Confirm production links are live-mode links before accepting real payments.

---

## 12. Common failure guide

### “File uploads are not configured yet”

One or more `VITE_CLOUDINARY_*` or `VITE_TURNSTILE_SITE_KEY` values were missing during the build. Add them in Netlify and redeploy.

### Turnstile appears but uploads do not unlock

Check `TURNSTILE_SECRET_KEY` and `UPLOAD_TOKEN_SECRET` in Netlify Functions, then inspect the `upload-authorize` function log.

### Cloudinary uploader opens but signing fails

Check:

- preset name matches `foliolabz_signed_intake` exactly;
- preset is signed;
- `CLOUDINARY_API_SECRET` is correct;
- public and server cloud names/API keys match;
- `CLOUDINARY_UPLOAD_PRESET` matches the browser preset.

### Intake email arrives but no Supabase profile appears

Check:

- `intake` column exists;
- `SUPABASE_URL` is configured for Functions;
- `SUPABASE_SERVICE_ROLE_KEY` is the server secret, not the publishable key;
- the `client-intake` function exists in the deploy;
- Netlify function logs for `client-intake`.

The email's fallback SQL statement can create the basic profile manually while the function is being repaired.

### Client magic-link email does not arrive

Check:

- the client profile exists first;
- Supabase email authentication is enabled;
- Site URL and `/portal` redirect URL are allowed;
- `SITE_URL` is correct in Netlify;
- Netlify function logs for `portal-sign-in`;
- spam/junk folder.

### `/owner` says it is not configured

Check `OWNER_EMAIL`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY` in Netlify Functions.

### Owner can sign in but sees “This account is not an owner”

The Supabase Auth user's email does not exactly match `OWNER_EMAIL`. Compare lowercase addresses and remove accidental spaces.

### Owner signs in but clients do not load

Check the `owner-clients` function log and confirm the server secret is correct. The server secret must be able to bypass Row Level Security.

---

## 13. Security rules to keep

- Never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code or a `VITE_` variable.
- Never expose `CLOUDINARY_API_SECRET`.
- Never expose `TURNSTILE_SECRET_KEY` or `UPLOAD_TOKEN_SECRET`.
- Keep `.env` ignored by Git.
- Use a unique owner password and enable MFA for your Supabase dashboard account.
- Keep owner authorization on the server; hiding `/owner` is not security by itself.
- Export a client-table backup before bulk database changes.
- Do not store card numbers or banking information in Supabase intake data.

---

## 14. Official references

- [Cloudinary upload presets](https://cloudinary.com/documentation/upload_presets)
- [Cloudflare Turnstile setup](https://developers.cloudflare.com/turnstile/get-started/)
- [Cloudflare Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Netlify environment variables](https://docs.netlify.com/build/environment-variables/get-started/)
- [Supabase API key types](https://supabase.com/docs/guides/getting-started/api-keys)
- [Supabase redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls)

---

## 15. Definition of done

Setup is complete when all of these are true:

- [ ] A live website form accepts images and documents.
- [ ] The submission reaches Netlify Forms and your email.
- [ ] A complete private Supabase profile is created automatically.
- [ ] The client receives a portal magic link and sees only their profile.
- [ ] You can sign into `/owner`, view the full brief, and update the client.
- [ ] Cloudinary stores submitted files and cleanup handles abandoned ones.
- [ ] Unknown portal emails cannot access client information.
- [ ] All secrets exist only in hosted server-side environment settings.
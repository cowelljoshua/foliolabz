# Wedding planner

The planner is at `/wedding`, with a separate notebook design, and reuses `src/lib/supabase.js` and the existing FolioLabz password recovery route. Public marketing, client portal, owner tools, and client data are unchanged.

## Current status
The user chose to keep backend setup pending on October 3, 2026. FolioLabz Supabase project `ltwbuoqxfgzoeomoioie` is paused; restoration was refused because the account has two active free projects. The planner is therefore deliberately in demo mode. Demo data stays in sessionStorage in the current browser tab; it is not a shared or durable record.

## Enable shared planning later
1. Restore the existing FolioLabz Supabase project after freeing a project slot or upgrading.
2. Apply `supabase/wedding_plans.sql` once to that project. Do not run it over an existing wedding table.
3. Keep email confirmations enabled. Add `https://foliolabz.com/wedding` and `https://foliolabz.com/reset-password?return=wedding` to the Supabase redirect allowlist. Preserve existing URLs and SMTP configuration.
4. Use the existing deployment Supabase URL and publishable key. Set `VITE_WEDDING_BACKEND_READY=true` and deploy.
5. Verify sign-up, existing-account login, password recovery, owner/partner access, outsider denial, and conflicting revisions before storing personal data.
6. Both partners use confirmed accounts. One creates a plan and enters the other person's exact account email. The second signs in and refreshes to join.

Authorization is enforced by database RLS and column grants: only the owner or designated partner reads/edits a plan, and clients cannot change its membership. Writes require a matching revision to avoid silent overwrites. Background refresh pauses while forms are open. No service-role key belongs in the client.

The earlier standalone private `cowelljoshua/wedding-planner` repository is a prototype, not the deployment target. An empty wedding table was created in the job-scraper project before the request changed to FolioLabz; it is not used by this integration. No existing records were changed or removed.

## Verification
`npm run build` builds the complete site. Start development on port 5174 and run `npx playwright test` for planner CRUD, persistence, text escaping, mobile layout, and home/portal smoke checks. These tests intentionally exercise demo mode; live backend verification remains pending.

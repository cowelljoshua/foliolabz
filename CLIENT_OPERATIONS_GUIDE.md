# FolioLabz Client Operations Guide

Use this guide after every website intake. The owner dashboard is the source of truth; this file is the backup operating procedure.

## The rule that keeps everything organized

For every client, always keep these three fields current in `/owner`:

1. **Next action for you**: the single next task you will personally do.
2. **Blocked by**: anything you are waiting for from the client, a service, or a payment.
3. **What the client should do or expect next**: the client-safe update shown in their portal.

Save the owner profile whenever you check off tasks or change a client-facing update.

## When a new form arrives

1. Open Netlify > FolioLabz > Forms > `website-intake` and confirm the submission exists.
2. Open Cloudinary Assets and confirm every uploaded file is present.
3. Open `/owner`. The client should already appear because the intake function creates their Supabase profile.
4. Read the complete brief and open every submitted file and link.
5. Confirm the selected package, rush status, deposit, and remaining balance.
6. In the detailed tracker:
   - complete **Review the complete intake and uploaded files**;
   - list missing items under **Blocked by**;
   - set **Next action for you**;
   - set the client-facing next step;
   - set a target launch date when the scope is clear.
7. Save changes.
8. Send the kickoff message from your normal email account. Do not promise a date that is not saved in the tracker.

## Planning and building

1. Confirm the pages, sections, visual direction, and required assets.
2. Check off owner tasks as they are completed.
3. Mark only appropriate milestones as **Client sees this**. Private notes and internal tasks never leave the owner workspace.
4. Keep the main **Build status** aligned with the current phase:
   - `Brief received`: intake is being reviewed;
   - `Building`: planning/build work has started;
   - `Client review`: a preview is ready;
   - `Final polish`: approved revisions are being completed;
   - `Live`: the production site is launched.
5. If work stops, write the reason in **Blocked by** and update the client-facing next step the same day.

## Private preview and revisions

1. Publish the private preview.
2. Paste its URL into **Private preview link**.
3. Change **Build status** to `Client review`.
4. Check **Private preview ready** and save. The client portal will show the milestone and preview button.
5. Keep each revision round together. One round may contain many requested changes.
6. Record private implementation notes on the relevant task.
7. After each round, update the client-facing next step.
8. Get written final approval before checking **Final design approved**.

## Payment and launch

1. Confirm the remaining balance and personal payment link in `/owner`.
2. Confirm Stripe shows the payment as successful before setting the balance to zero.
3. If there is a custom domain, verify ownership, DNS, HTTPS, and renewal billing.
4. Run production QA:
   - phone and desktop layouts;
   - navigation and external links;
   - contact form delivery;
   - resume download;
   - page titles and social preview;
   - domain and HTTPS;
   - accessibility basics.
5. Set **Build status** to `Live`, check **Site launched**, set the final live URL, and save.
6. Send the handoff email with the live link, support instructions, and payment receipt.
7. Check **Handoff complete**.

## Daily owner routine

At the start of each work session:

1. Open `/owner`.
2. Search for projects with a blocker or an overdue task.
3. Work from **Next action for you**, not from memory.
4. Update the client-facing next step before ending the session.
5. Save every changed client.

## Weekly business review

- Count active builds by phase.
- Review every unpaid balance.
- Review every project without a target launch date.
- Review every blocker older than two business days.
- Confirm completed launches have handoff and domain-renewal notes.

## Definition of done for one client

- [ ] Intake and uploads verified
- [ ] Scope, package, and timeline confirmed
- [ ] Required assets received
- [ ] Design direction approved
- [ ] Responsive build completed
- [ ] Forms, links, downloads, and accessibility tested
- [ ] Preview delivered
- [ ] Up to three revision rounds tracked
- [ ] Written final approval received
- [ ] Remaining balance confirmed paid
- [ ] Domain and HTTPS verified
- [ ] Production QA passed
- [ ] Client portal updated to Live
- [ ] Handoff sent

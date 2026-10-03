# Product and behavior contract
Source: user request for a generic wedding planner shared with a girlfriend; user explicitly chose Supabase sign-in. The user chose the existing FolioLabz project and explicitly deferred backend activation.

## Canonical UI Map
| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
|---|---|---|---|---|
| Select/Listbox | select() in src/wedding/planner.js | This contract | native OS popup | Browser keyboard |
| Date | field() in src/wedding/planner.js | This contract | native date/time | Browser form |
| Form | modal() and field() | This contract | create/edit | Browser CRUD |
| Scrollbar | src/wedding/style.css | src/wedding/DESIGN.md | global baseline | Browser |
| Toast | notice() | This contract | status/error | Live region |
| CRUD | save()/edit() | This contract | return to owning list | Browser CRUD |

## Shared rules
- All mutations save explicitly; successful saves return to the owning list and announce completion.
- Errors keep form values available. Required fields use inline errors and first-invalid focus. Native validation bubbles disabled.
- Dialog uses native showModal for focus trapping, inert background, Escape, and restoration. Delete requires named confirmation.
- Lists paginate at 10. Checklist filter is ephemeral UI state; names, guest details, and notes never appear in URLs.
- Native selects and date/time pickers intentionally use platform behavior and locale. Stored date values are date-only, formatted at local noon to avoid UTC day shifts.
- No data is fetched before authentication. Database access is limited to the owner and a single explicitly designated partner email. Users cannot update owner_id or partner_email via column grants.
- Concurrent writes require the current revision; a mismatch preserves the draft and requests refresh/reapplication. Automatic refresh every 15 seconds pauses during edits. No offline save claims.
- Demo is explicitly isolated in sessionStorage. Real planner data remains in Supabase; browser stores only Supabase-managed auth sessions.
- Sign-up confirmation and password-reset email are user-initiated actions only.
- Modal drafts can be cancelled intentionally with Cancel, close, or Escape. No navigation occurs while the modal is open.


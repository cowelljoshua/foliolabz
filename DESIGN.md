---
version: alpha
name: FolioLabz
description: Preserve the drafting-table identity and isolate the wedding notebook workspace.
colors:
  primary: "#2a4fd6"
  background: "#f4f1e9"
  text: "#182230"
typography:
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
omitted:
  - section: rounded
    reason: Existing shared controls retain their established radii in src/index.css.
  - section: spacing
    reason: Existing utility layouts remain unchanged.
components:
  button: {}
---
# FolioLabz design scope

## Overview
The existing site follows a drafting-table identity. This change adds a distinct private product workspace at `/wedding`; it does not redesign marketing, portal, or owner pages. Its complete notebook contract is in `src/wedding/DESIGN.md`.

## Colors
The existing src/index.css @theme remains canonical. Primary maps to --color-violet, background to --color-ink-950, and text to --color-frost. The planner has its own scoped properties inside a ShadowRoot.

## Typography
Existing Inter and Space Grotesk remain unchanged. The wedding workspace uses its separately documented serif/display pairing with browser fallbacks.

## Layout
Keep current routes and shared layout. Wedding is a full-screen route outside the marketing Layout, like the existing owner workspace. Its ShadowRoot prevents global selectors from altering sibling screens.

## Elevation & Depth
Retain existing glass and button styles. Wedding uses flat borders and a modal backdrop.

## Shapes
Retain existing controls; wedding shapes are local to its stylesheet.

## Components
Reuse the maintained Supabase singleton and password recovery route. The new planner's modal, fields, pagination, notices, and mutations have shared owners documented in UX-CONTRACT.md. No new service-role credential or auth client is introduced.

## Do's and Don'ts
- Preserve sibling screen behavior.
- Keep wedding CSS isolated.
- Do not treat browser demo state as shared persistence.

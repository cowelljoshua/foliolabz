---
version: alpha
name: Ever After
description: A shared wedding planning notebook for two.
colors:
  primary: "#345747"
  ink: "#273e33"
  muted: "#687269"
  paper: "#fafbf7"
  surface: "#ffffff"
  sage: "#e8eee4"
  border: "#dce3d7"
  accent: "#f0e8dd"
  danger: "#a42e34"
typography:
  body:
    fontFamily: "DM Sans, sans-serif"
  display:
    fontFamily: "Libre Caslon Display, Georgia, serif"
rounded:
  DEFAULT: "12px"
spacing:
  section: "22px"
components:
  button: {}
  dialog: {}
  panel: {}
---
# Ever After

## Overview
A linen wedding planning notebook, with quiet green dividers and a handwritten-feeling serif. Product surface for a couple planning together on laptops and phones; English, USD. Signature: an oversized date countdown on a pale sage invitation panel. Avoid sales-page heroes, invented guest data, and confetti-heavy gamification.

## Colors
Runtime CSS custom properties in src/style.css are canonical; frontmatter mirrors them. Each colors key maps directly to the identically named CSS custom property, consumed by shared controls and panels. Sage distinguishes navigation and the countdown; sand accent belongs to the personal note. Danger is reserved for errors and deletion. Light theme only.

## Typography
Display font for headings, figures, and wordmark; body font for controls and descriptions. Fallback fonts keep all functions available without network fonts. Small tracked labels organize information without dominating the page.

## Layout
238px desktop navigation, 1320px maximum workspace. At 760px the navigation becomes a horizontal scroll strip and content stacks naturally. Lists paginate at 10 items. Document owns vertical scrolling; dialogs own their overflow.

## Elevation & Depth
Flat bordered panels. Shadows only for transient feedback. Dialog backdrop separates editing from the underlying workspace.

## Shapes
12px panels, 7px controls, circular initials. Use modest curves, not floating pill cards everywhere.

## Components
Buttons use primary, secondary, quiet, and danger classes. Focus is an explicit 3px outline; disabled controls reduce opacity. Shared modal(), field(), select(), save(), and notice() own behavior across all sections. Native date/time/select controls intentionally use OS popup geometry. Global scrollbars use named thumb/hover/active/track tokens. Motion is limited to 150ms control feedback and disabled for reduced motion. User content is escaped at every HTML boundary.

## Do's and Don'ts
- Keep the planner directly usable, with honest empty states.
- Keep sample tasks distinguishable from personal data; leave dates and guest lists empty.
- Never imply demo data syncs between devices.
- Never place authorization secrets in the frontend.

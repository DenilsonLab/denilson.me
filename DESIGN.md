---
name: Denilson / dev.play
description: A personal maker's workspace where projects become useful tools.
colors:
  cobalt: '#2147d9'
  ink: '#172134'
  cool-paper: '#edf1f5'
  soft-cobalt: '#dfe6fa'
  signal-lime: '#d9f24e'
  quiet: '#516078'
  line: '#bac6d5'
  white: '#ffffff'
  panel: '#f9fbff'
  food-paper: '#f7f6ed'
typography:
  display:
    fontFamily: 'Bricolage, sans-serif'
    fontSize: 'clamp(58px, 6.6vw, 105px)'
    fontWeight: 750
    lineHeight: 0.98
    letterSpacing: '-0.04em'
  headline:
    fontFamily: 'Bricolage, sans-serif'
    fontSize: 'clamp(48px, 6vw, 84px)'
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: '-0.04em'
  project-title:
    fontFamily: 'Bricolage, sans-serif'
    fontSize: 'clamp(34px, 4vw, 58px)'
    fontWeight: 700
    letterSpacing: '-0.04em'
  body:
    fontFamily: 'Bricolage, sans-serif'
    fontSize: '16px'
    lineHeight: 1.75
  instrument:
    fontFamily: 'Space Grotesk, sans-serif'
    fontSize: '11px'
rounded:
  control: '8px'
  button: '9px'
  stage: '16px'
spacing:
  compact: '8px'
  inline: '12px'
  regular: '20px'
  section: '65px'
components:
  button-primary:
    backgroundColor: '{colors.cobalt}'
    textColor: '{colors.white}'
    rounded: '{rounded.button}'
    padding: '12px 20px'
  button-secondary:
    backgroundColor: '{colors.panel}'
    textColor: '{colors.ink}'
    rounded: '{rounded.button}'
    padding: '12px 20px'
  input:
    backgroundColor: '{colors.white}'
    textColor: '{colors.ink}'
    rounded: '{rounded.control}'
    padding: '11px 13px'
---

# Design System: Denilson / dev.play

## Overview

**Creative North Star: "The useful maker's workspace"**

The production portfolio extends the existing dev.play world: cool paper, cobalt ink,
expressive type and a tangible little computer. Its editorial project surfaces let real
work carry the story. This describes the implemented design, not a testimonial or a new
claim about Denilson's professional history.

The console is a viewer for real public project screenshots and direct case-study links. Interior pages
retain the identity with quieter reading layouts. The Orbit proposal is a separate,
unindexed preview world; its palette and composition are not production tokens.

**Key Characteristics:**

- Cobalt identity on cool paper with dark ink for reading.
- Expressive Bricolage headlines and precise Space Grotesk instrumentation.
- A solid, open diagonal D shared by every identity export.
- Quiet editorial project layouts beside a tactile console.
- Stable controls, bilingual content and reduced-motion support.

Recorded from `src/concepts/concepts.css`, `src/concepts/devplay.css`,
`src/layout/portfolio.css`, `src/layout/evolution.css`, `src/index.css` and
`src/components/ProjectPage.tsx`. The frontmatter records reused production
values; `.impeccable/design.json` extends them with motion, depth and runnable examples.

## Colors

The palette pairs a clear working blue with cool neutral paper; project evidence
may adopt bounded project material.

### Primary

- **Cobalt:** identity, highlighted words, primary actions, links and focus accents.
- **Soft cobalt:** secondary action feedback and quiet supporting surfaces.
- **Signal lime:** selected console instrumentation, used locally inside the device.

### Secondary

- **Food paper:** the bounded Karuplan context and solution surfaces.

### Neutral

- **Ink:** primary text, dark navigation actions and the review ground.
- **Cool paper:** the production page canvas.
- **Quiet:** supporting copy and metadata.
- **Line:** dividers and neutral strokes.
- **White and panel:** field backgrounds, action text and interior panels.

**The Product Boundary Rule.** Keep project-specific colors inside their project surfaces;
the surrounding portfolio retains cobalt, ink and cool paper.

## Typography

**Display and Body Font:** Bricolage (the locally declared Bricolage Grotesque variable
font), with sans-serif fallback. **Instrument Font:** Space Grotesk, with sans-serif
fallback. Both are self-hosted with `font-display: swap`.

The wide, lively headline voice belongs to a maker's portfolio; instrument text is
smaller and more precise. Body copy remains in Bricolage rather than introducing a third
reading face. Type values in frontmatter describe desktop roles, not universal sizes.

### Hierarchy

- **Display:** the home introduction. At the home collapse breakpoint it uses
  `clamp(48px, 10vw, 84px)`; narrow-screen rules adjust it further.
- **Headline:** interior page titles, with tight tracking and compact leading.
- **Project title:** editorial project names; mobile names settle at (40px).
- **Body:** the home lead; case prose also uses (14–19px) according to context.
  Editorial project summaries are capped at (32ch), case challenges at (75ch).
- **Demo title:** the active product example, with compact leading.
- **Instrument:** console captions and numbered journey markers. These are functional
  labels, not decorative headings above headings.

**The Reading Voice Rule.** Use Bricolage for the main reading hierarchy and Space
Grotesk for instrumentation; preserve actual Spanish and English copy.

## Layout

The home desktop hero uses a two-column introduction/console composition (1fr/1.1fr),
with (7%) gap, (4.5%) side gutters and a maximum width of (1600px). At (1000px) and
below it becomes one column; the console is centered with a maximum width of (560px).
The introduction and work link precede the console in reading order.

Interior sections and the making-of surface use a maximum width of (1440px) and the
same percentage gutters. Editorial projects use a (1.2fr/0.8fr) split and alternate
image position. At (760px) and below they stack, with images before text and (60px)
between projects. Desktop projects use (110px) separation. Case experiences move from
(0.8fr/1.2fr) to one column at the same breakpoint. Journey steps use horizontal
one-pixel rules, not colored side stripes.

Control and content spacing recur at (8px), (12px), (20px) and (28px). Section-scale
spacing is deliberately larger; do not compress editorial space into a uniform card
grid. The printable profile has its own compact print rules.

## Elevation & Depth

The console uses physical casing, perspective, inset detail and a ground grid. Editorial
project stages are flat, borderless color fields. Case hero images receive a diffuse
ambient shadow (`0 20px 50px #1721341a`); the mobile menu uses
`0 10px 30px #17213426`. Depth belongs to these concrete roles.

Existing hard offset shadows remain on some legacy buttons, cards and the contact
device. They are implementation drift and are not a reusable rule for new editorial
surfaces. This record does not repair source styling.

**The Editorial Ground Rule.** Keep editorial project stages flat; reserve physical
depth for the console and diffuse lift for floated reading surfaces.

## Shapes

Controls have gently curved corners; product examples and screenshots use larger
rounding, while broad project stages are softer again. Portraits are circular.

The identity is the solid D with a diagonal opening. Its canonical source is
`src/config/brand.ts`, rendered by `src/concepts/MakerMark.tsx` with `viewBox="0 0 64 64"`:

```text
M10 8H30C45 8 56 18 56 32S45 56 30 56H24L34 44C40 42 44 38 44 32C44 25 38 20 30 20H22V40L10 54V8Z
```

Preserve the path, aspect ratio and diagonal negative space. The mark uses
`currentColor`; use the exported cobalt, ink or white monochrome variants for contrast.
The header renders it at (48px), or (42px) below the mobile breakpoint. The generated
favicon supports the practical small-size use at (16px); do not add wordmark detail
at that size. A smaller use has not been established. The header wordmark is (30px),
weight (750), tracking (-0.04em), reducing to (27px) on mobile.

`scripts/prepare-brand.mjs` imports the canonical path and generates `public/brand/`,
favicons and social artwork. Regenerate exports from that source instead of redrawing
them. Generated PNGs carry vector-origin provenance.

## Components

### Buttons

Primary interior actions pair cobalt with white, a one-pixel border and a minimum
height of (46px). Secondary actions use the light panel surface with ink text; hover
adds soft cobalt and an accent border. Primary hover/focus darkens with brightness
(0.9). Focus remains visible, with an offset of (5px). Animate the visual treatment
while keeping the clickable target stable.

### Inputs / Fields

Contact fields use white, ink, a muted blue-gray stroke and (8px) corners, with
(11px 13px) internal padding. Placeholders remain legible. The contact action prepares
an email draft; its styling must not imply a message was delivered.

### Navigation

Desktop navigation uses ordinary links with modest gaps. The current page is identified
by an underline offset of (7px), with cobalt decoration. Mobile navigation is a native
disclosure; its summary and language target are (44px) square. Keep keyboard access
and meaningful labels. Navigation requires no client router.

### Chips / Tags

Technology chips are small supporting metadata with cool blue fill, blue-gray border
and dark text. They describe content; they are not filter controls unless real filter
behavior is implemented.

### Cards / Containers

Prefer editorial image/text pairs for featured projects. Project stages use the stage
radius, no border and no shadow. Interior panels provide contained reading or form
areas with a light surface and neutral line. Do not inherit legacy hard shadows into
new project layouts.

### Project evidence

The console displays real public website screenshots with links to their case studies.
Case studies retain verified scope, participation and usage flows in text. Do not
substitute invented product interfaces or sample diagnoses for this evidence.

Progressive cross-document view transitions last (280ms) and connect project imagery
to its case study. Reduced-motion rules remove animations and transitions.

## Do's and Don'ts

### Do:

- **Do** use the shared D geometry and regenerate its exports from the canonical source.
- **Do** preserve cobalt, ink and cool paper around bounded project evidence.
- **Do** keep interactive targets stable and honor reduced-motion preferences.
- **Do** keep Spanish and English, static content and keyboard access synchronized.
- **Do** label sample product flows honestly and keep private data out of examples.

### Don't:

- **Don't** merge the Orbit preview's visual language into the production system.
- **Don't** turn legacy hard offset shadows into a rule for new editorial surfaces.
- **Don't** add decorative eyebrows, side stripes or glyph ornaments as hierarchy.
- **Don't** present sample findings as a real scan or an email draft as delivery.

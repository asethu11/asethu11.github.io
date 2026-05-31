# Design System Adoption — Tickets

Source audit: live site (`css/`, `my-works/*/`, `index.html`) vs. `Abseth Design System/`.
Goal: bring the live site onto the Abseth Design System without visual regressions.

Tickets are ordered by dependency — **P0 unblocks everything else**. Don't start P1 until DS-001 lands.

---

## Overview

| ID | Priority | Title | Effort | Visible change? |
|---|---|---|---|---|
| [DS-001](#ds-001) | P0 | Import design system CSS files into every page | S | No |
| [DS-002](#ds-002) | P0 | Standardize `--text-secondary` to one value (`#737373`) | XS | Tiny |
| [DS-003](#ds-003) | P1 | Replace hardcoded colors with `--gray-*` / role tokens | M | No |
| [DS-004](#ds-004) | P1 | Replace hardcoded font-sizes with `--font-size-*` tokens | M | No |
| [DS-005](#ds-005) | P1 | Replace hardcoded spacing with `--space-*` tokens | M | No |
| [DS-006](#ds-006) | P1 | Replace hardcoded border-radius with `--radius-*` tokens | S | No |
| [DS-007](#ds-007) | P1 | Fix homepage h2/h3 size + weight to match system | XS | Yes |
| [DS-008](#ds-008) | P1 | Replace `7.8rem` section spacing with `--space-3xl` (4rem) | XS | Yes (tighter) |
| [DS-009](#ds-009) | P1 | Move inline `transform`/`transition` from HTML to CSS classes | M | No |
| [DS-010](#ds-010) | P2 | Adopt `.btn-primary` / `.btn-ghost` (15→8px morph) | M | Yes (where CTAs added) |
| [DS-011](#ds-011) | P2 | Refactor `.headerproject` to compose `.fx-tilt` + `.fx-stagger` | M | No |
| [DS-012](#ds-012) | P2 | Rename `.stagger-fade` → `.fx-stagger` | XS | No |
| [DS-013](#ds-013) | P2 | Replace `shimmer` skeleton with system `.sk-*` classes | M | Subtle |
| [DS-014](#ds-014) | P2 | Restyle code blocks to use `--font-mono` + `--surface` (dark-mode aware) | S | Yes |
| [DS-015](#ds-015) | P2 | Adopt `.ds-link` and `.headtag` for navigational links | S | Subtle |
| [DS-016](#ds-016) | P3 | Replace `#eff1f3` with `#F3F5F7` for background-grey | XS | Imperceptible |
| [DS-017](#ds-017) | P3 | Remove `!important` from `.article-h1` in case study CSS | XS | No |
| [DS-018](#ds-018) | P3 | Adopt `.callout` / `.callout-border` for case-study sidebars | M | Subtle |

**Effort key:** XS = <15 min · S = 30–60 min · M = 1–3 hr · L = half-day+

---

## P0 — Foundation

### DS-001
**Import design system CSS files into every page**

Currently, `Abseth Design System/colors_and_type.css`, `components.css`, and `motion.css` aren't linked from any live page. They're sitting in the repo as documentation. Until they're imported, no `var(--token)` reference will resolve and every other ticket is blocked.

- **Files to modify:** `index.html`, `about.html`, `about/index.html`, `building.html`, all 7 case studies under `my-works/*/index.html`
- **What to add (in `<head>`, before existing stylesheets):**
  ```html
  <link rel="stylesheet" href="/Abseth Design System/colors_and_type.css">
  <link rel="stylesheet" href="/Abseth Design System/components.css">
  <link rel="stylesheet" href="/Abseth Design System/motion.css">
  ```
- **Decision needed:** keep folder name with space, or rename to `design-system/`? (URL-encoded spaces in `href` work but are ugly.)
- **Acceptance:** all live pages load the system tokens; DevTools `:root` shows `--primary`, `--space-md`, etc.

### DS-002
**Standardize `--text-secondary` to one value (`#737373`)**

Three different values for the same role exist across the codebase: `#616161`, `#737373`, `#7a7a7a`. The system canonical is `#737373` (`--gray-500`).

- **Files affected:** `css/style.css`, `css/style-about.css`, `my-works/improvingAdoption/improving-adoption.css`, `my-works/ytm/ytm.css`
- **Action:** find/replace all three hex values → `var(--text-secondary)` (after DS-001 lands)
- **Acceptance:** grep for `#616161|#7a7a7a` returns nothing in live CSS

---

## P1 — Token adoption

### DS-003
**Replace hardcoded colors with `--gray-*` / role tokens**

All colors in live CSS are hardcoded hex. Replace with token references so theme switches and future re-skins are one-line.

- **Files:** `css/style.css`, `css/style-about.css`, `css/components/cards.css`, `css/components/thumbnail-effects.css`, all `my-works/*/[name].css`
- **Mapping:**
  - `#FCFCFC` → `var(--background)`
  - `#262628` → `var(--text-primary)`
  - `#0070EA` → `var(--primary)`
  - `#db4f4f` → `var(--red)`
  - `#F3F5F7` / `#eff1f3` → `var(--surface)` (DS-016 covers the value swap)
  - `#CCCCCC` → `var(--border)`
  - `#040404` → `var(--background)` (in dark-mode blocks)
- **Acceptance:** grep for raw hex `#[0-9A-F]{6}` outside the design system folder returns only intentional non-token values (e.g. glare gradient stops)

### DS-004
**Replace hardcoded font-sizes with `--font-size-*` tokens**

Live site uses `0.8rem`, `0.9rem`, `1rem`, `1.1rem`, `1.3rem`, `2rem`, `3rem`, `80px` — values that *happen to* match the system scale.

- **Mapping:**
  - `0.8rem` → `var(--font-size-xs)`
  - `0.9rem` → `var(--font-size-sm)`
  - `0.95rem` → `var(--font-size-base)`
  - `1rem` → `var(--font-size-md)`
  - `1.1rem` → `var(--font-size-lg)`
  - `1.3rem` → `var(--font-size-xl)`
  - `2rem` → `var(--font-size-2xl)`
  - `3rem` → `var(--font-size-3xl)`
  - `80px` → `var(--font-size-hero)`
- **Acceptance:** font-size declarations in live CSS reference tokens

### DS-005
**Replace hardcoded spacing with `--space-*` tokens**

Live site uses scattered rem values. Many already match the 8px scale; standardize via tokens.

- **Mapping:**
  - `0.25rem` (4px) → `var(--space-xs)`
  - `0.5rem` (8px) → `var(--space-sm)`
  - `1rem` (16px) → `var(--space-md)`
  - `1.5rem` (24px) → `var(--space-lg)`
  - `2rem` (32px) → `var(--space-xl)`
  - `3rem` (48px) → `var(--space-2xl)`
  - `4rem` (64px) → `var(--space-3xl)`
- **Off-scale values to investigate case-by-case:** `0.75rem`, `1.25rem`, `7.8rem`, `100px`
- **Acceptance:** spacing declarations reference tokens; off-scale values either justified or replaced

### DS-006
**Replace hardcoded border-radius with `--radius-*` tokens**

- **Mapping:**
  - `4px` → `var(--radius-sm)`
  - `8px` → `var(--radius-md)`
  - `12px` → `var(--radius-lg)`
  - `16px` → `var(--radius-xl)`
  - `99px` / `100px` → keep as-is (pill/circle — out of scale by design)
- **Acceptance:** all radius declarations reference tokens or are pill/circle values

### DS-007
**Fix homepage h2/h3 size + weight to match system**

System spec: `h2` = `1.3rem / 600` (Inter), `h3` = `1.1rem / 600` (Inter).
Current: `h2` at [css/style.css:124](css/style.css#L124) = `1.1rem / 500`; `h3` at [css/style.css:131](css/style.css#L131) = `1rem / 500`.

- **File:** `css/style.css`
- **Change:** update h2/h3 declarations
- **Acceptance:** "Main work", "Other projects", "Side-quests", "Blogs and writings" headings render slightly larger and bolder; project card titles (h3) slightly larger
- **Visual review needed** — this WILL change how the homepage looks

### DS-008
**Replace `7.8rem` section spacing with `--space-3xl` (4rem)**

[css/style.css:202–203](css/style.css#L202) uses `margin-top: 7.8rem; margin-bottom: 7.8rem` on `.introduction`. That's 124.8px — way off any system scale value. System max is 64px (`--space-3xl`).

- **File:** `css/style.css`
- **Decision needed:** drop to 4rem (system) or 6rem (closer to current)? Recommendation: try 4rem first.
- **Acceptance:** intro/section padding feels tighter but not cramped; verify on mobile too

### DS-009
**Move inline `transform`/`transition` styles from HTML to CSS classes**

`index.html` project cards have inline transforms duplicated from `thumbnail-effects.css`:
```html
style="will-change: transform; transform: translateZ(0); transform-style: preserve-3d;
       transition: transform 140ms cubic-bezier(.2,.8,.2,1);"
```

System defines this exact pattern as `--ease-snap` + `--dur-tilt` (140ms) + the `.fx-tilt` class.

- **Files:** `index.html` (7 project cards), case study `index.html` files where the same pattern appears
- **Action:** strip inline style attrs, ensure cards use `.fx-tilt` class (composes with `.headerproject` or replaces it — see DS-011)
- **Acceptance:** no inline `transform`/`transition` on project cards; behavior identical

---

## P2 — Component adoption

### DS-010
**Adopt `.btn-primary` / `.btn-ghost` (15→8px morph interaction)**

The system's signature button has a radius morph on hover (15px → 8px) and color shift (primary → red). Live site has **no `.btn-*` class at all** — CTAs are styled ad-hoc per file.

- **Where to apply first:** "Visit -->" links on project cards, "back to home" footer link, "Check out my resume" CTA on about page
- **File added/modified:** consume `components.css` from design system (already imports via DS-001)
- **Acceptance:** at least 3 CTAs use `.btn-primary` or `.btn-ghost`; hover shows the radius morph

### DS-011
**Refactor `.headerproject` to compose `.fx-tilt` + `.fx-stagger`**

Current: `.headerproject` is a one-off class with its own tilt and stagger logic.
System: split concerns — structural class `.headerproject` (or new `.project-card`) for layout; behavior classes `.fx-tilt` + `.fx-stagger` for motion.

- **Files:** `css/components/cards.css`, `index.html`
- **Acceptance:** project cards in HTML have classes like `class="headerproject fx-tilt fx-stagger"`; tilt + stagger CSS comes from system

### DS-012
**Rename `.stagger-fade` → `.fx-stagger`**

Live site uses `.stagger-fade` ([cards.css:6](css/components/cards.css#L6)) which is functionally identical to system's `.fx-stagger`.

- **Files:** `css/components/cards.css`, `index.html`, possibly `script.js` if referenced
- **Action:** rename class, delete duplicate CSS in `cards.css` (system version takes over)
- **Acceptance:** `cards.css` no longer defines stagger animation; HTML uses `.fx-stagger`

### DS-013
**Replace `shimmer` skeleton with system `.sk-*` classes**

System uses `clip-path` diagonal wipe + `.sk-revealed` resolution. Live site uses `background-position` shimmer, defined only in [my-works/improvingAdoption/improving-adoption.css:92](my-works/improvingAdoption/improving-adoption.css#L92).

- **Files:** `my-works/improvingAdoption/improving-adoption.css`, `my-works/improvingAdoption/index.html`
- **Action:** swap `.skeleton-wrapper` / `.skeleton-image` for `.sk-image`, `.sk-line`, etc.; remove custom `shimmer` keyframe
- **Acceptance:** skeleton loading on improvingAdoption uses system classes; case study loads identically

### DS-014
**Restyle code blocks to use `--font-mono` + `--surface` (dark-mode aware)**

Current: VS Code-style `#1E1E1E` bg + `#D4D4D4` text, same in light and dark mode — looks alien in light mode.
System: `--font-mono`, 0.8rem, bg `--surface`, color `--text-primary`, radius 8px — dark-mode adapts automatically.

- **Files:** `css/style.css` (find code-block rules around line 157), case study CSS files if any define their own
- **Acceptance:** code blocks in light mode have light gray bg + dark text; dark mode unchanged or improved

### DS-015
**Adopt `.ds-link` and `.headtag` for navigational links**

System defines `.ds-link` (primary blue, hover red) and `.headtag` (arrow-reveal link for "back to home", etc.). Live site styles these ad-hoc.

- **Where to apply:** "back to home" footer links across case studies and about, "Visit -->" project links, "Check out my resume" CTA
- **Files:** `index.html`, `about.html`, all `my-works/*/index.html`, `building.html`
- **Acceptance:** navigational links use `.ds-link` or `.headtag`; consistent hover behavior

---

## P3 — Polish

### DS-016
**Replace `#eff1f3` with `#F3F5F7` for background-grey**

[css/style.css](css/style.css) defines `--background-grey: #eff1f3` while the system + other CSS files use `#F3F5F7`. Visually nearly identical (one color-space step), but creates a token inconsistency.

- **File:** `css/style.css`
- **Acceptance:** all `--background-grey` definitions use `#F3F5F7`; or better, the variable is dropped in favor of `var(--surface)`

### DS-017
**Remove `!important` from `.article-h1` in case study CSS**

[my-works/improvingAdoption/improving-adoption.css:249](my-works/improvingAdoption/improving-adoption.css#L249) declares `.article-h1` with `!important`. Likely a Band-Aid for a specificity battle. Once tokens land (DS-004) and styles consolidate, this can come off.

- **Files:** `my-works/improvingAdoption/improving-adoption.css` (and grep for `!important` across all live CSS)
- **Acceptance:** no `!important` outside of system-defined utilities

### DS-018
**Adopt `.callout` / `.callout-border` for case-study sidebars/asides**

Case studies have aside-style "tradeoff" and "decision" callouts styled ad-hoc. System defines `.callout` (filled) and `.callout-border` (outlined).

- **Where:** `my-works/improvingAdoption/index.html` has several `<p><b>...</b></p>` blocks that read like callouts
- **Acceptance:** notable asides use `.callout` or `.callout-border`; case study reads more visually structured

---

## Suggested execution order

1. **DS-001** (foundation — blocks everything)
2. **DS-002** (quick win, removes drift)
3. **DS-006** → **DS-005** → **DS-004** → **DS-003** (token adoption in radius → spacing → font → color order, smallest blast radius first)
4. **DS-007** + **DS-008** (visible homepage tweaks — review together)
5. **DS-009** (clean up inline styles)
6. **DS-016**, **DS-017** (polish during a token pass)
7. **DS-012** (rename for clarity)
8. **DS-014** (code blocks — visible but contained)
9. **DS-013** (skeleton refactor — testable on one case study first)
10. **DS-011** + **DS-015** (component composition)
11. **DS-010** (button morph — needs design pass on which CTAs get it)
12. **DS-018** (callouts — content work)

Total estimated effort: ~2 days of focused work to land P0–P1, another 1–2 days for P2–P3.

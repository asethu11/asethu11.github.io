---
name: abseth-design
description: Use this skill to generate well-branded interfaces and assets for Abseth (Abhishek Sethuraman's portfolio & blog), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and
create static HTML files for the user to view. If working on production code, you can copy
assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or
design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_
production code, depending on the need.

## Quick orientation
- **Foundations:** `colors_and_type.css` (all tokens — colors, type, spacing, radii, motion
  durations + easings), `motion.css` (keyframes + `.fx-*` interaction utilities), `components.css`
  (buttons, links, references, callouts, table, code). Import in that order.
- **Assets:** `assets/logo.png`, `assets/abhishek.jpg`, `assets/projects/*`.
- **UI kits:** `ui_kits/portfolio/` (abseth.com homepage) and `ui_kits/blog/` (article layout) —
  each has its own README and reusable JSX components.
- **Specimens:** `preview/` holds the design-system cards.

## Non-negotiables (the brand in one breath)
- Two fonts only: **Big Shoulders Display** for headlines, **Inter** for everything; mono for code.
- Eight core colors; one blue `#0070EA`, one red `#DB4F4F`; theme-aware (auto light/dark).
- 8px spacing scale; radii 4/8/12/16 (buttons morph 15→8 on hover — the one exception).
- Lowercase, dry, human voice. **No emoji** — arrows (`-->`, `→`, `↑`) instead.
- Arrow links use Option A (slide in from behind, always in DOM — no display:none). `.reference-chip` removed; use `.ref-inline` for citations.
- Flat surfaces (grey-fill "cards", hairline borders, no content shadows). Hand-coded ethos.

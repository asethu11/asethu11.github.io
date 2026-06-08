# White paper landscape — template spec

> **What this is.** The fill-in guide for the landscape white-paper kit. Same model as portrait — a layout catalog of React components — but for the 1920 × 1080 (16:9 PowerPoint default) canvas, with split layouts that let body and sidebar pair up.
>
> **Audience.** AI agents and humans dropping content into the template later.

The kit's [`README.md`](./README.md) and [`LANDSCAPE.md`](./LANDSCAPE.md) are the exhaustive design language. This file is the shorter, fill-focused contract.

---

## 1 · The model

| Concept | Where |
|---|---|
| Page canvas | 1920 × 1080 (16:9, PowerPoint default) |
| Style tokens | `/colors_and_type.css` + `white-paper-landscape-styles.css` |
| Page components | `white-paper-landscape-pages.jsx` — `WPLCover` · `WPLToc` · `WPLChapter` · `WPLBodyStandard` · `WPLBodyBullets` · `WPLBodyNumbered` · `WPLBodyPullquote` · `WPLBodyStats` · `WPLBodyFigure` · `WPLBodyFeaturedStat` · `WPLBodyCallout` · `WPLResources` · `WPLBack` |
| Catalog | `landscape.html` — all layouts inside a `<DesignCanvas>` |

Identical prop signatures to the portrait `WP*` components. The split layouts ("body + sidebar") are what landscape uniquely enables.

---

## 2 · Hard rules — never touch

Identical to the portrait kit, with one addition:

| Rule | Why |
|---|---|
| **Do not change `--PAGE_W` / `--PAGE_H`.** | 1920 × 1080 exactly. |
| **The split layouts have a fixed left/right ratio.** | Don't override flex bases — the proportion is part of the design. |
| **Do not mix portrait and landscape components in one document.** | Pick a format. |

The full restraint list (brand budget, one featured stat per chapter, one chapter divider per chapter, etc.) is identical to portrait — see [`SPEC.md`](./SPEC.md) § 2.

---

## 3 · Component prop spec

Identical signatures to the portrait `WP*` components. See [`SPEC.md`](./SPEC.md) § 3 for full prop tables. The landscape variants (`WPL*`) layer split layouts on top of the same prop set.

**Layout differences worth knowing:**

| Component | Layout |
|---|---|
| `WPLCover` | Title on left half; meta block on right half |
| `WPLToc` | Two-column TOC list |
| `WPLChapter` | Big chapter name LEFT, lead RIGHT |
| `WPLBodyStandard` | Two prose columns |
| `WPLBodyPullquote` | Body LEFT, pull-quote sidebar RIGHT |
| `WPLBodyFigure` | Body LEFT, figure RIGHT |
| `WPLBodyFeaturedStat` | Stat LEFT (3xl, 168 px), framing copy RIGHT |
| `WPLBodyCallout` | Body LEFT, callout sidebar RIGHT |
| `WPLResources` | Two-column reference grid |

---

## 4 · How to compose a landscape white paper

Same sequence as portrait (cover · TOC · per-chapter body · resources · back). The landscape format suits **PowerPoint export** natively — invoke the **"Export as PPTX (editable)"** skill for native slides.

Render each component inside a `<div class="wp-page">` at 1920 × 1080. The kit ships with print rules already in `white-paper-landscape-styles.css`.

---

## 5 · Common mistakes

Same as portrait. Plus:

| Mistake | Fix |
|---|---|
| Mixing `WP*` (portrait) and `WPL*` (landscape) in one document | Pick one. The chrome scales don't match. |
| Two split-sidebar pages back to back | Vary the body — alternate between two-column prose, sidebar-paired, full-width figure. |
| Featured stat on the left + pull quote on the right | Pick one. The page has one editorial accent. |

---

## 6 · Filler agent prompt

> You are producing a Point One Zero **landscape** white paper — 1920 × 1080 (16:9 PowerPoint default), composed from `WPL*` components in `white-paper-landscape-pages.jsx`. Read `SPEC.md` (portrait) and this file. Compose components in sequence with realistic props; do NOT modify the components, CSS, or `WPLHead`/`WPLFoot`.
>
> The recommended page order matches the portrait kit — `WPLCover` · `WPLToc` · per-chapter (`WPLChapter` + body pages) · `WPLResources` · `WPLBack`. Lean on the split layouts (`WPLBodyPullquote`, `WPLBodyFigure`, `WPLBodyFeaturedStat`, `WPLBodyCallout`) — they're the format's distinctive value over portrait.
>
> Brand budget, copy budgets, voice, and casing rules are identical to portrait. See `SPEC.md` § 2 and § 6.
>
> **Export:** invoke "Export as PPTX (editable)" for native PowerPoint, or "Save as PDF" for flat PDF (landscape, 16:9, no margins).

---

*The portrait companion is [`SPEC.md`](./SPEC.md). The kit's exhaustive design contract is [`README.md`](./README.md) + [`LANDSCAPE.md`](./LANDSCAPE.md). The system-wide contract is [`../../AUTHORING.md`](../../AUTHORING.md).*

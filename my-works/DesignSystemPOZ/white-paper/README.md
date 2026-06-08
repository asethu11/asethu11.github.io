# White paper kit — Point One Zero

> **Format:** 1080 × 1440 portrait + 1080 × 1080 landscape · **Pages:** 14 portrait + 12 landscape · **Output:** print-ready PDF (PowerPoint portrait or 8.5 × 11 print)
>
> **Purpose:** Long-form analytical document. Cover, TOC, chapter dividers, body sections (text · two-col · figure · sidebar quote), featured stats, callouts, references. Print-extended type scale.

Exhaustive spec. Read [`AUTHORING.md`](../../AUTHORING.md) first.

---

## Table of contents

1. [Quick reference](#1-quick-reference)
2. [Files & how to load](#2-files--how-to-load)
3. [Page geometry](#3-page-geometry)
4. [Universal chrome](#4-universal-chrome)
5. [Print-extended type scale (kit-only)](#5-print-extended-type-scale-kit-only)
6. [Color tokens used](#6-color-tokens-used)
7. [Numeric vocabulary](#7-numeric-vocabulary)
8. [Page templates — portrait](#8-page-templates--portrait)
9. [Page templates — landscape](#9-page-templates--landscape)
10. [Brand restraint](#10-brand-restraint)
11. [Copywriting budgets](#11-copywriting-budgets)
12. [Common mistakes](#12-common-mistakes)
13. [Full agent prompt](#13-full-agent-prompt)

---

## 1 · Quick reference

| Property | Portrait | Landscape |
|---|---|---|
| Page size | 1080 × 1440 | 1080 × 1080 |
| Margins | 96 (top/bot) × 96 (left/right) | 96 × 96 |
| Wordmark | top-left + brand-dot in mark | same |
| Print mapping | PowerPoint portrait, 8.5 × 11 letter | PowerPoint landscape |
| Type scale extension | uses `--font-display-2xl/3xl` | uses `--font-display-2xl/4xl` |

---

## 2 · Files & how to load

```
ui_kits/white-paper/
├── README.md                                 (this file)
├── LANDSCAPE.md                              (landscape-specific addenda)
├── index.html                                (portrait demo on canvas)
├── landscape.html                            (landscape demo on canvas)
├── white-paper-styles.css                    (portrait page primitives)
├── white-paper-landscape-styles.css          (landscape page primitives)
├── white-paper-pages.jsx                     (portrait React components)
├── white-paper-landscape-pages.jsx           (landscape React components)
└── design-canvas.jsx                         (canvas wrapper)
```

Portrait:
```html
<link rel="stylesheet" href="../../colors_and_type.css" />
<link rel="stylesheet" href="white-paper-styles.css" />
<script type="text/babel" src="design-canvas.jsx"></script>
<script type="text/babel" src="white-paper-pages.jsx"></script>
```

Landscape swaps the two file pairs.

---

## 3 · Page geometry

```
┌──────────────────────────────────────┐  ← 1080 × 1440 portrait
│  .wp-head  (eyebrow + wordmark)     │  ← top 96
│ ──────────────────────────────────  │
│                                      │
│  .wp-body                            │
│                                      │
│                                      │
│  .wp-foot (mono + page#)             │  ← bottom 96
└──────────────────────────────────────┘
```

Class prefix: portrait `.wp-*`, landscape `.wpl-*`. Both follow the same chrome pattern.

---

## 4 · Universal chrome

### Page head (portrait `.wp-head`, landscape `.wpl-head`)

```html
<div class="wp-head">
  <span class="wp-mark"><span class="brand-dot"></span>point one zero</span>
  <span class="wp-meta">Section 02 · The economics</span>
</div>
```

| Element | Spec |
|---|---|
| `.wp-head` / `.wpl-head` | padding-bottom 14, `border-bottom: --border-subtle`, eyebrow recipe, +0.4 track, uppercase |
| `.wp-mark` | `font-family: var(--font-sans); font-weight: var(--weight-medium); text-transform: none` |
| `.wp-mark .brand-dot` | size 6, brand-glow |
| `.wp-meta` | mono 11 px, `--foreground-subtle` |

### Page foot

```html
<div class="wp-foot">
  <span class="wp-foot-title">White paper · v0.1</span>
  <span class="wp-foot-pg">02 / 14</span>
</div>
```

| Element | Spec |
|---|---|
| `.wp-foot` | padding-top 32, `border-top: --border-subtle`, flex space-between |
| `.wp-foot-title` | font-sans 12 px, `--foreground-subtle` |
| `.wp-foot-pg` | mono 11 px, tabular-nums, `--foreground-subtle` |

---

## 5 · Print-extended type scale (kit-only)

The white-paper kit is the ONE place these tokens are used. Web surfaces never reach for them.

| Token | Size/Line | Weight | Track | Where |
|---|---|---|---|---|
| `--font-display-2xl` | 96 / 100 | 600 | `--track-display-2xl` (-3.6) | Portrait cover, landscape cover |
| `--font-display-3xl` | 120 / 116 | 600 | `--track-display-3xl` (-4.4) | Portrait chapter title, landscape body opener |
| `--font-display-4xl` | 168 / 156 | 600 | `--track-display-4xl` (-6.4) | Landscape featured stat (rarely cover) |

### Body type

| Class | Token | Size |
|---|---|---|
| `.wp-cover-title` | `font: var(--font-display-2xl); line-height: 0.98` | 96 px |
| `.wp-cover-sub` | `font: var(--font-subhead)` | 20 / 28 |
| `.wp-chapter-title` | `font: var(--font-display-3xl); line-height: 0.96` | 120 px |
| `.wp-chapter-num` | font-mono 14 px, track 0.4 px, `--brand` | mono brand chapter |
| `.wp-body .wp-eyebrow` | eyebrow recipe, `--foreground-subtle` | 13 px |
| Body opener H2 | `var(--font-display-md)` | 40 / 46 |
| Body paragraph | `var(--font-body-lg)` | 18 / 27 |
| `.wp-sidebar-quote` | (cite is mono 12 px) | quote 28–32 px sans 510 |
| `.wp-callout` | `--font-body-lg`, hairline border + brand-rail | 18 / 27 |
| `.wp-figure figcaption` | mono 11 px | mono |
| `.wp-ref .n` | font-mono 13 px, `--brand` | mono brand |
| `.wp-ref .body` | `var(--font-body-sm)` | 14 / 21 |

---

## 6 · Color tokens used

| Token | Used by |
|---|---|
| `--canvas` | Every page bg |
| `--surface-1` | `.wp-callout`, `.wp-sidebar-quote`, `.wp-figure` placeholder stripes |
| `--surface-2` | striped placeholder fills inside `.wp-figure` (12 px stripe), table thead bg |
| `--border-subtle` → `--border-default` | Hairlines, callout border on hover |
| `--foreground` | H2, chapter title, callout body |
| `--foreground-muted` | Body paragraphs |
| `--foreground-subtle` | Eyebrows, meta, captions |
| `--brand` | Cover wordmark dot · cover `.brand-word` · chapter mono number · featured-stat number · sidebar-quote opening glyph · reference mono numerals |
| `--gradient-hero-veil` | Cover + chapter dividers (max ~5 instances per portrait, ~3 per landscape) |
| `--gradient-card-featured` | `.wp-featured-stat::before` (neutral wash) |

---

## 7 · Numeric vocabulary

| Pattern | Class | Font | Size | Color |
|---|---|---|---|---|
| Featured stat (portrait) | `.wp-featured-stat .n` | sans 600 tabular-nums | 112 px (or `.stat-num-xl` 96 px) | `--brand` |
| Featured stat (landscape) | `.wpl-featured-stat .n` | sans 600 tabular-nums | `font: var(--font-display-4xl)` 168 px | `--brand` |
| Stat row stats (smaller) | `.stat-num` or `.stat-num-lg` | canonical | 48 or 68 px | `--foreground` |
| Page number | mono 11 px tabular-nums | mono | 11 | `--foreground-subtle` |
| Chapter mono number | mono brand | mono | 14 px | `--brand` |
| Footnote ref / ref number | mono brand | mono | 13 px | `--brand` |
| Reference URL | mono | mono | 12 px | `--foreground-muted` |
| Body-prose numerics | inherit | sans | inherits | inherits |

---

## 8 · Page templates — portrait

Twelve page templates listed in the file. Each is a `<WPPage*>` React component emitting an article-shaped `<DCArtboard width={1080} height={1440}>`.

### Cover (`<WPCover>`)

| Slot | Spec |
|---|---|
| Cover-top | brand-dot in mark + mono meta line ("Q1 2026 · v0.1") |
| Eyebrow | uppercase, `--foreground-subtle` |
| Title | `font: var(--font-display-2xl); line-height: 0.98; letter-spacing: var(--track-display-2xl)` |
| `.brand-word` in title | ONE |
| Subhead | `--font-subhead`, `--foreground-muted` |
| Cover-bottom KV | 3-up: Prepared for · Prepared by · Date — `dt` eyebrow, `dd` body-sm, `dd.mono` 13 px |

### TOC (`<WPToc>`)

Mirrors the report-document TOC pattern. `.wp-toc-item` grid `[mono num] [title] [mono pg#]`.

### Chapter divider (`<WPChapter>`)

| Slot | Spec |
|---|---|
| Hero veil | `--gradient-hero-veil` background |
| `.wp-chapter-top .wp-mark` | wordmark + brand-dot |
| `.wp-chapter-top .pg` | mono 12 px right |
| `.wp-chapter-num` | mono 14 px brand, letter-spacing 0.4 |
| `.wp-chapter-title` | `font: var(--font-display-3xl)` 120 px |
| Hero-veil stripe | optional repeating stripe placeholder (12-px 45° pattern) |

### Body — single column (`<WPBody>`)

Eyebrow + display-md H2 + body paragraphs at `--font-body-lg`. Optional figure or sidebar quote at the right side.

### Body — two column (`<WPBodyTwoCol>`)

Two columns side-by-side at 1fr 1fr. Each column gets the same eyebrow + H3 + paragraph treatment.

### Featured stat (`<WPFeaturedStat>`)

```html
<section class="wp-featured-stat">
  <div class="eyebrow">By the numbers</div>
  <div class="n">47<small>%</small></div>
  <div class="l">Reduction in run-rate spend at month six.</div>
</section>
```

| Element | Spec |
|---|---|
| Container | `--surface-1`, `--border-default`, radius-lg, padding 56, `::before` is `--gradient-card-featured` |
| `.eyebrow` | eyebrow recipe |
| `.n` | 112 px sans 600 tabular-nums, `--brand` |
| `.l` | `--font-subhead`, `--foreground-muted` |

### Stat row (`<WPStatRow>`)

3-up or 4-up `.stat-num-lg` row. ONE may be `.brand`.

### Callout (`<WPBodyCallout>`)

`.wp-callout` with eyebrow label (UPPER, `--foreground-subtle`) + body at `--font-body-lg`. Brand-rail border-left optional.

### Sidebar quote (`<WPSidebarQuote>`)

Pull quote with brand-blue opening glyph + mono `cite` line. One per chapter.

### Figure (`<WPBodyFigure>`)

Striped placeholder frame (45°, 12-px) + `figcaption` with mono caption + `data-label` attr for the dropped chart description.

### References (`<WPReferences>`)

`.wp-refs-grid` 2-col list of `.wp-ref` items, each with mono `.n` brand + `.body` containing source line + mono `.src`/`.url`.

### Back cover (`<WPBack>`)

Closing CTA with `.brand-word` + contact KV.

---

## 9 · Page templates — landscape

Eleven landscape templates mirror the portrait ones with wider, shorter layouts. See `LANDSCAPE.md` for the addenda; this README's chrome and type rules apply unchanged.

Key landscape differences:
- Cover uses 96 px (`--font-display-2xl`) NOT 168 px
- Featured stat uses `--font-display-4xl` (168 px)
- Chapter dividers use 140 px (between 3xl and 4xl)

---

## 10 · Brand restraint

| # | Where | Count per document |
|---|---|---|
| 1 | Cover `.brand-dot` (wordmark + chrome wordmark) | **1 in cover, 1 per interior page (in `.wp-head .wp-mark`)** — chrome dot is allowed |
| 2 | Cover `.brand-word` | **1** |
| — | Back-cover `.brand-word` | **1** (the second of 2 max) |
| — | Chapter mono number per chapter | **1 per chapter** |
| 5 | Featured stat number per chapter | **1** |
| 7 | Reference mono numerals | brand mono (editorial markers) |
| 8 | Pull quote opening glyph | brand (one per chapter max) |

The white-paper is the only kit where the head wordmark dot repeats on every page — it's a print-document convention.

---

## 11 · Copywriting budgets

| Slot | Limit |
|---|---|
| Cover title | 4–8 words, ONE brand-word |
| Cover subhead | ≤ 30 words |
| Chapter title | 4–6 words |
| Body H2 (opener) | ≤ 8 words |
| Body paragraph | 2–4 sentences |
| Callout | 1–3 sentences, no bullet lists |
| Pull quote | ≤ 30 words |
| Cite line | mono UPPER, ≤ 14 words |
| Featured stat label | ≤ 14 words |
| Figure caption | mono UPPER, ≤ 12 words |
| Reference body | Author · Year · Title · Pub · URL — middle dots, mono URL |

---

## 12 · Common mistakes (and the fixes)

| Mistake | Fix |
|---|---|
| Inlining `font-size: 96px` for cover title | `font: var(--font-display-2xl)` — v0.6.1 print scale |
| Inlining `font-size: 168px` for landscape stat | `font: var(--font-display-4xl)` |
| Inlining `font-size: 120px` for chapter title | `font: var(--font-display-3xl)` |
| Two featured stats per chapter | One per chapter |
| Brand color on body H2 | Foreground only |
| Mono used for body prose | Mono is for data, never prose |
| Loading a duplicate `colors_and_type.css` from the kit | Deleted in v0.6.1 — always load root file |
| `.wp-head .wp-mark` without `.brand-dot` | Print-document convention — every interior page carries the mark |
| Forgetting to swap `<WPPage*>` for `<WPLPage*>` in the landscape kit | Match the component prefix to the file prefix |
| Editing landscape styles in `white-paper-styles.css` | Landscape has its own `white-paper-landscape-styles.css` — use the right file |

---

## 13 · Full agent prompt

> You are producing a Point One Zero **white paper** — long-form analytical document. Two formats: portrait (1080 × 1440, PowerPoint-portrait / 8.5 × 11 print) and landscape (1080 × 1080). Pick the format up front.
>
> **Load:** `../../colors_and_type.css` AND either `white-paper-styles.css` (portrait) or `white-paper-landscape-styles.css` (landscape). Components prefix `WP*` for portrait, `WPL*` for landscape. Canvas wrapper is `design-canvas.jsx`.
>
> **Type:** use the print-extended scale — `--font-display-2xl` (96 px) for cover, `--font-display-3xl` (120 px) for portrait chapter titles, `--font-display-4xl` (168 px) for landscape featured stat. Body at `--font-body-lg` (18 / 27). Eyebrows at `var(--font-eyebrow)` (13 px, +0.4 track). Headlines stay weight 600; body weight 400; eyebrows weight 510.
>
> **Color:** canvas white. Default cards `--surface-1`. Chapter dividers have `--gradient-hero-veil`. Featured stat lifts to `--surface-1` with `::before` neutral `--gradient-card-featured` wash. ONE `.brand-dot` on cover wordmark + on EVERY interior page's `.wp-head .wp-mark` (print convention). ONE `.brand-word` on cover. ONE chapter brand-mono number per chapter divider. ONE featured stat per chapter with brand-tinted number. ONE pull quote per chapter (brand opening glyph). Reference mono numerals brand (editorial markers).
>
> **Numerics:** featured stat is sans 600 tabular-nums (portrait `.stat-num-xl` 96 / landscape `--font-display-4xl` 168). Smaller stats use `.stat-num` or `.stat-num-lg`. Page numbers mono tabular-nums 11 px. Chapter / reference numerals mono brand. Citations mono. Body-prose numerics inherit (no class).
>
> **Page chrome:** every interior page carries `.wp-head` (wordmark with brand-dot + meta line) and `.wp-foot` (title + page indicator NN / NN). Cover and back cover use custom layouts.
>
> **Copy:** chapter title 4–6 words; body paragraphs 2–4 sentences; quote ≤ 30 words; callout 1–3 sentences NO bullet lists; figure caption mono UPPER ≤ 12 words. Sentence case bodies. Mono for data (page nums, IDs, citations, dates, URLs).
>
> See `LANDSCAPE.md` for landscape-specific addenda.

---

*The kit ships portrait + landscape side-by-side. Don't conflate them — each has its own styles, components, and templates. See [`AUTHORING.md`](../../AUTHORING.md) for the system-wide contract.*

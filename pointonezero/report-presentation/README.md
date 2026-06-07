# Report presentation kit — Point One Zero

> **Format:** 1920 × 1080 (16:9) · **Slides:** 12 templates · **Output:** keynote-style deck (browser → Save as PDF or share live)
>
> **Purpose:** Stakeholder report DECK — denser type, more tables, more numbered findings than the pitch deck. Cover, agenda, section opener, context, what shipped (table), findings (4-up), figure, before/after, recommendations, risks, references, thank-you. Reuses `../pitch-deck/deck-stage.js`.

Exhaustive spec — every slide, every token, every copy budget. Read [`AUTHORING.md`](../../AUTHORING.md) first; this appends the kit-specific layer.

---

## Table of contents

1. [Quick reference](#1-quick-reference)
2. [Files & how to load](#2-files--how-to-load)
3. [Slide geometry](#3-slide-geometry)
4. [Universal chrome](#4-universal-chrome) — top rail, foot rail, veil
5. [Type system used in this kit](#5-type-system-used-in-this-kit)
6. [Color tokens used in this kit](#6-color-tokens-used-in-this-kit)
7. [Numeric vocabulary](#7-numeric-vocabulary)
8. [Slide-by-slide spec](#8-slide-by-slide-spec)
9. [Brand restraint](#9-brand-restraint)
10. [Copywriting budgets](#10-copywriting-budgets)
11. [Common mistakes](#11-common-mistakes)
12. [Full agent prompt](#12-full-agent-prompt)
13. [Report deck vs pitch deck](#13-report-deck-vs-pitch-deck)

---

## 1 · Quick reference

| Token | Value | Use |
|---|---|---|
| `--slide-w` | `1920px` | deck-stage custom prop |
| `--slide-h` | `1080px` | deck-stage custom prop |
| `--slide-bg` | `var(--canvas)` | every slide background is light |
| Body bg | `var(--color-primary)` | dark stage between scaled slides |
| Slide padding | `100px 140px` | `.slide-pad` |
| Top rail position | `top: 56px; left/right: 140px` | `.slide-top` |
| Foot rail position | `bottom: 48px; left/right: 140px` | `.slide-foot` |

The deck-stage component handles letterbox scaling; slides render at exactly 1920 × 1080.

---

## 2 · Files & how to load

```
ui_kits/report-presentation/
├── README.md   (this file)
└── index.html  (the twelve slides)
```

`index.html` head:

```html
<link rel="stylesheet" href="../../colors_and_type.css" />
<script src="../pitch-deck/deck-stage.js"></script>
```

**Single source of truth:** `deck-stage.js` lives in `../pitch-deck/`. Do not duplicate it into this folder.

Body:

```html
<deck-stage>
  <section class="s-cover" data-screen-label="01 Cover">…</section>
  <section data-screen-label="02 Agenda">…</section>
  …
</deck-stage>
```

Every `<section>` MUST have `data-screen-label="NN <Name>"` so user comments anchor correctly.

---

## 3 · Slide geometry

```
┌──────────────────────────────────────┐  ← slide (1920 × 1080)
│  .slide-top  (wm left + ref right)   │  ← absolute top: 56, padding 0 140
│                                      │
│       .slide-pad                     │  ← padding 100 140
│       (content here)                 │
│                                      │
│  .slide-foot (left + pg# right)      │  ← absolute bottom: 48, left/right 140
└──────────────────────────────────────┘
```

Variant slide classes:

| Class | Used on |
|---|---|
| (none) | most interior slides — standard chrome + body |
| `.s-cover` | slide 01 — large title block, hero veil, no top rail content (or use it for branding) |
| `.s-section-opener` | slide 03 — chapter divider, centered body, hero veil |
| `.thanks` | slide 12 — closing |

---

## 4 · Universal chrome

### 4.1 · Top rail (`.slide-top`)

```html
<div class="slide-top">
  <span class="wm"><span class="dot">●</span>point one zero</span>
  <span class="ref">Section 02 · Engagement context</span>
</div>
```

| Element | Spec |
|---|---|
| Container | `position: absolute; top: 0; left: 0; right: 0; padding: 56px 140px 0; z-index: 2; display: flex; justify-content: space-between` |
| Font (default text) | `var(--font-mono-md)`, `var(--foreground-subtle)` |
| Wordmark `.wm` | `font-family: var(--font-sans); font-size: 22px; font-weight: var(--weight-medium); color: var(--foreground); letter-spacing: -0.2px; display: inline-flex; gap: 10px` |
| Wordmark dot | `color: var(--brand)` |
| Reference `.ref` | `font-family: var(--font-mono); font-size: 18px; letter-spacing: 0.05em; text-transform: uppercase` |

### 4.2 · Foot rail (`.slide-foot`)

```html
<div class="slide-foot">
  <span>Point One Zero · Confidential</span>
  <span class="pg">02 / 12</span>
</div>
```

| Element | Spec |
|---|---|
| Container | `position: absolute; bottom: 48px; left/right: 140px; display: flex; justify-content: space-between; font: var(--font-mono-md); font-size: 16px; color: var(--foreground-subtle); z-index: 2` |
| Page `.pg` | `font-variant-numeric: tabular-nums` |

### 4.3 · Veil (`.slide-veil`)

Used on cover, section opener, thank-you. Three instances max across the deck.

```html
<div class="slide-veil"></div>
```

`position: absolute; inset: 0; background: var(--gradient-hero-veil); pointer-events: none`

---

## 5 · Type system used in this kit

Slide pixels render at 1920 wide on screen; the deck-stage scales to fit viewport. **All tracking is given in px or em.**

### Display ladder (kit-specific scale)

| Class | Size/Line | Weight | Track | Where |
|---|---|---|---|---|
| `.title-xl` | 132 / 130 | 600 | -5.4 px | Cover + thank-you only |
| `.title-lg` | 96 / 96 | 600 | -3.6 px | Reserved (not currently used on any slide) |
| `.title-md` | 64 / 67 | 600 | -2.0 px | Every interior slide H2 |
| `.s-section-opener .chap-title` | 132 / 132 | 600 | -5 px | Chapter dividers only |

### Body ladder

| Class | Size/Line | Where |
|---|---|---|
| `.lead-lg` | 32 / 43 | Cover + section opener lead |
| `.body-lg` | 26 / 38 | (reserved, used inside `.ctx-grid p`) |
| `.ctx-grid p` | 24 / 36 | Context slide body |
| `.compare-grid p` | 24 / 36 | Before/after body |
| `.find-cell .desc` | 20 / 28 | Finding descriptor |
| `.rec-card p` | 19 / 28.5 | Recommendation body |
| `.deck-table td` | 24 / 31 | Table cell |
| `.refs-grid .body` | 22 / 32 | Reference title line |
| `.refs-grid .src` | 16 / 21 mono | Reference URL |
| `.risk-row .text` | 26 / 36 | Risk row primary |
| `.risk-row small` | 19 / 26 | Risk row mitigation |

### Eyebrows

| Class | Spec |
|---|---|
| `.eyebrow-lg` | `font-size: 22px; letter-spacing: 0.031em; text-transform: uppercase; font-weight: 510; color: var(--foreground-subtle); display: inline-flex; gap: 14px` |
| `.s-section-opener .chap-num` | `font-family: var(--font-mono); font-size: 30px; color: var(--brand); letter-spacing: 1px; text-transform: uppercase` |
| `.deck-table thead th` | `font-size: 18px; letter-spacing: 0.031em; text-transform: uppercase; font-weight: var(--weight-medium); color: var(--foreground-subtle)` |
| `.find-cell .label` / `.risk-row .label` / `.cover-meta .l` | All same eyebrow recipe: size 18 px, track 0.031em, uppercase, subtle |

**Hard rule:** All eyebrows use `letter-spacing: 0.031em` (≈ +3% of size). **Not 0.08em.** This was the v0.6.2 fix from pitch deck — same rule applies here.

---

## 6 · Color tokens used in this kit

### Surfaces

| Token | Used by |
|---|---|
| `--canvas` | Every slide background via `--slide-bg` |
| `--color-primary` | Body bg (dark stage around scaled slides) |
| `--surface-1` | `.find-cell`, `.rec-card`, `.deck-table-wrap`, `.deck-figure`, `.deck-table thead bg` (which is surface-2) |
| `--surface-2` | `.find-cell.featured` only, `.deck-table thead th`, `.risk-row .pill` default bg, `.rec-card .pill` |

### Brand

| Token | Used where |
|---|---|
| `--brand` | Cover wordmark dot (×1) · Cover title `.brand-word` (×1) · Section opener `.chap-num` (×1) + `.chap-title .brand-word` (×1) · Thank-you `.title-xl .brand-word` (×1) · `.find-cell.featured .n` (×1) · `.deck-table` page-3+ chapter mono / agenda numerals (`.n` in `.agenda-item`, `.rec-card .n`, `.refs-grid .n`) — editorial ordinal markers |
| `--gradient-card-featured` | `.find-cell.featured::before` (neutral wash, not brand) |
| `--gradient-hero-veil` | `.s-cover .slide-veil`, `.s-section-opener .slide-veil`, `.thanks .slide-veil` |

### Status

| Token | Used by |
|---|---|
| `--warning` / `--warning-soft` / `--warning-mid` | `.risk-row .pill.warn` (Medium severity) |
| `--danger` / `--danger-soft` / `--danger-mid` | `.risk-row .pill.dang` (High severity) |
| (default `--surface-2`) | `.risk-row .pill` (Low severity) |

**No `--brand` on risk pills.** Risk severity is *status*, not *attention*.

---

## 7 · Numeric vocabulary

| Pattern | Class | Font | Size | Color | Tabular |
|---|---|---|---|---|---|
| Big finding stat | `.find-cell .n` | Inter sans, weight 600 | 132 px, track -5 px | `--foreground`, `.featured .n` → `--brand` | yes |
| Finding unit suffix | `.find-cell .n small` | Inter | 40 px, track -1.4 px | `--foreground-subtle` | inherits |
| Slide page indicator | `.slide-foot .pg` | mono | 16 px | `--foreground-subtle` | yes |
| Chapter / section number | `.chap-num` | mono | 30 px | `--brand` | n/a |
| Agenda / recommendation / reference numerals | `.n` mono | mono | 22–24 px | `--brand` | yes |
| Table cell numerics | `.deck-table td.num` | Inter sans | 24 px | `--foreground` | yes (right-aligned) |
| Mono meta (report ID, dates, URLs) | `.mono` | mono | 16–20 px | `--foreground-subtle` | yes |

---

## 8 · Slide-by-slide spec

### 8.1 · Slide 01 — Cover (`.s-cover`)

```html
<section class="s-cover" data-screen-label="01 Cover">
  <div class="slide-veil"></div>
  <div class="slide-top">…wordmark + report-ID ref…</div>
  <div class="slide-pad">
    <div class="stack">
      <span class="eyebrow-lg"><span class="brand-dot"></span>Engagement report · Northwind Capital</span>
      <h1 class="title-xl">From idea to production in <span class="brand-word">17 hours</span>.</h1>
      <p class="lead-lg">…</p>
      <div class="cover-meta">…4-up labels: Prepared for / by / Date / Version…</div>
    </div>
  </div>
</section>
```

| Slot | Tokens | Copy budget |
|---|---|---|
| Eyebrow with dot | `.eyebrow-lg` + nested `.brand-dot` (9×9, brand-glow) | ≤ 8 words |
| Title | `.title-xl` 132 px, ONE `.brand-word` | 6–10 words |
| Lead | `.lead-lg` 32 / 43, `--foreground-muted` | ≤ 30 words |
| Meta grid | 4 cols, gap 36, border-top --border-subtle, `.l` (18 px eyebrow) + `.v` (22 px sans, or `.v.mono` 20 px) | label ≤ 2 words, value ≤ 4 words |
| `.stack` | `flex: 1; justify-content: flex-end; padding-bottom: 60px` | — |

### 8.2 · Slide 02 — Agenda

```html
<span class="eyebrow-lg">Contents</span>
<h2 class="title-lg">What we'll cover.</h2>
<div class="agenda-list">
  <div class="agenda-item">
    <span class="n">01</span>
    <span class="t">Section title<small>One-sentence subtitle.</small></span>
  </div>
  …
</div>
```

| Element | Spec |
|---|---|
| `.agenda-list` | `grid-template-columns: 1fr 1fr; column-gap: 80px; row-gap: 32px; max-width: 1640px; margin-top: 56px` |
| `.agenda-item` | `grid-template-columns: 100px 1fr; gap: 24px; padding: 20px 0; border-top: --border-subtle` (first 2: no border) |
| `.agenda-item .n` | mono 24 px brand, tabular-nums |
| `.agenda-item .t` | 34 px sans, weight 510, `letter-spacing: -0.6px`, `--foreground` |
| `.agenda-item .t small` | block, 20 px, `--foreground-subtle`, weight 400, margin-top 8 |

**Copy:** 6 items max. Title ≤ 4 words. Subtitle ≤ 8 words.

### 8.3 · Slide 03 — Section opener (`.s-section-opener`)

```html
<section class="s-section-opener" data-screen-label="03 Section 01">
  <div class="slide-veil"></div>
  <div class="slide-pad pad">     <!-- pad sets justify-content: center -->
    <span class="chap-num">Section 01</span>
    <h2 class="chap-title">Executive <span class="brand-word">summary</span>.</h2>
    <p class="chap-lead">…</p>
  </div>
  <div class="slide-foot">…</div>
</section>
```

| Slot | Tokens | Copy |
|---|---|---|
| `.chap-num` | mono 30 px brand | "Section NN" |
| `.chap-title` | 132 px, weight 600, track -5 px, balanced, max 1480 px | 2–5 words, ONE `.brand-word` |
| `.chap-lead` | 32 / 43, `--foreground-muted`, max 1200 px | ≤ 30 words |

### 8.4 · Slide 04 — Context (two-column body)

```html
<span class="eyebrow-lg">02 · Engagement context</span>
<h2 class="title-md">What Northwind asked for, what we agreed to build.</h2>
<div class="ctx-grid">
  <div class="col">
    <span class="eyebrow">The brief</span>
    <h4>Replace the 14-year-old portal.</h4>
    <p>…</p>
  </div>
  <div class="col">
    <span class="eyebrow">Our scope</span>
    <h4>One Build pod · six weeks.</h4>
    <p>…</p>
  </div>
</div>
```

| Element | Spec |
|---|---|
| `.ctx-grid` | 2 cols, gap 80, max 1640, margin-top 56 |
| `.col .eyebrow` | 18 px, track 0.031em, uppercase, `--foreground-subtle`, margin-bottom 16 |
| `.col h4` | 36 px, weight 510, `letter-spacing: -0.8px`, `--foreground` |
| `.col p` | 24 / 36, `--foreground-muted`, margin-top 18, max 720 |

### 8.5 · Slide 05 — Shipped (data table)

```html
<span class="eyebrow-lg">03 · Deliverables</span>
<h2 class="title-md">Three things shipped, all in production.</h2>
<div class="deck-table-wrap">
  <table class="deck-table">
    <thead><tr><th>Artifact</th><th>Scope</th><th class="num">In production</th><th>Owner post-handoff</th></tr></thead>
    <tbody>
      <tr><td class="strong">Investor portal v2</td><td>240 accounts · 8 surfaces</td><td class="num">Month 2</td><td>Northwind platform</td></tr>
      …
    </tbody>
  </table>
</div>
```

| Element | Spec |
|---|---|
| `.deck-table-wrap` | `--surface-1`, `--border-subtle`, radius-lg, `--edge-highlight`, max 1640, margin-top 48 |
| `thead th` | padding 22/28, eyebrow recipe at 18 px, `--surface-2` bg, hairline bottom |
| `tbody td` | padding 24/28, 24 px sans, `--foreground-muted`, hairline bottom (last row: none) |
| `.num` | right-aligned, tabular-nums |
| `.strong` | `--foreground`, weight-medium |

**Copy:** 4–5 rows max for one-slide fit. Column headers ≤ 3 words.

### 8.6 · Slide 06 — Findings (4-up stat grid)

```html
<div class="findings-4">
  <div class="find-cell">
    <div class="n">17<small>hrs</small></div>
    <div class="meta">
      <div class="label">Time to prototype</div>
      <div class="desc">Kickoff to runnable staging.</div>
    </div>
  </div>
  <div class="find-cell">…</div>
  <div class="find-cell featured">…</div>   <!-- ONE featured -->
  <div class="find-cell">…</div>
</div>
```

| Element | Spec |
|---|---|
| `.findings-4` | 4 cols 1fr, gap 20, max 1640, margin-top 64 |
| `.find-cell` | `--surface-1`, `--border-subtle`, radius-lg, padding 36/32, `--edge-highlight`, flex column |
| `.find-cell.featured` | `--surface-2`, `--border-default`, ::before is `--gradient-card-featured` |
| `.n` | 132 px sans 600, track -5 px, tabular-nums; `.featured .n` → `--brand` |
| `.n small` | 40 px, `--foreground-subtle`, track -1.4 px |
| `.meta` | `margin-top: auto; padding-top: 48px` (pushes label to bottom) |
| `.label` | 18 px eyebrow, track 0.031em, `--foreground-subtle` |
| `.desc` | 20 / 28, `--foreground-muted`, margin-top 14 |

**Brand budget:** Exactly ONE `.featured` cell across the deck. Never two.

### 8.7 · Slide 07 — Figure / chart

```html
<span class="eyebrow-lg">04.1 · Run-rate spend</span>
<h2 class="title-md">Spend drops sharply at month three; flattens by month six.</h2>
<figure class="deck-figure">
  <div class="frame">DROP YOUR CHART HERE — Description</div>
  <figcaption>
    <span>Fig. 01 · Title. Source: Origin.</span>
    <span class="mono">N = 12 mo · 2025-09 → 2026-03</span>
  </figcaption>
</figure>
```

| Element | Spec |
|---|---|
| `.deck-figure` | `--surface-1`, hairline border, radius-lg, max 1640, margin-top 56 |
| `.frame` | height 540, 45°-stripe repeating-linear-gradient surface-1/surface-2 (16/16 px), centered mono 20 px label |
| `figcaption` | padding 22/28, hairline top, 20 px, `--foreground-subtle`, flex space-between |
| `figcaption .mono` | 18 px mono |

### 8.8 · Slide 08 — Before/after compare

```html
<div class="compare-grid">
  <div class="col">
    <span class="eyebrow">Before</span>
    <h4>12 people-hours per quarter.</h4>
    <p>…</p>
  </div>
  <div class="divider"></div>
  <div class="col">
    <span class="eyebrow">After</span>
    <h4>Under thirty minutes.</h4>
    <p>…</p>
  </div>
</div>
```

| Element | Spec |
|---|---|
| `.compare-grid` | `grid-template-columns: 1fr 1px 1fr; gap: 80px; max 1640, margin-top 56` |
| `.divider` | `background: var(--border-subtle)` (vertical hairline) |
| `.col .eyebrow` | 22 px eyebrow, track 0.031em, `--foreground-subtle` |
| `.col h4` | 56 px sans 600, track -1.6 px, `--foreground`, margin-top 22 |
| `.col p` | 24 / 36, `--foreground-muted`, margin-top 24, max 720 |

### 8.9 · Slide 09 — Recommendations (3-up cards)

```html
<div class="recs-grid">
  <div class="rec-card">
    <span class="n">01</span>
    <h4>Recommendation title.</h4>
    <p>Body.</p>
    <span class="pill">Owner · Name · Time-frame</span>
  </div>
  …
</div>
```

| Element | Spec |
|---|---|
| `.recs-grid` | 3 cols, gap 24, max 1640, margin-top 56 |
| `.rec-card` | `--surface-1`, hairline, radius-lg, padding 32 32 28, `--edge-highlight`, flex column |
| `.n` | mono 22 px brand, tabular-nums, margin-bottom 18 |
| `h4` | 30 / 35, weight 510, track -0.6 px, `--foreground`, balanced |
| `p` | 19 / 28.5, `--foreground-muted`, margin-top 18, flex: 1 (pushes pill to bottom) |
| `.pill` | self align flex-start, margin-top 22, padding 6/12, `--surface-2`, hairline, radius-xs, mono 14 px, `--foreground-subtle`, track 0.05em, uppercase |

### 8.10 · Slide 10 — Risks / open questions

```html
<div class="risk-list">
  <div class="risk-row">
    <span class="label">Agent drift</span>
    <span class="text">Risk claim.<small>Mitigation.</small></span>
    <span class="level"><span class="pill warn">Medium</span></span>
  </div>
  …
</div>
```

| Element | Spec |
|---|---|
| `.risk-list` | flex column, max 1640, margin-top 48 |
| `.risk-row` | `grid-template-columns: 200px 1fr 220px; gap: 32; padding: 28 0; hairline top` (first: no border) |
| `.label` | eyebrow 18 px, `--foreground-subtle`, padding-top 10 |
| `.text` | 26 / 36, `--foreground` |
| `.text small` | block, 19 / 26, `--foreground-muted`, margin-top 8 (the mitigation line) |
| `.level` | text-align right, mono 18 px, `--foreground-subtle` |
| `.level .pill` | default (Low): `--surface-2` + hairline, `--foreground-muted` |
| `.level .pill.warn` | `--warning-soft` + `--warning-mid` border + `--warning` text (Medium) |
| `.level .pill.dang` | `--danger-soft` + `--danger-mid` border + `--danger` text (High) |

### 8.11 · Slide 11 — References

```html
<div class="refs-grid">
  <div class="ref">
    <span class="n">[1]</span>
    <div class="body">Author · Title · Date
      <span class="src">URL or — Internal · no public URL</span>
    </div>
  </div>
  …
</div>
```

| Element | Spec |
|---|---|
| `.refs-grid` | 2 cols, column-gap 80, row-gap 20, max 1640, margin-top 48 |
| `.ref` | `grid-template-columns: 80px 1fr; gap: 24; padding: 22 0; hairline top` (first 2: no border) |
| `.n` | mono 22 px, `--brand` |
| `.body` | 22 / 32, `--foreground`, line-height 1.45 |
| `.src` | block, mono 16 px, `--foreground-subtle`, margin-top 6 |

### 8.12 · Slide 12 — Thank-you (`.thanks`)

```html
<section class="thanks" data-screen-label="12 Thank you">
  <div class="slide-veil"></div>
  <div class="slide-top">…wordmark + "End of report" ref…</div>
  <div class="slide-pad">
    <div class="stack">
      <span class="eyebrow-lg">Questions?</span>
      <h2 class="title-xl">Let's <span class="brand-word">talk.</span></h2>
      <div class="contact">
        <div>
          <div class="l">Engagement lead</div>
          <div class="v">Maya Lindgren · Partner</div>
          <div class="v mono">maya@pointonezero.com</div>
        </div>
        <div>…direct…</div>
      </div>
    </div>
  </div>
  <div class="slide-foot">…</div>
</section>
```

| Element | Spec |
|---|---|
| `.thanks .stack` | `flex: 1; justify-content: center; flex-direction: column` |
| `.title-xl` here | max 1440 |
| `.contact` | 2 cols, gap 48, max 1200, margin-top 80, padding-top 32, hairline top |
| `.l` | eyebrow 22 px, track 0.031em, `--foreground-subtle` |
| `.v` | 28 px sans, `--foreground`, margin-top 10 |
| `.v.mono` | mono 24 px |

---

## 9 · Brand restraint

This kit uses **per-deck (whole-deck) restraint**, not per-slide. Pitch deck is per-slide; this kit is closer to long-form document restraint.

| # | Where | Count |
|---|---|---|
| 1 | `.brand-dot` total across deck | **1** (cover eyebrow only) |
| 2 | `.brand-word` total | **3** (cover title + section opener title + thank-you title) |
| 5 | Featured finding card | **1** (`.find-cell.featured` on slide 06) |
| 6 | Status pills (warn / dang) | **2–3** on risks slide — semantic, not brand |
| 7 | Brand mono ordinal markers | Agenda (6) + recommendations (3) + references (4) = **13**, all editorial markers |
| — | `.chap-num` brand mono | **1** (section opener) |
| — | Hero veil instances | **3** (cover + section opener + thank-you) — at the max |

Comparison: pitch deck has 12+ `.brand-dot` (one per slide); report deck has 1 across 12 slides.

---

## 10 · Copywriting budgets

| Slot | Limit | Voice |
|---|---|---|
| Cover title | 6–10 words, ONE brand-word ideally on numeric | Outcome |
| Cover lead | ≤ 30 words | Factual |
| Agenda item title | ≤ 4 words | Sentence case |
| Agenda subtitle | ≤ 8 words | One clause |
| Section title (chapter divider) | 2–5 words + period | One brand-word |
| Section lead | ≤ 30 words, one sentence | Past tense for outcomes |
| Interior slide title (`.title-md`) | ≤ 12 words | Sentence case |
| Context column title (`.col h4`) | ≤ 8 words | Verb-first |
| Context column body | 2–3 sentences | ≤ 50 words |
| Table column header | ≤ 3 words | Sentence case |
| Table cell | ≤ 8 words | Short noun phrases |
| Finding label | ≤ 5 words UPPER | Action-noun |
| Finding description | ≤ 12 words | One clause |
| Compare column title (`.col h4`) | ≤ 8 words | The headline of the change |
| Compare column body | 2 sentences | ≤ 40 words |
| Recommendation title | ≤ 10 words | Verb-first, ends with period |
| Recommendation body | 2 sentences max | Claim + impact |
| Recommendation pill | `Owner · Name · Time-frame` | Mono, 3 parts |
| Risk label | ≤ 3 words | Noun |
| Risk text | One sentence | ≤ 18 words |
| Risk mitigation `<small>` | "Mitigation: …" | ≤ 18 words |
| Risk pill | "Low" / "Medium" / "High" | Exactly one word |
| Reference body | Author · Title · Date | Curly quotes around titles |
| Reference URL `.src` | bare URL or `— Internal · no public URL` | mono |
| Thank-you title | 2–4 words + period | ONE brand-word |
| Contact label | ≤ 2 words UPPER | "Engagement lead" |
| Contact value | ≤ 5 words | Name · Role |

---

## 11 · Common mistakes (and the fixes)

| Mistake | Fix |
|---|---|
| Treating this like a pitch deck (huge type, one claim per slide) | Use `.title-md` (64 px) for interior slides; `.title-xl` only on cover + thank-you |
| Eyebrow `letter-spacing: 0.08em` | Use `0.031em` (~3% of size). This was the v0.6.2 fix; same rule here. |
| `.brand-dot` on every slide eyebrow | One brand-dot total across the deck (cover only) — per-deck restraint, not per-slide |
| Multiple `.brand-word` per slide | One per slide max; 3 total across the deck |
| Filling the featured finding cell with brand | `--surface-2` lift; only the *number* is `--brand` |
| Brand color on risk severity pill | Risk severity uses `--warning` / `--danger` — never `--brand`. Severity is *status*, not *attention*. |
| Duplicating `deck-stage.js` into this folder | Reference `../pitch-deck/deck-stage.js` — single source |
| Forgetting `data-screen-label="NN <Name>"` on each `<section>` | Required for user comments to anchor correctly |
| Inline `font-size: 140px` for the title | Use `.title-xl` (132 px) — the kit's hero scale |
| Missing `.slide-veil` on cover or section opener | Veil is part of the section-opener chrome; without it the layout reads flat |
| Setting body bg to `--canvas` instead of `--color-primary` | The dark backdrop is what makes the light slides float; do not invert |
| Hardcoding `#050506` for the body bg | Use `var(--color-primary)`; this was the v0.6.1 fix for the pitch-deck stage |

---

## 12 · Full agent prompt

> You are producing a Point One Zero report-style PRESENTATION — 1920 × 1080, twelve slides, one HTML file. **Load `../../colors_and_type.css`** and **`../pitch-deck/deck-stage.js`** (do not duplicate the latter into this folder). Body background is `var(--color-primary)` (dark stage); slides themselves are `var(--canvas)` via `--slide-bg`.
>
> **Slide order:** cover (`.s-cover`) · agenda · section opener (`.s-section-opener`) · context (2-col) · what shipped (`.deck-table`) · findings (`.findings-4` with ONE `.featured`) · figure (`.deck-figure`) · before/after (`.compare-grid`) · recommendations (`.recs-grid` 3-up) · risks (`.risk-list` with severity pills) · references (`.refs-grid` 2-col) · thank-you (`.thanks`). Each `<section>` is a direct child of `<deck-stage>` with `data-screen-label="NN Name"`.
>
> **Universal chrome:** `.slide-top` (absolute, top 56, padding 0 140; wordmark left with brand-dot in mark, report-ID `.ref` mono right). `.slide-foot` (absolute, bottom 48, left/right 140; "Point One Zero · Confidential" left, mono `.pg NN / 12` right). `.slide-pad` (padding 100 140) holds slide body.
>
> **Type:** `.title-xl` (132 px, weight 600, track -5.4 px) on cover + thank-you ONLY. `.title-md` (64 px, track -2.0 px) on all interior slides. `.s-section-opener .chap-title` (132 px, track -5 px). `.eyebrow-lg` (22 px, `letter-spacing: 0.031em` — NEVER 0.08em). Body lead `.lead-lg` (32 px). Context / compare body 24 / 36. Finding stat 132 px / unit 40 px. All tracking ratios match the main system (+3% on eyebrows, ~-3.8% on display).
>
> **Color:** slides on `var(--canvas)`. Featured cards on `var(--surface-2)`. Tables thead bg `var(--surface-2)`. Cards default to `var(--surface-1)`. Borders subtle, default on featured.
>
> **Brand restraint (per-deck, not per-slide):** ONE `.brand-dot` total (cover). THREE `.brand-word` (cover + section opener + thank-you). ONE `.find-cell.featured` with brand-tinted 132 px number. Brand mono ordinals on agenda (6) + recommendations (3) + references (4). Section opener `.chap-num` brand. Three `--gradient-hero-veil` instances (cover + section opener + thank-you). Status pills on risks slide use `--warning` / `--danger`, never `--brand`.
>
> **Numerics:** big finding stats are `.find-cell .n` (132 px sans, tabular-nums). Page indicator `.pg` mono in foot. Chapter / section / agenda / recommendation / reference numerals are `.mono` brand. Table column `.num` cells right-aligned tabular. Mono meta (report ID, dates, URLs) is `--foreground-subtle`.
>
> **Copy budgets:** cover title 6–10 words; interior titles ≤ 12 words; finding descriptions ≤ 12 words; recommendation titles ≤ 10 words ending with period; reference URLs on their own `.src` line. Sentence case throughout. Oxford comma. En-dashes for ranges. Numerals always.
>
> When unsure, default to denser-than-pitch-deck: this is a stakeholder report, not a sales pitch.

---

## 13 · Report deck vs pitch deck

| | Pitch deck (`../pitch-deck/`) | Report deck (this) |
|---|---|---|
| **Purpose** | Sell — investor / sales | Inform — stakeholder review |
| **Headline size** | `.title-xl` 156 px on most slides | `.title-md` 64 px on interior, `.title-xl` 132 px on cover + thanks only |
| **Big stat size** | `.stat-num-2xl` 132 px (one per slide hero pattern) | Same 132 px but 4-up on findings slide |
| **Brand restraint** | Per-slide (one dot + one word per slide) | Per-deck (one dot total, three words total) |
| **Slides** | 14, hero-style claims | 12, denser per slide |
| **Tables / figures** | Rare | Two dedicated slides (shipped, figure) |
| **Tone** | Confident, future-tense, single claim | Factual, past-tense, multiple points |
| **Density** | One claim per slide | 2–3 points per slide |

If the deliverable is quarterly review, status report, audit summary, engagement debrief → this kit. If fundraising / sales-call deck → the pitch deck.

---

*This file is the source of truth for the report-presentation kit. The HTML mirrors it; if they disagree, fix this file first, then the HTML.*

*See [`AUTHORING.md`](../../AUTHORING.md) for the system-wide contract. The document version lives in [`../report-document/`](../report-document/).*

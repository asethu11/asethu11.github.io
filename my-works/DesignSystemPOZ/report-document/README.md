# Report document kit — Point One Zero

> **Format:** 8.5 × 11 portrait · **Pages:** 12 templates · **Output:** print-ready PDF (browser → Save as PDF) or DOCX (copy-paste rendered content)
>
> **Purpose:** Stakeholder report deliverable. Cover, executive summary, TOC, section openers, body, data figure, before/after, findings, recommendations, appendix, references, back cover. Twelve pages, one HTML file, zero JS dependencies.

This file is the **exhaustive spec** for the kit. An AI or human builder reading this should be able to produce a new report indistinguishable from `index.html` without seeing the source. Every element has a token, a class, a copy budget, and a known mistake to avoid.

Read [`AUTHORING.md`](../../AUTHORING.md) first for the system-wide contract. This file appends only the kit-specific layer.

---

## Table of contents

1. [Quick reference](#1-quick-reference)
2. [Files & how to load](#2-files--how-to-load)
3. [Page geometry](#3-page-geometry)
4. [Universal chrome](#4-universal-chrome) — head, foot, veil
5. [Type system used in this kit](#5-type-system-used-in-this-kit)
6. [Color tokens used in this kit](#6-color-tokens-used-in-this-kit)
7. [Numeric vocabulary](#7-numeric-vocabulary)
8. [Page-by-page spec](#8-page-by-page-spec) — twelve pages, each with markup, tokens, copy budget
9. [Brand restraint — counted across the document](#9-brand-restraint)
10. [Copywriting budgets — per slot](#10-copywriting-budgets)
11. [Print / PDF export](#11-print--pdf-export)
12. [Common mistakes (and the fixes)](#12-common-mistakes)
13. [Full agent prompt](#13-full-agent-prompt)

---

## 1 · Quick reference

| Token | Value | Use |
|---|---|---|
| `--page-w` | `816px` | 8.5" × 96 DPI |
| `--page-h` | `1056px` | 11" × 96 DPI |
| `--page-pad-x` | `72px` | 1" gutter, left + right |
| `--page-pad-y` | `72px` | 1" gutter, top + bottom (cover and back cover only) |
| `--bg-stage` | `#ededed` | Off-canvas wash, **on-screen only** — hidden under `@media print` |

Pages render at 816 × 1056 on screen. `@media print` scales to letter and removes the stage background, drop shadow, and inter-page gap.

---

## 2 · Files & how to load

```
ui_kits/report-document/
├── README.md   (this file)
└── index.html  (the twelve pages)
```

`index.html` head:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=1280" />
<title>Report — Point One Zero</title>
<link rel="icon" href="../../assets/favicon.svg" />
<link rel="stylesheet" href="../../colors_and_type.css" />
<style>/* kit-specific styles */</style>
</head>
<body>
  <!-- twelve <section class="page"> blocks -->
</body>
</html>
```

No JS. No React. No bundler. Open the file in a browser and it renders.

---

## 3 · Page geometry

Every page is a `<section class="page">` at exactly `816 × 1056` px, displayed in a vertical stack with a 28 px gap on screen.

```html
<section class="page [optional-variant]">
  <div class="page-veil"></div>      <!-- optional: only on cover, section openers, back cover -->
  <div class="page-head">…</div>     <!-- on every interior page -->
  <div class="page-body">…</div>     <!-- main content -->
  <div class="page-foot">…</div>     <!-- on every interior page -->
</section>
```

| Variant class | Used on |
|---|---|
| (no variant) | Page 02 (exec summary), 03 (TOC), 05 (body), 06 (data), 07 (before/after), 08 (findings), 09 (recs), 10 (appendix), 11 (references) — nine pages |
| `.cover` | Page 01 only — no head / foot, custom cover-stack layout |
| `.section-opener` | Page 04 — chapter-divider chrome, hero veil behind |
| `.back-cover` | Page 12 — closing CTA + contact + bottom version bar |

### Box model

```
┌─────────────────────────────────┐  ← page (816 × 1056)
│ ┌─────────────────────────────┐ │
│ │ page-head  (48px tall)      │ │  ← border-bottom: --border-subtle
│ ├─────────────────────────────┤ │
│ │                             │ │
│ │ page-body                   │ │  ← padding: 48px 72px 32px
│ │ flex: 1                     │ │
│ │                             │ │
│ ├─────────────────────────────┤ │
│ │ page-foot  (56px tall)      │ │  ← border-top: --border-subtle
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

---

## 4 · Universal chrome

### 4.1 · Page head (`.page-head`)

```html
<div class="page-head">
  <span class="wm">point one zero<span class="dot">.</span></span>
  <span class="ref">Report REP-26-0118-NW · Executive summary</span>
</div>
```

| Element | Class | Token | Value | Notes |
|---|---|---|---|---|
| Container | `.page-head` | height | `48px` | flex: none |
| | | padding | `0 72px` | matches `--page-pad-x` |
| | | border-bottom | `1px solid var(--border-subtle)` | hairline rule |
| Wordmark | `.page-head .wm` | font | `var(--font-body)` | 16/24 |
| | | weight | `var(--weight-medium)` | 510 |
| | | color | `var(--foreground)` | #0a0a0a |
| | | letter-spacing | `-0.2px` | |
| Brand dot in mark | `.page-head .wm .dot` | color | `var(--brand)` | the only `--brand` use in the page head |
| Reference text | `.page-head .ref` | font | `var(--font-mono-md)` | 13/19.5 mono |
| | | color | `var(--foreground-subtle)` | #71717a |

**Copy:** Ref text follows `Report <ID> · <section>` pattern. ID format: `REP-<YY>-<NNNN>-<CLIENT>` (e.g. `REP-26-0118-NW`).

### 4.2 · Page foot (`.page-foot`)

```html
<div class="page-foot">
  <span>Point One Zero · Confidential</span>
  <span class="pg">02 / 12</span>
</div>
```

| Element | Token | Value |
|---|---|---|
| Container height | | `56px` |
| Padding | | `0 72px` |
| Border-top | | `1px solid var(--border-subtle)` |
| Margin-top | | `auto` (pushes foot to bottom of `.page-body` flex) |
| Text font | | `var(--font-mono-md)` |
| Text size | | `11px` (override) |
| Text color | | `var(--foreground-subtle)` |
| Page number | `.pg` | `font-family: var(--font-mono); font-variant-numeric: tabular-nums` |

**Copy:** Left slot is `Point One Zero · Confidential`. Right slot is page indicator `NN / 12` (mono tabular).

### 4.3 · Hero veil (`.page-veil`)

Used on pages with a `--gradient-hero-veil` wash: cover, section opener, back cover. Three instances max across the document.

```html
<div class="page-veil"></div>
```

```css
.page-veil {
  position: absolute; inset: 0;
  background: var(--gradient-hero-veil);
  pointer-events: none;
}
```

---

## 5 · Type system used in this kit

### Display ladder

| Class | Token | Size/Line | Weight | Track | Where |
|---|---|---|---|---|---|
| `.cover-title` | (custom: `font-size: 76px`) | 76 / 76 | 600 | -2.6px | Cover only |
| `.section-title` | `var(--font-display-md)` | 40 / 46 | 600 | -1.0px | Section openers + page-2/page-11 H2 |
| `.section-opener .chap-title` | (custom: `font-size: 60px`) | 60 / 60 | 600 | -1.8px | Chapter dividers only |
| `.subsection` (h3) | `var(--font-card-title)` | 22 / 27.5 | 510 | -0.4px | Subsection headers within body |
| `.toc-item .t` | `var(--font-headline)` | 28 / 33.6 | 600 | -0.6px | TOC row title |
| `.rec h3` | `var(--font-card-title)` | 22 / 27.5 | 510 | -0.4px | Recommendation title |

### Body ladder

| Class | Token | Size/Line | Where |
|---|---|---|---|
| `.lead` | `var(--font-body-lg)` | 18 / 27 | Section lead under H2 |
| `.cover-sub` | `var(--font-subhead)` | 20 / 28 | Cover subhead under title |
| `.exec-tldr p` | `var(--font-body-lg)` | 18 / 27 | TL;DR pull-block |
| `p` (default) | `var(--font-body)` | 16 / 24 | Body paragraph |
| `.callout p` | `var(--font-body)` | 16 / 24 | Inline callout body |
| `.exec-card .d` / `.finding-cell .d` / `.rec p` | `var(--font-body-sm)` | 14 / 21 | Card body / metric descriptors |
| `.page-head .ref` / `.page-foot` / mono meta | `var(--font-mono-md)` | 13 / 19.5 (foot 11) | All chrome metadata |

### Eyebrows

| Class | Spec | Where |
|---|---|---|
| `.eyebrow` (body) | `var(--font-eyebrow)` 13/16.9, +0.4px track, weight 510, uppercase, `var(--foreground-subtle)` | Section openers within body |
| `.cover-eyebrow` | `var(--font-eyebrow)` 13/16.9, same track/weight | Cover only |
| `.section-opener .chap-num` | `font-family: var(--font-mono); font-size: 14px; color: var(--brand); letter-spacing: 0.4px` | Chapter divider |
| `.exec-card .l` / `.finding-cell .l` / `.rec .pill` / `.callout .l` / `.appendix-kv dt` (labels) | `var(--font-eyebrow)`, +0.4px track, uppercase | All inline metadata labels |

**Hard rule:** All eyebrows track at `var(--track-eyebrow)` (+0.4 px ≈ +3% of size). If you scale an eyebrow custom-size, derive track as `0.031em`.

---

## 6 · Color tokens used in this kit

### Surfaces

| Token | Value | Used by |
|---|---|---|
| `--canvas` | `#ffffff` | Every `.page` background |
| `--surface-1` | `#fafafa` | `.exec-card`, `.finding-cell`, `.callout`, `.figure`, `.exec-tldr` (with brand-rail), back-cover-veil bottom |
| `--surface-2` | `#f3f4f5` | **Only** `.exec-card.featured` and `.finding-cell.featured` — the one featured stat |

### Borders

| Token | Value | Used by |
|---|---|---|
| `--border-subtle` | 6% black | All hairlines: page-head bottom, page-foot top, default card borders, divider hairlines |
| `--border-default` | 10% black | `.featured` card borders only |
| `--edge-highlight` | inset top white | All lifted cards |

### Foreground scale

| Token | Value | Used by |
|---|---|---|
| `--foreground` | `#0a0a0a` | H2, H3, card titles, TOC titles, recommendation titles, `dd` body |
| `--foreground-muted` | `#3f3f46` | All paragraphs (`p`, `.lead`, `.cover-sub`, card `.d` descriptions, callout `p`) |
| `--foreground-subtle` | `#71717a` | All eyebrows, page-head ref, page-foot text, TOC subtitle, `dt` labels |

### Brand

| Token | Used where (count) |
|---|---|
| `--brand` | Cover wordmark `.brand-dot` (×1) · Cover title `.brand-word` "17 hours" (×1) · Back-cover title `.brand-word` "Let's talk" (×1) · `.section-opener .chap-num` (×1, pg 4) · `.toc-item .n` brand mono numerals (×6, pg 3) · `.rec .n` brand mono numerals (×3, pg 9) · `.ref-item .n` brand mono numerals (×4, pg 11) · `.exec-tldr` brand-rail border-left (×1) · `.exec-card.featured .num` (×1) · `.finding-cell.featured .stat-num` (×1) · `.callout .l` brand eyebrow (×2) |
| `--brand-glow` | Cover `.brand-dot` shadow only |
| `--gradient-card-featured` | `.exec-card.featured::before` and `.finding-cell.featured::before` (neutral wash, **not** brand) |
| `--gradient-hero-veil` | `.cover .cover-veil` + `.section-opener .page-veil` + `.back-cover .back-cover-veil` (max 3 per document) |

### Print-only

`@media print` strips the off-canvas stage and the page shadow; `@page { size: letter; margin: 0; }` makes Chrome's PDF export emit one letter page per `.page` with no margin negotiation.

---

## 7 · Numeric vocabulary

Every number in the document maps to one of four patterns. Resist inventing a fifth.

| Pattern | Class | Font | Size | Color | Tabular |
|---|---|---|---|---|---|
| Big metric (executive summary cards) | `.exec-card .num` | Inter sans, weight 600 | 44px / `letter-spacing: -1.4px` | `--foreground`, `.featured` overrides to `--brand` | tabular-nums |
| Big finding (findings page) | `.stat-num.stat-num-lg` (canonical) | Inter sans, weight 600 | 68px | `--foreground`, `.brand` modifier for the featured | tabular-nums |
| Editorial ordinal markers | `.mono` brand color | mono, 13–18 px | TOC: 13px · Recs: 18px · Refs: 13px | `var(--brand)` | tabular-nums |
| Inline data (page #, ID, date, phone, URL, email) | `.mono` foreground-subtle | mono | 11–13 px | `--foreground-subtle` | tabular-nums |

**Strict rule:** Body-prose numerics ("$1.8M / yr", "five weeks", "240 accounts") stay in body sans — no class, no mono.

---

## 8 · Page-by-page spec

### 8.1 · Page 01 — Cover (`.cover`)

```html
<section class="page cover">
  <div class="cover-veil"></div>
  <div class="cover-top">…</div>
  <div class="cover-stack">…</div>
  <div class="cover-meta">…</div>
</section>
```

| Slot | Markup | Tokens | Copy budget |
|---|---|---|---|
| Top-left wordmark | `<span class="wm"><span class="brand-dot"></span>point one zero</span>` | `font-body`, weight-medium, `.brand-dot` 6×6 with `--brand-glow` | "point one zero" fixed |
| Top-right ref | `<span class="ref">Report · 2026 Q1<br><span style="color: var(--foreground)">v0.1</span> · Confidential</span>` | `font-mono-md`, `--foreground-subtle`; version is `--foreground` | 2 lines max |
| Eyebrow | `<span class="cover-eyebrow">Engagement report · Northwind Capital</span>` | `font-eyebrow`, +0.4 track, `--foreground-subtle` | ≤ 8 words |
| Title | `<h1 class="cover-title">…<span class="brand-word">…</span>…</h1>` | 76px, -2.6 track, weight 600, **ONE** `.brand-word` | 4–8 words |
| Subhead | `<p class="cover-sub">…</p>` | `font-subhead`, `--foreground-muted`, max 520 px wide | ≤ 30 words |
| 4-up meta | `<div class="cover-meta">` with 4 `<div>` slots: Prepared for · Prepared by · Date · Report ID | grid 4 cols, gap 24, `border-top: --border-subtle` | label ≤ 2 words, value ≤ 6 words |

**Brand budget on this page:** 1 brand-dot + 1 brand-word + 1 hero veil. Don't add more.

### 8.2 · Page 02 — Executive summary

```html
<section class="page">
  <div class="page-head">…</div>
  <div class="page-body">
    <span class="eyebrow">Section 01</span>
    <h2 class="section-title">Executive summary.</h2>
    <p class="lead">…</p>
    <div class="exec-grid">
      <div class="exec-card">…</div>          <!-- default -->
      <div class="exec-card">…</div>          <!-- default -->
      <div class="exec-card featured">…</div> <!-- ONE featured -->
    </div>
    <div class="exec-tldr">…</div>
  </div>
  <div class="page-foot">…</div>
</section>
```

| Slot | Spec |
|---|---|
| Eyebrow | "Section 01" (sentence case for section #) — `var(--foreground-subtle)` |
| H2 | `.section-title` 40px display-md, balanced, max 580 px |
| Lead | `.lead` 18/27 body-lg, `--foreground-muted`, max 600 px, `text-wrap: pretty` |
| Exec grid | `grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 36px` |
| Exec card | `.exec-card` on `--surface-1`, `--border-subtle`, radius-lg, padding 20 px, `--edge-highlight` |
| Featured exec card | `.exec-card.featured` lifts to `--surface-2`, border `--border-default`, ::before is `--gradient-card-featured` (neutral) |
| Big number | `.exec-card .num` — sans 44px, weight 600, `letter-spacing: -1.4px`, tabular-nums, `.featured .num` → `--brand` |
| Unit suffix | `.num small` — 18px, `--foreground-subtle`, weight 600, `letter-spacing: -0.4px`, `margin-left: 2px` |
| Card label | `.l` — `font-eyebrow`, +0.4 track, uppercase, `--foreground-subtle`, `margin-top: 12px` |
| Card description | `.d` — `font-body-sm`, `--foreground-muted`, `margin-top: 6px` |
| TL;DR block | `.exec-tldr` on `--surface-1`, `border-left: 2px solid var(--brand)`, radius right only, padding 20/24 |
| TL;DR label | `.l` — `font-eyebrow`, `--brand`, displayed as block, margin-bottom 10 |
| TL;DR body | `p` — `font-body-lg`, `--foreground` (not muted — emphasis) |

**Copy budget:** Lead ≤ 35 words. Each exec card description ≤ 14 words. TL;DR ≤ 45 words.

### 8.3 · Page 03 — TOC (Contents)

```html
<div class="toc-list">
  <div class="toc-item">
    <span class="n">01</span>
    <span class="t">Section title<small>One-sentence subtitle.</small></span>
    <span class="pg">02</span>
  </div>
  …
</div>
```

| Element | Spec |
|---|---|
| `.toc-list` | `display: flex; flex-direction: column; margin-top: 36px` |
| `.toc-item` | `grid-template-columns: 56px 1fr 60px; gap: 18px; padding: 16px 0; border-top: --border-subtle` (first child: no border) |
| `.n` (number) | mono 13 px, `--brand`, tabular-nums |
| `.t` (title) | `font-headline` 28/33.6, weight 600, `--foreground` |
| `.t small` (subtitle) | block, `font-body-sm`, `--foreground-subtle`, margin-top 4, weight 400 |
| `.pg` (page number) | mono, `--foreground-subtle`, tabular-nums, text-align right |

**Hard rule:** This grid template is for **TOC and recommendations**. Do not reuse it for references — references have their own layout (§ 8.11) because URL content overflows the 60 px right cell.

### 8.4 · Page 04 — Section opener (`.section-opener`)

```html
<section class="page section-opener">
  <div class="page-veil"></div>
  <div class="page-head">…</div>
  <div class="body">
    <span class="chap-num">SECTION 02</span>
    <h1 class="chap-title">Engagement context.</h1>
    <p class="chap-lead">…</p>
  </div>
  <div class="page-foot">…</div>
</section>
```

| Slot | Spec |
|---|---|
| Section opener body | `.body` (NOT `.page-body`) — `flex: 1; padding: 72 72; justify-content: center; flex-direction: column` |
| Chapter number | `.chap-num` — `font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.4px; color: var(--brand)` |
| Chapter title | `.chap-title` — 60 px, line-height 1.0, `letter-spacing: -1.8px`, weight 600, max 520 px, balanced |
| Chapter lead | `.chap-lead` — `font-subhead`, `--foreground-muted`, max 480 px, margin-top 22 |

**Veil:** A single `--gradient-hero-veil` instance via `.page-veil`. This is the second of three veil instances allowed per document.

**Copy budget:** Section title 2–5 words. Lead ≤ 30 words.

### 8.5 · Page 05 — Body (paragraphs + inline callout)

```html
<div class="page-body">
  <span class="eyebrow">02.1 · Brief</span>
  <h3 class="subsection">What Northwind asked for.</h3>
  <p>…</p>
  <p>…</p>

  <div class="callout">
    <span class="l">Why this one shipped</span>
    <p>…</p>
  </div>

  <h3 class="subsection">02.2 · Scope &amp; team</h3>
  <p>…</p>
</div>
```

| Element | Spec |
|---|---|
| Eyebrow | "02.1 · Brief" — sub-section numbering convention |
| Subsection H3 | `.subsection` — `font-card-title` 22/27.5, weight 510, `--foreground`, `margin: 28px 0 0` |
| Paragraph | `p` — `font-body` 16/24, `--foreground-muted`, max 600 px, `text-wrap: pretty`, `margin-top: 14px` |
| Callout | `.callout` on `--surface-1`, `--border-subtle`, radius-lg, padding 20/24, `--edge-highlight`, `margin-top: 28px` |
| Callout label | `.callout .l` — `font-eyebrow`, +0.4 track, uppercase, **`--brand`** (the only eyebrow that's brand-colored) |
| Callout body | `.callout p` — `font-body`, `--foreground` (not muted) |

**Hard rule:** One `.callout` per body page, max. The brand-colored eyebrow on the callout label is the kit's allowance for "named informational chrome" (README rule #9).

### 8.6 · Page 06 — Data figure + table

```html
<div class="page-body">
  <span class="eyebrow">03.1 · Cost trajectory</span>
  <h3 class="subsection">Run-rate spend, month over month.</h3>
  <p class="lead">…</p>

  <figure class="figure">
    <div class="frame">DROP YOUR CHART HERE — Description</div>
    <figcaption>
      <span>Fig. 01 · Title. Source: Origin.</span>
      <span class="mono">N = 12 mo</span>
    </figcaption>
  </figure>

  <div class="table-wrap" style="margin-top: 28px;">
    <table class="table">…</table>
  </div>
</div>
```

| Element | Spec |
|---|---|
| Figure container | `.figure` on `--surface-1`, `--border-subtle`, radius-lg, overflow hidden |
| Figure frame | `.frame` — height 360 px, `repeating-linear-gradient(45deg, surface-1, surface-1 12px, surface-2 12px, surface-2 24px)`, centered mono label |
| Frame mono label | `font-family: var(--font-mono); font-size: 12px; uppercase; letter-spacing: 0.06em; --foreground-subtle` |
| Figure caption | `figcaption` — padding 14/20, `border-top: --border-subtle`, `font-body-sm`, `--foreground-subtle`, `display: flex; justify-content: space-between` |
| Caption right meta | `.mono` — `font-mono`, 11 px |
| Table wrap | `.table-wrap` (canonical) — wraps a `<table class="table">` from the design system |
| Table | Uses canonical `.table` classes — see [`components/README.md` § Table](../../components/README.md#table) |

**Copy budget:** Lead ≤ 30 words. Caption ≤ 14 words. Table: 4–6 rows max for one-page fit.

### 8.7 · Page 07 — Before/after compare (`.compare-row`)

```html
<div class="compare-row">
  <div class="col">
    <span class="eyebrow">Before</span>
    <h4>Quarterly cycle · 12 ppl-hrs</h4>
    <p>…</p>
  </div>
  <div class="divider"></div>
  <div class="col">
    <span class="eyebrow">After</span>
    <h4>Quarterly cycle · 30 mins</h4>
    <p>…</p>
  </div>
</div>
```

| Element | Spec |
|---|---|
| Container | `.compare-row` — `grid-template-columns: 1fr 1px 1fr; gap: 20px; margin-top: 28px` |
| Divider | `.compare-row .divider` — `background: var(--border-subtle)` (vertical hairline) |
| Column eyebrow | `.col .eyebrow` — standard eyebrow, `--foreground-subtle`, margin-bottom 12 |
| Column title | `.col h4` — `font-card-title` 22/27.5, weight 510, `--foreground`, margin 0 |
| Column body | `.col p` — `font-body`, `--foreground-muted`, margin-top 14, max-width none |

**Optional handoff callout** below the compare row — the "Handoff note" pattern from page 5 (`.callout` with brand-colored `.l`).

**Hard rule:** "Before" column on the left, "After" on the right — by convention, the temporal progression reads left-to-right.

### 8.8 · Page 08 — Findings (4-up stat grid)

```html
<div class="findings-row">
  <div class="finding-cell">
    <span class="stat-num stat-num-lg">17<small>hrs</small></span>
    <div class="l">Time to prototype</div>
    <div class="d">Description.</div>
  </div>
  <div class="finding-cell">…</div>
  <div class="finding-cell featured">…</div>   <!-- ONE featured -->
  <div class="finding-cell">…</div>
</div>
```

| Element | Spec |
|---|---|
| Container | `.findings-row` — `grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 32px` (4-up renders as 2×2 to fit the page height) |
| Default cell | `.finding-cell` on `--surface-1`, `--border-subtle`, radius-lg, padding 24, `--edge-highlight` |
| Featured cell | `.finding-cell.featured` on `--surface-2`, `--border-default`, `::before` is `--gradient-card-featured` (neutral) |
| Stat number | `.stat-num.stat-num-lg` (canonical 68 px). `.featured` overrides color to `var(--brand)` |
| Unit suffix | `.stat-num small` (handled by canonical CSS) |
| Label | `.l` — `font-eyebrow`, +0.4 track, uppercase, `--foreground-subtle`, margin-top 14 |
| Description | `.d` — `font-body-sm`, `--foreground-muted`, margin-top 8 |

**Brand budget:** Exactly ONE `.featured` cell per page. The featured number is tinted `--brand`; the default cells stay `--foreground`. Never two featured cells.

### 8.9 · Page 09 — Recommendations

```html
<div class="recs">
  <div class="rec">
    <span class="n">01</span>
    <div>
      <h3>Recommendation title.</h3>
      <p>Body.</p>
      <span class="pill">Owner · Name · Time-frame</span>
    </div>
  </div>
  <div class="rec">…</div>
  <div class="rec">…</div>
</div>
```

| Element | Spec |
|---|---|
| Container | `.recs` — `display: flex; flex-direction: column; gap: 20px; margin-top: 32px` |
| Row | `.rec` — `grid-template-columns: 56px 1fr; gap: 18px; padding: 16px 0; border-top: --border-subtle` (first: `padding-top: 0`, no border) |
| Number | `.rec .n` — mono 18 px, `--brand`, tabular-nums |
| Title | `.rec h3` — `font-card-title`, weight 510, `--foreground` |
| Body | `.rec p` — `font-body-sm`, `--foreground-muted`, margin-top 8 |
| Owner pill | `.rec .pill` — inline-block, margin-top 10, padding 3/8, `--surface-2`, `--border-subtle`, radius-xs, `font-caption` 11 px, `--foreground-subtle`, +0.06 em track, uppercase |

**Copy convention for the pill:** `Owner · <name> · <time-frame>`. Examples: `Owner · Northwind platform · 2 sprints` · `Owner · Point One Zero · 6 weeks` · `Owner · Northwind · ongoing`.

**Brand budget:** Three brand-mono numerals on this page (the `.rec .n` ordinals). This is the "editorial ordinal markers" allowance (README rule #7).

### 8.10 · Page 10 — Appendix (KV source-data)

```html
<div class="page-body">
  <span class="eyebrow">Section 06</span>
  <h2 class="section-title">Appendix — methodology &amp; references.</h2>
  <p class="lead">…</p>

  <h3 class="subsection">A.1 · Methodology</h3>
  <p>…</p>

  <h3 class="subsection">A.2 · Scope &amp; limitations</h3>
  <p>…</p>

  <h3 class="subsection">A.3 · Source data</h3>
  <dl class="appendix-kv">
    <dt>Cost data</dt><dd class="mono">Northwind finance · 2025-09 → 2026-03 · 12 mo window</dd>
    …
  </dl>
</div>
```

| Element | Spec |
|---|---|
| KV grid | `.appendix-kv` — `grid-template-columns: 200px 1fr; gap: 0; margin-top: 24px` |
| Term (`dt`) | `font-body-sm`, weight 510, `--foreground`, padding 12 0, `border-top: --border-subtle` (first: no border) |
| Definition (`dd`) | `font-body-sm`, `--foreground-muted`, padding 12 0, `border-top: --border-subtle`, margin 0 |
| Mono value | `dd.mono` — `font-mono`, 12 px |

**Copy budget:** Term ≤ 3 words. Definition ≤ 12 words.

### 8.11 · Page 11 — References (`.refs-list`)

```html
<div class="refs-list">
  <div class="ref-item">
    <span class="n">[1]</span>
    <div class="body">Author · Title · Pub · Date
      <span class="src">url-or-source-locator</span>
    </div>
  </div>
  …
</div>
```

**This is NOT the TOC layout.** References use their own `.refs-list` / `.ref-item` styles because URL strings overflow the TOC's 60 px page-number column. The URL goes on its own line as `.src`, with `word-break: break-all` so long URLs wrap.

| Element | Spec |
|---|---|
| Container | `.refs-list` — `display: flex; flex-direction: column; margin-top: 28px` |
| Row | `.ref-item` — `grid-template-columns: 56px 1fr; gap: 18px; padding: 18px 0; border-top: --border-subtle` (first: no border) |
| Number | `.ref-item .n` — mono 13 px, `--brand`, tabular-nums |
| Body | `.ref-item .body` — `font-body-sm`, `--foreground`, line-height 1.5, `word-break: break-word` |
| URL line | `.ref-item .body .src` — block, `font-mono` 12 px, `--foreground-subtle`, margin-top 4, `word-break: break-all` |

**Copy convention:** `Author / Source · Title in quotes · Publication · Date` for the main line; bare URL or `— Internal · no public URL` for the `.src` line.

### 8.12 · Page 12 — Back cover (`.back-cover`)

```html
<section class="page back-cover">
  <div class="back-cover-veil"></div>
  <div class="back-stack">
    <span class="eyebrow">End of report</span>
    <h2>Questions about this report? <span class="brand-word">Let's talk.</span></h2>
    <p>One-paragraph signoff.</p>
    <dl class="back-contact">
      <div>
        <dt>Engagement lead</dt>
        <dd>Maya Lindgren · Partner</dd>
        <dd class="mono">maya@pointonezero.com</dd>
      </div>
      <div>
        <dt>Direct</dt>
        <dd class="mono">(678) 901-4322</dd>
        <dd class="mono">25 Palmer Square, Princeton, NJ 08542</dd>
      </div>
    </dl>
  </div>
  <div class="back-bottom">
    <span class="wm-mark">point one zero<span class="dot">.</span></span>
    <span>Report REP-26-0118-NW · v0.1 · 2026-06-03 · Confidential · 12 / 12</span>
  </div>
</section>
```

| Element | Spec |
|---|---|
| Veil | `.back-cover-veil` — `linear-gradient(180deg, var(--surface-1), var(--canvas))` (not the hero veil — a calmer gradient) |
| Body | `.back-stack` — `flex: 1; padding: 72 72; justify-content: center; flex-direction: column` |
| H2 | `.back-stack h2` — `font-display-md`, weight 600, balanced, max 540 px |
| Brand word | `<span class="brand-word">` in the H2 — the second `.brand-word` of the document (first is on cover) |
| Body p | `.back-stack p` — `font-body-lg`, `--foreground-muted`, max 480 px, margin-top 22 |
| Contact grid | `.back-contact` — `grid-template-columns: 1fr 1fr; gap: 24px; max-width: 520px; margin-top: 36px` |
| Contact label | `dt` — `font-eyebrow`, +0.4 track, uppercase, `--foreground-subtle` |
| Contact value | `dd` — `font-body-sm`, `--foreground`, margin 4 0 0 |
| Mono contact | `dd.mono` — `font-mono`, 13 px |
| Bottom bar | `.back-bottom` — padding 24 72 72, `border-top: --border-subtle`, flex space-between, `font-mono-md` 11 px, `--foreground-subtle` |
| Wordmark mark | `.wm-mark` — `font-sans` weight 510, `--foreground`, with `.dot` colored `--brand` |

---

## 9 · Brand restraint

This is the audit. Count every brand instance across the document; if you exceed these counts, reduce.

| # | Where | Count in this document |
|---|---|---|
| 1 | `.brand-dot` on cover wordmark | **1** |
| 2 | `.brand-word` total | **2** (cover title + back-cover H2) |
| 4 | Link underlines on hover | global (no count) |
| 5 | Featured number per page | **2** — one on exec summary, one on findings (different pages, both featured the SAME number 47%) |
| 7 | Mono ordinal markers in brand | **13** — TOC (6) + recs (3) + refs (4) |
| 9 | Brand eyebrow on `.callout .l` | **2** (page 5 + page 7) |
| — | `.section-opener .chap-num` brand mono | **1** (page 4) |
| — | `.exec-tldr` brand-rail border | **1** (page 2) |
| — | Hero veil instances (`--gradient-hero-veil`) | **3** (cover + section opener + back cover) — at the max |

**The 47% appearing twice (executive summary featured + findings featured) is intentional emphasis** — the same number reported across two surfaces. The rule "one featured per page" still holds because each is on its own page.

---

## 10 · Copywriting budgets

| Slot | Limit | Voice |
|---|---|---|
| Cover title | 4–8 words | Outcome-led, one brand-word ideally on a numeric |
| Cover subhead | ≤ 30 words, one sentence | Factual, scope-setting |
| Section title (H2) | 2–5 words + period | Sentence case |
| Section lead | ≤ 35 words, one sentence | Past tense for outcomes, present tense for state |
| Chapter title (section opener) | 2–5 words | Same as H2 |
| Chapter lead | ≤ 30 words | One sentence |
| Subsection (H3) | ≤ 10 words | Sentence case |
| Body paragraph | 2–4 sentences, ≤ 60 words | Print readability ceiling |
| Callout label | ≤ 4 words | UPPER (eyebrow) |
| Callout body | 1–3 sentences | One claim per callout |
| Exec card label | ≤ 5 words UPPER | Action-noun ("Cost reduction") |
| Exec card description | ≤ 14 words | One sentence |
| Finding label | ≤ 5 words UPPER | Same |
| Finding description | ≤ 20 words | Source / context |
| TL;DR | ≤ 45 words | The headline finding restated for the executive |
| Recommendation title | 6–10 words ending with period | Verb-first ("Extend the registry…") |
| Recommendation body | 1–2 sentences | Claim + estimated impact |
| Recommendation pill | `Owner · Name · Time` | Mono, 3 parts, middle dots |
| Figure caption | ≤ 14 words | "Fig. NN · Title. Source: X." |
| Reference body | Author / Source · Title · Publication · Date | Curly quotes around titles |
| Reference URL | bare or `— Internal · no public URL` | mono |
| Contact KV value | ≤ 6 words | Same pattern across labels |

**Style baseline:** Sentence case in chrome. Oxford comma. Em-dashes with surrounding spaces, sparingly. En-dashes for ranges (`5–10 weeks`). `×` is Unicode multiplication, not `x`. Numerals always (`17 hours`, `10× faster`, `47%`).

---

## 11 · Print / PDF export

```css
@media print {
  body { background: white; padding: 0; gap: 0; }
  .page { box-shadow: none; page-break-after: always; }
  .page:last-child { page-break-after: auto; }
  @page { size: letter; margin: 0; }
}
```

**Browser flow:**
1. Open `index.html` in Chrome.
2. `⌘P` / `Ctrl+P` → "Save as PDF".
3. Layout: Portrait. Paper: US Letter. Margins: None. Background graphics: ON.
4. Save. Twelve pages, no margin negotiation, brand intact.

**DOCX flow:** copy the rendered page into a Word doc — the type and color tokens are visible in the HTML and translate cleanly. Or invoke the "Save as PDF" skill if true PDF is preferred.

---

## 12 · Common mistakes (and the fixes)

| Mistake | Fix |
|---|---|
| Using the TOC `.toc-item` grid for references | References use `.refs-list` / `.ref-item` (URL on its own line) — see § 8.11. The TOC right column is 60 px and clips URLs. |
| Adding `.brand-dot` to an interior page eyebrow | One brand-dot per document — cover wordmark only. |
| Multiple `.brand-word` instances per page | Two total per document max — cover + back-cover. |
| Filling featured exec card / featured finding with brand | Surface-2 lift; only the *number* is `--brand`. |
| Inline `font-size: 44px` on cover title | Cover title is purposefully off-scale at 76px — the kit's one display override; documented in § 5. |
| Adding `.callout` to every body page | One callout per chapter, max. Use plain paragraphs otherwise. |
| Replacing the print CSS with `@page` margins | The kit's design IS the margin — page padding is built into `.page-body`. Don't break it. |
| Brand color on a section title (H2) | Foreground only; section titles are taxonomy, not statement. |
| Mono for body prose | Mono is for *data* (page numbers, IDs, dates, URLs, ordinals). Body prose stays sans. |
| Header / footer mismatch between pages | Page-head and page-foot are identical across all interior pages. The `<span class="ref">` text changes; nothing else. |
| Cover-meta `dt` longer than 2 words | The 4-col grid breaks. Compress the label or restructure. |
| Eyebrow `letter-spacing: 0.08em` | Use `var(--track-eyebrow)` (+0.4 px). Custom-scale eyebrows use `0.031em` (+3% of size). |
| Adding a 4th hero veil | Three max: cover + section opener + back cover. |
| `--gradient-card-featured` filled with `--brand` | The wash is **neutral** (5% black). Brand is on the number, not the fill. |
| Using `body-lg` for the cover subhead | Cover subhead is `subhead` (20 px). `body-lg` (18 px) is for section leads. |

---

## 13 · Full agent prompt

> You are producing a Point One Zero stakeholder report — 8.5 × 11 portrait, twelve pages, one HTML file. **Load `../../colors_and_type.css`** from the project root and inherit every token from it. Page size is exactly `816 × 1056` px; do not deviate.
>
> **Page structure:** twelve `<section class="page">` blocks in this order — cover (`.cover`) · executive summary · TOC · section opener (`.section-opener`) · body · data figure · before/after compare · findings · recommendations · appendix · references · back cover (`.back-cover`). Each interior page (pages 2–11) carries a `.page-head` (48 px tall, hairline-bottom, wordmark left + `Report <ID> · <section>` mono right) and a `.page-foot` (56 px tall, hairline-top, "Point One Zero · Confidential" left + `NN / 12` mono page indicator right). Cover and back cover have custom chrome — no `.page-head` / `.page-foot`.
>
> **Type:** display H2 is `var(--font-display-md)` (40 / 46, weight 600, `-1.0px` track). Cover title is a kit-specific 76 px override. Section-opener `.chap-title` is a 60 px override. All paragraphs use `var(--font-body)` (16 / 24, `--foreground-muted`, max 600 px wide, `text-wrap: pretty`). Leads use `var(--font-body-lg)` (18 / 27). Cover subhead uses `var(--font-subhead)` (20 / 28). Eyebrows are `var(--font-eyebrow)` (13 px, `var(--track-eyebrow)` = `+0.4px`, uppercase, `var(--foreground-subtle)`). Mono is `var(--font-mono-md)` (13 / 19.5) for chrome metadata.
>
> **Color:** surfaces are `var(--canvas)` (page bg), `var(--surface-1)` (default cards), `var(--surface-2)` (the **one** featured exec card + the **one** featured finding cell only). Borders: `var(--border-subtle)` everywhere except `.featured` cards which use `var(--border-default)`. Foreground scale `var(--foreground)` (headings, card titles) / `var(--foreground-muted)` (paragraphs) / `var(--foreground-subtle)` (eyebrows, meta, dt, page-foot text).
>
> **Brand restraint (document-wide):** exactly one `.brand-dot` (cover wordmark only). Exactly two `.brand-word` instances (cover title + back-cover H2). Featured number per page (executive summary + findings each have one `.featured` card with brand-tinted number). Brand mono ordinal markers on TOC (6), recommendations (3), references (4) — README rule #7. Brand eyebrow only on `.callout .l` (max 2 callouts per document). Section opener `.chap-num` is brand mono. `.exec-tldr` has a brand-rail `border-left`. Three `--gradient-hero-veil` instances total: cover + section opener + back cover. Never more.
>
> **Numerics:** big metrics on executive summary use `.exec-card .num` (44 px sans, weight 600, tabular-nums); featured tints brand. Big findings use canonical `.stat-num.stat-num-lg` (68 px); featured tints brand. Ordinal markers (`01`, `[1]`, etc.) use `.mono` with `var(--brand)`. Inline data (page numbers, IDs, dates, addresses, phone numbers, URLs, version strings) use `.mono` with `var(--foreground-subtle)`. Body-prose numerics stay sans inherited.
>
> **References page (page 11):** do NOT use the TOC `.toc-item` grid — its 60 px right column clips URLs. Use `.refs-list` / `.ref-item` (2-col `[56px] [1fr]` with URL on a sub-line via `.src` having `word-break: break-all`).
>
> **Copy budgets:** cover title 4–8 words; section leads ≤ 35 words; body paragraphs ≤ 60 words; finding descriptions ≤ 20 words; recommendation titles 6–10 words ending with period; figure captions ≤ 14 words. Sentence case in all chrome. Oxford comma. Em-dashes with surrounding spaces. En-dashes for ranges. Numerals always.
>
> **Print:** the kit ships its own `@media print` rule that emits one letter page per `.page` with no margin negotiation. Do not modify it.
>
> When unsure, prefer restraint and consult the per-page spec table in this README (§ 8).

---

*This file is the source of truth for the report-document kit. The HTML mirrors it; if they disagree, fix this file first, then the HTML.*

*See [`AUTHORING.md`](../../AUTHORING.md) for the system-wide contract. The deck version of this same report lives in [`../report-presentation/`](../report-presentation/).*

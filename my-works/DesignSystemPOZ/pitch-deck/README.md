# Pitch deck kit — Point One Zero

> **Format:** 1920 × 1080 (16:9) · **Slides:** 12 templates · **Output:** investor / sales deck
>
> **Purpose:** Hero-style sales deck. One claim per slide, big numbers, future-tense voice. Built on `deck-stage.js`.

Exhaustive spec. Read [`AUTHORING.md`](../../AUTHORING.md) first; the sibling `../report-presentation/` is denser per-slide if you want a stakeholder report instead.

---

## Table of contents

1. [Quick reference](#1-quick-reference)
2. [Files](#2-files)
3. [Slide geometry](#3-slide-geometry)
4. [Universal chrome](#4-universal-chrome)
5. [Type system (kit-scale)](#5-type-system-kit-scale)
6. [Color tokens](#6-color-tokens)
7. [Numeric vocabulary](#7-numeric-vocabulary)
8. [Slide-by-slide spec](#8-slide-by-slide-spec)
9. [Brand restraint (per-slide exception)](#9-brand-restraint-per-slide-exception)
10. [Copywriting budgets](#10-copywriting-budgets)
11. [Common mistakes](#11-common-mistakes)
12. [Full agent prompt](#12-full-agent-prompt)

---

## 1 · Quick reference

| Property | Value |
|---|---|
| Canvas | 1920 × 1080 |
| Body bg | `var(--color-primary)` (#0a0a0a dark stage) |
| Slide bg | `var(--canvas)` via `--slide-bg` |
| Slide padding | `120px 160px` (`.slide-pad`) |
| Foot rail position | `bottom: 64px; left/right: 160px` |

---

## 2 · Files

```
ui_kits/pitch-deck/
├── README.md
├── index.html       (the 12 slides)
└── deck-stage.js    (shared with report-presentation)
```

```html
<link rel="stylesheet" href="../../colors_and_type.css" />
<script src="deck-stage.js"></script>
```

---

## 3 · Slide geometry

```
┌──────────────────────────────────────┐  ← 1920 × 1080
│   .slide-pad   (padding 120 160)     │
│       eyebrow-lg + .brand-dot        │
│       title-xl (156 px)              │
│       lead-lg (36 px)                │
│                                      │
│   .slide-foot (mono wm + page#)      │  ← absolute bottom 64, left/right 160
└──────────────────────────────────────┘
```

---

## 4 · Universal chrome

### Slide foot (`.slide-foot`)

```html
<div class="slide-foot">
  <span class="wm">point one zero.</span>
  <span class="pg">02 / 12</span>
</div>
```

| Element | Spec |
|---|---|
| Container | `position: absolute; left/right: 160px; bottom: 64px; display: flex; justify-content: space-between; font: var(--font-mono-md); color: var(--foreground-subtle)` |
| `.wm` | `font: var(--font-body-sm); font-weight: var(--weight-medium); color: var(--foreground)` |
| `.pg` | tabular-nums |

---

## 5 · Type system (kit-scale)

| Class | Size/Line | Weight | Track | Where |
|---|---|---|---|---|
| Cover wordmark | 280 px / 0.9 | 600 | -14 px | Cover only |
| `.title-xl` | 156 / 150 | 600 | -7 px | Most slide headlines |
| `.title-lg` | 120 / 118 | 600 | -5.4 px | Smaller slide titles |
| `.title-md` | 88 / 88 | 600 | -3.6 px | Sub-section titles |
| `.lead-lg` | 36 / 47 | 400 | — | Lead under title |
| `.eyebrow-lg` | 22 px | 510 | `0.031em` | Every slide eyebrow — **NOT 0.08em** |
| `.metrics-4 .m .n` | 132 px / 0.9 | 600 | -5 px | 4-up metric stat |
| `.metrics-4 .m .n small` | 40 px | 600 | -1.4 px | Stat unit suffix |
| `.tiers-3 .t .price` | 88 px | 600 | tabular-nums | Pricing tier price |

**Hard rule:** Eyebrow tracking is `0.031em` (~+3% of size). This was the v0.6.2 fix; do not regress to `0.08em`.

---

## 6 · Color tokens

| Token | Used by |
|---|---|
| `--color-primary` | Body bg (dark gallery for light slides) |
| `--canvas` | Every slide bg |
| `--surface-1` | Default metric / case / tier card |
| `--surface-2` | `.featured` lift only (one per slide, max) |
| `--brand` | One `.brand-dot` per slide · one `.brand-word` per slide · `.metrics-4 .m.featured .n` brand-tinted number · `.tiers-3 .t.featured .price` brand-tinted price |
| `--surface-4` | Closing-slide CTA pill bg (`background: var(--surface-4); color: var(--foreground)`) |
| `--gradient-hero-veil` | Title slide + closing slide; deck-scope per-slide allowance lets each opener slide use it |
| `--gradient-card-featured` | Featured cards |

---

## 7 · Numeric vocabulary

| Pattern | Class | Font | Size | Color |
|---|---|---|---|---|
| 4-up metric stat | `.metrics-4 .m .n` | sans 600 tabular-nums | 132 px (-5 px track) | `--foreground`, `.featured .n` → `--brand` |
| Pricing tier price | `.tiers-3 .t .price` | sans 600 tabular-nums | 88 px | `--foreground`, `.featured .price` → `--brand` |
| Slide page indicator | `.slide-foot .pg` | mono | tabular-nums | `--foreground-subtle` |
| Chapter / section number | mono 18 px brand | mono 18 px | `--brand` | Reserved for chapter dividers |
| Closing-slide CTA pill | sans 22 px weight 510 | — | `--foreground` | On `--surface-4` |

---

## 8 · Slide-by-slide spec

Standard structure: each slide is `<section class="s-VARIANT" data-screen-label="NN Name">` with the `.slide-pad` body. Use the `.slide-veil` `--gradient-hero-veil` only on cover and closing.

### Slide list (typical 12-slide deck)

| # | Class | Purpose |
|---|---|---|
| 01 | `.s-title` | Title — 280 px wordmark, brand-dot in mark, eyebrow-lg, tagline |
| 02 | (default) | Problem — display-xl statement, 1 brand-word |
| 03 | (default) | The frame — POINT/ONE/ZERO three-up pillars |
| 04 | (default) | Outcomes — 4-up `.metrics-4` with ONE `.featured` brand-tinted |
| 05 | (default) | POINT detail — display-lg headline + sub-bullets |
| 06 | (default) | ONE detail — same pattern |
| 07 | (default) | ZERO detail — same pattern |
| 08 | (default) | Services — 3-up service cards |
| 09 | (default) | Process — 4-up step cards |
| 10 | (default) | Case study — `.case .results` 3-up with one `.featured` |
| 11 | (default) | Engagements / tiers — `.tiers-3` 3-up with middle `.featured` |
| 12 | `.s-close` | Closing — display-lg, contact KV, CTA pill (`--surface-4`) |

### Title slide (slide 01)

```html
<section class="s-title" data-screen-label="01 Title">
  <div class="slide-veil"></div>
  <div class="slide-pad center">
    <div class="eyebrow-lg"><span class="brand-dot"></span>Investor deck · v0.4.0 · 2026</div>
    <div class="wordmark" style="margin-top: 48px;">point one zero<span class="dot">.</span></div>
    <div class="tagline">An AI-native firm at the intersection of strategy, design, and engineering.</div>
  </div>
</section>
```

| Slot | Spec |
|---|---|
| `.slide-pad.center` | `justify-content: center; align-items: center; text-align: center` |
| `.eyebrow-lg .brand-dot` | 9 × 9 px, brand-glow |
| `.wordmark` | 280 px sans 600 track -14 px, `.dot` → `--brand` |
| `.tagline` | 36 px, `--foreground-muted` |

### Outcomes 4-up (slide 04)

```html
<div class="metrics-4">
  <div class="m"><div class="n">17<small>hrs</small></div><div class="meta">…</div></div>
  <div class="m"><div class="n">10<small>×</small></div><div class="meta">…</div></div>
  <div class="m featured"><div class="n">47<small>%</small></div><div class="meta">…</div></div>
  <div class="m"><div class="n">92<small>+</small></div><div class="meta">…</div></div>
</div>
```

| Element | Spec |
|---|---|
| `.metrics-4` | 4 cols, gap 24 |
| `.m` | `--surface-1`, radius-lg, padding 36 32, flex column |
| `.m.featured` | `--surface-2`, `--border-default`, ::before is `--gradient-card-featured` |
| `.n` | 132 px sans 600 tabular-nums, track -5; `.featured .n` → `--brand` |
| `.n small` | 40 px, `--foreground-subtle`, track -1.4 px |
| `.meta .label` | eyebrow 18 px, track `0.08em`… **WAIT — should be `0.031em` after v0.6.2 fix** |
| `.meta .desc` | 20 px, `--foreground-muted`, line-height 1.35 |

### Tier 3-up (slide 11)

```html
<div class="tiers-3">
  <div class="t">…</div>
  <div class="t featured">…</div>
  <div class="t">…</div>
</div>
```

Same featured pattern: middle tier lifts to `--surface-2`, price tints to `--brand`.

### Closing slide (slide 12, `.s-close`)

```html
<section class="s-close" data-screen-label="12 Close">
  <div class="close">
    <div class="left">…display-lg headline with brand-word…</div>
    <div class="right">
      <dl>…contact KV…</dl>
      <div class="cta-row">
        <span class="pill">Let's talk · pointonezero.com</span>
      </div>
    </div>
  </div>
</section>
```

`.pill` is `--surface-4` bg, `--foreground` text, radius-full, padding 18 32, size 22 px weight 510. The 4-color v0.6.1 fix.

---

## 9 · Brand restraint (per-slide exception)

This kit uses **per-slide** restraint, NOT per-deck. Each `<section>` is the surface a viewer sees.

| Per slide | Limit |
|---|---|
| `.brand-dot` | 1 max |
| `.brand-word` | 1 max |
| `.featured` card | 1 max (in `.metrics-4`, `.tiers-3`, or `.case .results`) |

Across 12 slides, the deck typically carries 8–12 brand-dots, 7–10 brand-words, multiple featured cards. This is the deck-scope exception named in README § Two narrow exceptions.

---

## 10 · Copywriting budgets

| Slot | Limit |
|---|---|
| Title slide tagline | ≤ 16 words |
| Slide eyebrow | ≤ 6 words UPPER |
| Slide title | ≤ 8 words |
| Slide lead | ≤ 24 words |
| 4-up metric label | ≤ 5 words UPPER |
| 4-up metric description | ≤ 14 words |
| Tier title | 1–2 words (`Sprint`, `Build`, `Run`) |
| Tier subtitle | 8–14 words |
| Closing slide headline | 4–8 words, ONE brand-word |
| Closing CTA pill | "Let's talk · domain" mono format |

---

## 11 · Common mistakes (and the fixes)

| Mistake | Fix |
|---|---|
| Eyebrow `letter-spacing: 0.08em` | `0.031em` — v0.6.2 fix |
| Two brand-dots on one slide | One per slide max |
| Two brand-words on one slide | One per slide max |
| Multiple featured cards in one row | One `.featured` per row max |
| Hardcoded `#050506` for body bg | `var(--color-primary)` — v0.6.1 fix |
| Hardcoded `#e5e5e6` for CTA pill | `var(--surface-4)` — v0.6.1 fix |
| Forgetting `data-screen-label` | Required for comment context |
| Title slide without `.brand-dot` in eyebrow | Title slide is the brand showcase — include the dot |
| Brand fill on featured tier | Surface-2 lift; only the *price* is brand |
| Brand color on POINT/ONE/ZERO pillar words | Foreground only; the manifesto is type, not color |

---

## 12 · Full agent prompt

> You are producing a Point One Zero **investor / sales pitch deck** — 1920 × 1080, 12 slides. **Load `../../colors_and_type.css` and `deck-stage.js` (local to this folder).** Body bg `var(--color-primary)` (dark gallery); slides `var(--canvas)` (light) via `--slide-bg`.
>
> **Slide order:** title (`.s-title` with 280 px wordmark + brand-dot eyebrow) · problem (display-xl statement) · the frame (POINT/ONE/ZERO pillars) · outcomes (`.metrics-4` 4-up, ONE featured brand-tinted) · POINT/ONE/ZERO detail (slides 05–07) · services (3-up) · process (4-up steps) · case study (`.case .results`) · engagements (`.tiers-3` with middle featured) · closing (`.s-close` with `--surface-4` CTA pill).
>
> **Type:** `.title-xl` 156 px on most slides. `.title-lg` 120 px for sub-titles. `.lead-lg` 36 px. `.eyebrow-lg` 22 px **at `letter-spacing: 0.031em`** — NEVER 0.08em. 4-up stat `.n` 132 px sans tabular-nums. Tier price 88 px sans tabular-nums. All tracking ratios match main system (+3% on eyebrows, ~-3.8% on display).
>
> **Brand restraint is PER-SLIDE** (the deck-scope exception). One `.brand-dot` per slide. One `.brand-word` per slide. One `.featured` card per multi-card row. Across 12 slides you'll have ~8–12 brand-dots total — that's correct.
>
> **Numerics:** 4-up metric `.n` and tier `.price` are sans tabular-nums 600. Page indicator `.pg` is mono tabular-nums. CTA URL on closing slide is mono.
>
> **Copy:** confident, future-tense, one claim per slide. Title ≤ 8 words; lead ≤ 24 words; metric label ≤ 5 UPPER; metric description ≤ 14 words.
>
> When in doubt: pitch deck is **sell**, not inform. Use the sibling report-presentation kit if you need denser per-slide content.

---

*See [`AUTHORING.md`](../../AUTHORING.md) for the system-wide contract.*

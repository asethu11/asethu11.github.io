# Social kit — Point One Zero

> **Format:** every social ratio (carousels 1080×1350, OG share 1200×630, IG square 1080×1080, IG story 1080×1920, banner 1500×500) · **Output:** static images for in-feed publication
>
> **Purpose:** Two demonstrated subsystems — the **SM carousel system** (1080 × 1350, eight variant slides) and the **general social templates** (every other ratio).

Exhaustive spec. Read [`AUTHORING.md`](../../AUTHORING.md) first.

---

## Table of contents

1. [Quick reference](#1-quick-reference)
2. [Files & how to load](#2-files--how-to-load)
3. [Carousel subsystem geometry](#3-carousel-subsystem-geometry)
4. [Universal carousel chrome](#4-universal-carousel-chrome)
5. [Type system](#5-type-system) — the `--c-*` scale
6. [Color tokens](#6-color-tokens) — including paper-canvas tokens
7. [Numeric vocabulary](#7-numeric-vocabulary)
8. [Eight carousel slide variants](#8-eight-carousel-slide-variants)
9. [General social templates](#9-general-social-templates) — OG, square, story, banner
10. [Brand restraint](#10-brand-restraint)
11. [Copywriting budgets](#11-copywriting-budgets)
12. [Common mistakes](#12-common-mistakes)
13. [Full agent prompt](#13-full-agent-prompt)

---

## 1 · Quick reference

| Subsystem | Format | File |
|---|---|---|
| SM carousels | 1080 × 1350 portrait | `carousels.html` + `carousel-templates.jsx` + `carousel-system.css` |
| General social | mixed ratios | `index.html` + `templates.jsx` |
| Shared | design canvas wrapper | `design-canvas.jsx` |

### Carousel canvas tokens (subsystem-only)

| Token | Value | Use |
|---|---|---|
| `--c-canvas` | `#fcfbf8` | Warm paper baseline (NOT system `--canvas` white) |
| `--c-canvas-top` | `#fdfcfa` | Slightly warmer near top |
| `--c-canvas-bot` | `#faf9f5` | Slightly cooler near bottom |
| `--c-paper` | gradient | warm→cool vertical canvas wash (always on) |
| `--c-veil` | gradient | atmospheric blue radial at top-right |
| `--c-foot-rule` | gradient | fading hairline at footer separator |
| `--c-stat-grad` | linear `#009FEF → #007FBF` | featured-stat brand→brand-700 text gradient |

These are documented exceptions to the system's `#ffffff` canvas — phone-feed warmth.

---

## 2 · Files & how to load

```
ui_kits/social/
├── README.md                  (this file)
├── carousel-system.css        (subsystem tokens + variants)
├── carousel-templates.jsx     (8 slide React components)
├── carousels.html             (carousel demo on a design canvas)
├── templates.jsx              (general social templates)
├── index.html                 (general social demo on a design canvas)
└── design-canvas.jsx          (shared canvas wrapper)
```

### Carousel demo

```html
<link rel="stylesheet" href="../../colors_and_type.css" />
<link rel="stylesheet" href="carousel-system.css" />
<script src="…react…umd…"></script>
<script src="…react-dom…umd…"></script>
<script src="…babel-standalone…"></script>
<script type="text/babel" src="design-canvas.jsx"></script>
<script type="text/babel" src="carousel-templates.jsx"></script>
```

Body wraps slides in `<DesignCanvas><DCSection><DCArtboard width={1080} height={1350}><CoverSlide … /></DCArtboard></DCSection></DesignCanvas>`.

### General social demo

```html
<script type="text/babel" src="design-canvas.jsx"></script>
<script type="text/babel" src="templates.jsx"></script>
```

Same canvas wrapper; templates emit OG / square / story / banner.

---

## 3 · Carousel subsystem geometry

```
┌──────────────────────────────────┐  ← 1080 × 1350 (.car-frame)
│  .car-top      (eyebrow ◀  ▶ ref) │  ← padding 80 96 0
│                                  │
│  .car-body     content           │  ← padding 88 96 0
│                                  │
│                                  │
│  .car-foot     (wm ◀  ▶ page)    │  ← absolute, bottom 76, left/right 96
└──────────────────────────────────┘
```

### Layout tokens

| Token | Value |
|---|---|
| `--c-pad-x` | `96px` (left + right gutters) |
| `--c-pad-top` | `80px` (top gutter for the top rail) |
| `--c-pad-bot` | `76px` (bottom gutter for the foot) |
| `--c-content-max` | `880px` (lead body max-width) |
| `--c-rule-accent-w` | `96px` (brand accent rule under DEFINITION word) |

---

## 4 · Universal carousel chrome

Slides have **no top strip**. Each variant opens directly into its body content; the foot is the only persistent chrome and ships in three configurations.

### 4.1 · Foot — three variants

```html
<!-- STANDARD (chapter, definition, stat, quote, editorial, twocol) -->
<footer class="car-foot car-foot-std">
  <div class="car-foot-rule"></div>
  <div class="car-foot-row">
    <span class="car-wordmark">point one zero</span>
    <span class="car-page">02 <span class="sep">/</span> 06</span>
  </div>
</footer>

<!-- COVER — page indicator only, larger, right-aligned. No hairline. -->
<footer class="car-foot car-foot-cover">
  <div class="car-foot-row">
    <span class="car-page">01 <span class="sep">/</span> 06</span>
  </div>
</footer>

<!-- CTA — wordmark + URL replaces page indicator. -->
<footer class="car-foot car-foot-cta">
  <div class="car-foot-rule"></div>
  <div class="car-foot-row">
    <span class="car-wordmark">point one zero</span>
    <span class="car-foot-url">pointonezero.com</span>
  </div>
</footer>
```

| Element | Spec |
|---|---|
| Container | `position: absolute; left/right: 96px; bottom: 76px` |
| `.car-foot-rule` | height 1 px, `--c-foot-rule` (fading hairline), margin-bottom 30. Hidden on cover. |
| `.car-foot-row` | flex space-between, align-items baseline. Cover variant is right-aligned. |
| `.car-wordmark` | size 32 px, weight 510, `--c-fg`, letter-spacing -0.4 px |
| `.car-page` | font-mono 30 px, letter-spacing 0.06em, `--c-fg-subtle`, tabular-nums. Cover variant: 40 px, `--c-fg`. |
| `.car-foot-url` (CTA only) | font-mono 30 px, letter-spacing 0.02em, `--c-fg-subtle` |
| `.sep` | `--c-fg-faint`, padding 0 8 |

---

## 5 · Type system

### Subsystem-specific scale (`--c-*` tokens)

| Token | Value | Use |
|---|---|---|
| `--c-display-lg` | 124 px | Cover headline |
| `--c-display-md` | 88 px | Chapter, CTA headline |
| `--c-display-sm` | 64 px | Stat label, editorial body, col label |
| `--c-word` | 220 px | Definition word |
| `--c-stat` | 380 px | Stat numeric |
| `--c-stat-suf` | 96 px | Stat unit suffix |
| `--c-lead` | 44 px | Lead under headline, definition line |
| `--c-body` | 40 px | Paragraph body (phone-feed comfortable at 14.4 px scaled) |
| `--c-body-sm` | 32 px | Footnote, source line |
| `--c-wordmark` | 32 px | Footer wordmark |
| `--c-page` | 30 px | Footer page indicator |

**Phone-feed rationale:** slide pixels render at ~0.36× on a phone. The 40 px body scales to 14.4 px — a comfortable reading floor.

### Tracking ratios (memorize)

- Eyebrow: `0.031em` = +3% of size
- Display: between `-3.5%` and `-4.5%` of size depending on size
- Body: `-0.4 px` to `-0.5%` of size (tight but not aggressive)

---

## 6 · Color tokens

### Subsystem canvas

| Token | Value | Use |
|---|---|---|
| `--c-canvas` | `#fcfbf8` | Warm paper baseline |
| `--c-canvas-top` | `#fdfcfa` | top wash anchor |
| `--c-canvas-bot` | `#faf9f5` | bottom wash anchor |
| `--c-fg` | `#0a0a0a` | display + body foreground |
| `--c-fg-muted` | `#3f3f46` | paragraph body |
| `--c-fg-subtle` | `#71717a` | eyebrow, mark, page indicator |
| `--c-fg-faint` | `#a1a1aa` | footer separator dot |
| `--c-rule` | `rgba(0,0,0,0.08)` | hairline |
| `--c-rule-strong` | `rgba(0,0,0,0.16)` | foot rule |

### Inherited brand

`var(--brand)` is used on: cover eyebrow brand-dot, brand-word in cover headline, chapter mono number, definition accent rule, featured-stat text gradient, footer wordmark dot.

### Gradients (subsystem-allowed)

`--c-paper` (canvas wash) · `--c-veil` (atmospheric blue at top-right) · `--c-foot-rule` (fading hairline) · `--c-stat-grad` (featured-stat text gradient).

The system's main rule "no brand-fill backgrounds" stands; these subsystem gradients are explicitly named exceptions.

---

## 7 · Numeric vocabulary

| Pattern | Class | Font | Size | Color |
|---|---|---|---|---|
| Stat value | `.car-stat-val` | Inter sans 600 | 380 px, track -18 px | `--c-fg`, `.is-featured` → `--c-stat-grad` text gradient |
| Stat suffix | `.car-stat-suf` | Inter sans 600 | 96 px, track -2 px | `--c-fg-subtle` |
| Chapter number | `.car-chapter-num` | mono | 60 px | `--brand` |
| Page indicator | `.car-page` | mono | 30 px | `--c-fg-subtle` |
| Reference mark | `.car-mark` | mono | 28 px | `--c-fg-subtle` |
| Footnote / source | `.car-footnote` | mono | 32 px | `--c-fg-subtle` |

**Hard rule:** stat numbers are sans (statement). Page numbers, chapter numbers, references, footnotes are mono (data).

---

## 8 · Eight carousel slide variants

Each carousel slide is `<div class="car-frame car-VARIANT">` containing `.car-top`, optional `.car-body`, and `.car-foot`.

### 8.1 · Cover (`.car-cover`)

Hero block anchored to lower-middle. Brand-dot in eyebrow. ONE brand-word in headline.

```html
<div class="car-frame car-cover">
  <div class="car-top">…brand-dot eyebrow + Vol. 01 mark…</div>
  <div class="car-body">
    <h1 class="car-display car-display-lg">Headline with <span class="brand-word">brand-word</span>.</h1>
    <p class="car-lead">Subhead.</p>
  </div>
  <div class="car-foot">…</div>
</div>
```

Body `padding-bottom: 280px` for the hero block to anchor near bottom.

### 8.2 · Chapter (`.car-chapter`)

Centered divider. Mono brand chapter number + display headline.

```html
<div class="car-chapter-num">CH. 01</div>
<h2 class="car-display car-display-md">Chapter title.</h2>
```

### 8.3 · Definition (`.car-definition`)

Big WORD (220 px) + brand accent rule + definition line + body + mono footnote.

```html
<h2 class="car-word">POINT</h2>
<div class="car-rule-accent"></div>
<p class="car-def-defn">The intersection where strategy, design, and AI meet.</p>
<p class="car-body-text">Body context.</p>
<p class="car-footnote">SOURCE · CITATION · 2026</p>
```

### 8.4 · Stat (`.car-stat`)

380 px number stack with optional suffix; below: 64 px label, body, mono source.

```html
<span class="car-eyebrow">Eyebrow</span>
<div class="car-stat-num is-featured">
  <span class="car-stat-val">47</span>
  <span class="car-stat-suf">%</span>
</div>
<h3 class="car-stat-label">Headline finding.</h3>
<p class="car-body-text">Body.</p>
<p class="car-footnote">SOURCE</p>
```

**`is-featured`** applies the brand→brand-700 text gradient. ONE featured stat per carousel.

### 8.5 · Quote (`.car-quote`)

72 px pull quote with brand-blue opening glyph; attribution below with name + mono source.

```html
<p class="car-quote-text"><span class="car-quote-mark">"</span>The quote text.</p>
<div class="car-quote-attr">
  <span class="car-quote-name">Maya Lindgren</span>
  <span class="car-quote-source">Partner · Point One Zero</span>
</div>
```

### 8.6 · Editorial (`.car-editorial`)

64 px body with 240 px brand drop-cap on the first letter. Restrained: 4–6 sentences.

### 8.7 · Two-column (`.car-twocol`)

`grid-template-columns: 1fr 1px 1fr; gap: 56px`. Each column has a 64 px label + 40 px body. Vertical hairline divider in the center.

### 8.8 · CTA (`.car-cta`)

Display-md headline + 96 px pill-shaped button mark + mono URL.

```html
<h2 class="car-display car-display-md">Tell us about the <span class="brand-word">problem</span>.</h2>
<div class="car-cta-row">
  <span class="car-cta-btn">Let's talk</span>
  <span class="car-cta-url">pointonezero.com</span>
</div>
```

The CTA button is an EDITORIAL MARK, not a real button — it's a 96 px pill with the embossed primary-button shadow stack.

---

## 9 · General social templates

| Format | Dimensions | Use |
|---|---|---|
| OG share | 1200 × 630 | Twitter/LinkedIn share card |
| IG square | 1080 × 1080 | Feed post |
| IG story / Reel | 1080 × 1920 | Vertical |
| LinkedIn banner | 1500 × 500 | Profile banner |

Each template uses the system's main tokens (NOT the `--c-*` carousel tokens). Canvas is `var(--canvas)` white. Type uses display-md / display-lg per format. ONE brand-dot per surface (the wordmark or the eyebrow, not both).

See `templates.jsx` for the exact component props. Each emits a `<DCArtboard width={W} height={H}>` for the design canvas.

---

## 10 · Brand restraint

### Per carousel (across all slides)

| Where | Count |
|---|---|
| `.brand-dot` on Cover eyebrow | **1** (Cover ONLY) |
| `.brand-word` on Cover headline | **1** |
| `.car-chapter-num` brand mono | per chapter slide |
| `.car-rule-accent` brand-to-transparent rule | per Definition slide |
| `.is-featured` stat gradient | **1** stat slide per carousel |
| `.car-quote-mark` brand glyph | per Quote slide |
| Editorial drop-cap brand | per Editorial slide |

### Per social template (general)

ONE brand-dot per surface. ONE brand-word per surface if applicable.

---

## 11 · Copywriting budgets

| Slot | Limit |
|---|---|
| Cover headline (`.car-display-lg`) | ≤ 12 words |
| Cover lead | ≤ 30 words |
| Chapter title | ≤ 6 words |
| Definition word | 1 word UPPER |
| Definition line | ≤ 16 words |
| Definition body | 2 sentences max, ≤ 40 words |
| Stat label | ≤ 14 words |
| Stat body | ≤ 30 words |
| Quote | ≤ 30 words |
| Quote attribution | name · role · org on separate lines |
| Editorial slide | 4–6 sentences, ≤ 120 words |
| Two-col label | ≤ 4 words each |
| Two-col body | 2–3 sentences per column |
| CTA headline | ≤ 8 words, ONE brand-word |
| CTA URL | bare domain, mono |
| Footnote / mono source | ≤ 14 words, UPPER, mono |

---

## 12 · Common mistakes (and the fixes)

| Mistake | Fix |
|---|---|
| Eyebrow tracking `0.16em` | `0.031em` (~+3% of size). Same rule as main system. |
| Multiple `.brand-dot` per carousel | Cover only |
| Multiple `.brand-word` per carousel | Cover only |
| Multiple featured stats | One `.is-featured` per carousel |
| Filling carousel canvas with `#ffffff` | Subsystem uses warm `--c-canvas` (`#fcfbf8`) by design |
| Hardcoded `#009FEF` in templates.jsx | Use `var(--brand)` (subsystem inherits from root) |
| Using sans for chapter number | Chapter numbers are mono (data) |
| Sans for page indicator | Page indicator is mono tabular-nums |
| Adding a fourth gradient | Only `--c-paper` / `--c-veil` / `--c-foot-rule` / `--c-stat-grad` plus the definition rule are allowed |
| Eyebrow brand-dot on chapter / stat / quote slides | Cover only |
| Forgetting `.car-foot-rule` fading hairline | Footer separator is the design — don't drop it |
| Mixing carousel tokens (`--c-*`) into general social templates | General templates use main system tokens; carousels are scoped |

---

## 13 · Full agent prompt

> You are producing Point One Zero **social media graphics**. Two subsystems exist; pick the right one.
>
> **For a 1080 × 1350 carousel:** load `../../colors_and_type.css` AND `carousel-system.css`. Each slide is `<div class="car-frame car-VARIANT">` with one of eight variants: Cover · Chapter · Definition · Stat · Quote · Editorial · TwoCol · CTA. Chrome: `.car-top` (eyebrow ◀ ▶ mono reference mark), `.car-foot` (fading rule + wordmark ◀ ▶ mono page indicator). Carousel canvas is `--c-canvas` (`#fcfbf8`, warm paper — NOT system white). Subsystem type uses `--c-*` tokens (body 40 px so it scales to 14.4 px on phone). Eyebrow tracks at `0.031em` (~+3%). NEVER `0.16em`.
>
> **Carousel brand restraint:** ONE `.brand-dot` on Cover eyebrow ONLY. ONE `.brand-word` on Cover headline ONLY. ONE `.is-featured` stat per carousel (brand-to-brand-700 text gradient). Chapter slides get a brand-mono chapter number. Definition slides get a brand-to-transparent 96 px accent rule. Quote slides get a brand `.car-quote-mark` glyph. Editorial slides get a brand drop-cap.
>
> **For a 1200 × 630 OG, 1080 × 1080 square, 1080 × 1920 story, or 1500 × 500 banner:** load `../../colors_and_type.css` only (NOT carousel-system.css). Use main system tokens: `var(--canvas)` (#ffffff), display-lg or display-md for headlines, eyebrow 13 px with +0.4 px track. ONE brand-dot per surface. ONE brand-word per surface if applicable.
>
> **Numerics:** stat values are sans 380 px (carousel) or `.stat-num-*` (general). Chapter numbers, page indicators, references, footnotes are MONO. Mono is "data, not statement". Don't put sans on a page indicator; don't put mono on a stat value.
>
> **Copy:** carousel cover ≤ 12 words; chapter title ≤ 6; definition word is 1 UPPER; stat label ≤ 14; quote ≤ 30; editorial 4–6 sentences ≤ 120 words. Sentence case bodies. Mono UPPER for footnotes / sources.
>
> Phone-feed first: read every slide at thumbnail scale before publishing.

---

*The carousel system, the templates, and this README must move together. If the markup changes, update this file; if this file is updated, audit the markup. See [`AUTHORING.md`](../../AUTHORING.md) for the system-wide contract.*

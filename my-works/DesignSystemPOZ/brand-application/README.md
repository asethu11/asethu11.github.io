# Brand application kit — Point One Zero

> **Format:** Responsive web page with 4 demonstrated surfaces · **Theme:** dark stage with light-themed showcase pieces · **Output:** print-ready demos
>
> **Purpose:** The brand off-screen. Business card (front + back, dark + light stock variants), email signature mock, desktop wallpaper.

Exhaustive spec. Read [`AUTHORING.md`](../../AUTHORING.md) first.

---

## Table of contents

1. [Quick reference](#1-quick-reference)
2. [Files](#2-files)
3. [Page geometry & themed scoping](#3-page-geometry--themed-scoping)
4. [Universal chrome](#4-universal-chrome)
5. [Type system](#5-type-system)
6. [Color tokens](#6-color-tokens)
7. [Numeric vocabulary](#7-numeric-vocabulary)
8. [Demonstrated surfaces](#8-demonstrated-surfaces)
9. [Brand restraint (per-surface exception)](#9-brand-restraint-per-surface-exception)
10. [Copywriting budgets](#10-copywriting-budgets)
11. [Common mistakes](#11-common-mistakes)
12. [Full agent prompt](#12-full-agent-prompt)

---

## 1 · Quick reference

| Property | Value |
|---|---|
| Container | `--container-max` 1280 px |
| Page theme | `<html data-theme="dark">` (dark stage) |
| Showcase scope | each demo wrapped `data-theme="light"` (light tokens inside dark page) |
| Body bg | `var(--canvas)` (resolves to dark via html attr) |
| Demonstrated surfaces | 6 (2 business cards × 2 stock variants + email mock + wallpaper) |

**v0.6.2 nested-theme fix:** `colors_and_type.css` now defines `:root, [data-theme="light"]` so a child `data-theme="light"` scope inside an `<html data-theme="dark">` page correctly resolves to light tokens.

---

## 2 · Files

```
ui_kits/brand-application/
├── README.md
└── index.html
```

```html
<html lang="en" data-theme="dark">
<link rel="stylesheet" href="../../colors_and_type.css" />
```

---

## 3 · Page geometry & themed scoping

```
<html data-theme="dark">
  <body>               ← bg: var(--canvas) → resolves to dark #010102
    <nav>              ← dark chrome
    <main>
      <section> Business cards
        <figure data-theme="light">    ← cards resolve light tokens inside
          .biz-card                    ← bg surface-1 (white-ish)
        </figure>
        <figure data-theme="light">…</figure>
      </section>
      <section> Email signature
        <div class="sig-bench" data-theme="light">
          .sig-email                   ← bg canvas (white inside light scope)
            .signature                 ← HARDCODED hex (email-compat exception)
        </div>
      </section>
      <section> Wallpaper
        <div class="wallpaper-grid" data-theme="light">
          .wallpaper                   ← bg canvas (white)
        </div>
      </section>
    </main>
  </body>
</html>
```

---

## 4 · Universal chrome

Standard `.site-nav` (resolves dark via html data-theme). Standard footer pattern.

---

## 5 · Type system

| Class | Token | Where |
|---|---|---|
| H1 (hero) | `var(--font-display-lg)` (56) | Hero |
| Section-header H2 | `var(--font-display-md)` (40) | Each section |
| Wordmark on biz-card front | sans 40 px weight 600 track -1.8 | Front of card |
| Tagline on biz-card front | `var(--font-body-sm)` (14) | Under wordmark |
| Person name on biz-card back | sans 22 px weight 510 track -0.3 | Back of card |
| Person role | eyebrow 11 px UPPER track 0.08em | Under name |
| Contact KV | sans 14 px | Back of card |
| Contact mono | `font-mono` 13 px | Email, phone |
| Email signature | `font-family: 'Inter', system-ui, sans-serif` (email-compat) | `.signature` block ONLY |
| Wallpaper POINT/ONE/ZERO rows | sans 80 px weight 600 track -3.6 | Wallpaper text-only display |

---

## 6 · Color tokens

| Token | Used where |
|---|---|
| Page-level `--canvas` (dark) | Body bg |
| Page-level `--foreground` (off-white) | All chrome text |
| Per-figure `[data-theme="light"]` resolves: `--canvas` → #ffffff, `--surface-1` → #fafafa, `--foreground` → #0a0a0a | Card / sig / wallpaper interior tokens |
| `--brand` | Brand-dot on wordmark mark per surface · biz-card front wordmark `.dot` (×1 per card) · biz-card back `.brand-dot` (×1 per back) · email-sig brand-dot (hardcoded `#009FEF`) · link decoration |
| `--brand-soft` / `--brand-softer` | Biz-card veil + wallpaper veil |
| `--gradient-hero-veil` | Hero only |

### Documented email-compat exception

The `.signature` block in `.sig-email .body` uses hardcoded hex (`#0a0a0a`, `#71717a`, `#009FEF`, `#c4c4c7`) + hardcoded font stacks (`'Inter', system-ui, sans-serif` + `ui-monospace, 'SF Mono', Menlo, monospace`). Each line carries an inline comment naming its token equivalent. This is the ONE place in the entire system where hex hardcoding is allowed.

---

## 7 · Numeric vocabulary

| Pattern | Class | Font | Where |
|---|---|---|---|
| Biz-card phone / direct | `.mono` | mono 13 px | Back of card |
| Email-sig phone | hardcoded mono | mono (email-compat) | `.signature .sig-contact .mono` |
| Wallpaper POINT/ONE/ZERO sub-meta | `.mono` | mono 11 px `--foreground-subtle` | Each wallpaper row |
| Card meta version | `.meta` | mono 11 px | "v0.4.0 · pointonezero.com" |

---

## 8 · Demonstrated surfaces

### 8.1 · Business card (front)

```html
<figure class="card-stage" data-theme="light">
  <div class="biz-card biz-front">
    <div class="veil"></div>
    <div class="wordmark">point one zero<span class="dot">.</span></div>
    <div><div class="tagline">…</div></div>
  </div>
  <figcaption>Dark — front</figcaption>
</figure>
```

| Element | Spec |
|---|---|
| `.biz-card` | 700 × 400 (2× of 3.5 × 2 in @ 100dpi), radius-xl, `--canvas` bg (resolves light inside the figure), `--border-subtle`, `--shadow-lg` + `--edge-highlight` |
| `.veil` | radial gradient `var(--brand-soft) → transparent` at bottom-left |
| `.wordmark` | 40 px sans 600 track -1.8 |
| `.wordmark .dot` | `--brand` |
| `.tagline` | 14 px, `--foreground-muted` |

### 8.2 · Business card (back)

```html
<figure class="card-stage" data-theme="light">
  <div class="biz-card biz-back">
    <div class="veil"></div>
    <div class="mark"><span class="brand-dot"></span>Maya Lindgren</div>
    <dl class="contact">
      <dt>Role</dt><dd>Partner · Build practice</dd>
      <dt>E-mail</dt><dd class="mono">maya@pointonezero.com</dd>
      <dt>Direct</dt><dd class="mono">(678) 901-4322</dd>
      <dt>Address</dt><dd>25 Palmer Square, Princeton, NJ 08542</dd>
    </dl>
    <div class="meta">v0.4.0 · pointonezero.com</div>
  </div>
</figure>
```

| Element | Spec |
|---|---|
| `.mark` | inline-flex with `.brand-dot` (12 × 12 px, brand-glow) + name (sans 24 px weight 600 track -0.6) |
| `.contact` | grid 86 px / 1fr; `dt` UPPER eyebrow 10 px; `dd` body 14 px |
| `.contact dd.mono` | mono 13 px |
| `.meta` | mono 11 px UPPER 0.04em, `--foreground-subtle` |

### 8.3 · Business card (light stock variant)

Add `.biz-light` class to either front or back. Overrides:
- `background: var(--surface-1)` (off-white #fafafa for light card stock)
- `border: 1px solid var(--border-subtle)`
- `box-shadow: var(--shadow-lg), var(--edge-highlight)`
- `.veil` uses `var(--brand-softer)` (subtler)

Text inheritance through the `[data-theme="light"]` scope means no individual color overrides are needed (v0.6.1 fix removed 8 redundant overrides).

### 8.4 · Email signature

```html
<div class="sig-bench" data-theme="light">
  <div class="sig-email">
    <div class="head">From <span class="from">Maya Lindgren …</span></div>
    <div class="body">
      <p>Hi Sarah,</p>
      <p>…</p>
      <div class="signature">
        <div class="sig-name">Maya Lindgren</div>
        <div class="sig-role">Partner · Build practice</div>
        <div class="sig-divider">
          <span class="wordmark"><span class="brand-dot"></span>point one zero</span>
          <span class="sep">·</span>
          <span style="color: #71717a; font-size: 12px;">An AI-native firm</span>
        </div>
        <div class="sig-contact">
          <span class="mono">(678) 901-4322</span> · 
          <a href="https://pointonezero.com">pointonezero.com</a> · 
          25 Palmer Square, Princeton, NJ 08542
        </div>
      </div>
    </div>
  </div>
</div>
```

Email mock chrome (`.sig-email .head`, `.sig-email .body`) uses **tokens**. The inner `.signature` block uses **hardcoded hex** + **hardcoded font stacks** with comments naming each token equivalent (email-compat exception).

### 8.5 · Wallpaper

```html
<div class="wallpaper-grid" data-theme="light">
  <div class="wallpaper">
    <div class="veil"></div>
    <div class="top">
      <span class="wm">point one zero</span>
      <span class="pill">v0.4.0 · wallpaper</span>
    </div>
    <div class="stack">
      <div class="row">POINT <span class="sub">— strategy + design + AI</span></div>
      <div class="row">ONE <span class="sub">— the collective</span></div>
      <div class="row">ZERO <span class="sub">— zero-based, AI-native</span></div>
    </div>
  </div>
</div>
```

| Element | Spec |
|---|---|
| `.wallpaper` | 800 × 450 (5K/2 ratio), radius-lg, light canvas, `--shadow-lg` + `--edge-highlight` |
| `.veil` | two radial gradients: `var(--brand-soft)` at 30% 50% + `var(--brand-softer)` at 80% 100% |
| `.top .wm` | 14 px weight 510 |
| `.top .pill` | mono 11 px chip, `--border-subtle`, radius-full |
| `.stack .row` | 80 px sans 600 track -3.6, `--foreground` |
| `.sub` | mono 11 px, `--foreground-subtle`, `letter-spacing: 0` |

---

## 9 · Brand restraint (per-surface exception)

This kit uses the **per-surface** exception (README § Two narrow exceptions).

| Surface | `.brand-dot` count |
|---|---|
| Hero eyebrow | 1 |
| Biz-card dark front wordmark `.dot` | 1 |
| Biz-card dark back `.brand-dot` in `.mark` | 1 |
| Biz-card light front wordmark `.dot` | 1 |
| Biz-card light back `.brand-dot` in `.mark` | 1 |
| Email signature wordmark | 1 |
| Wallpaper | 0 (no `.brand-dot` — the brand wash carries the color) |

Each demonstrated surface gets ONE brand-dot. Across the page that's 6 instances — the per-surface exception named in README.

---

## 10 · Copywriting budgets

| Slot | Limit |
|---|---|
| Biz-card front tagline | ≤ 14 words |
| Biz-card back name | "First Last" |
| Biz-card back role | "Title · Practice" UPPER |
| Biz-card back contact value | ≤ 6 words; mono for email/phone/address |
| Biz-card meta | "vN.N.N · domain" mono |
| Email signature name | "First Last" |
| Email signature role | "Title · Practice" |
| Email signature firm | "An AI-native firm" |
| Email signature contact | phone · domain · address |
| Wallpaper row | "POINT / ONE / ZERO — short expansion" |
| Wallpaper pill | "vN.N.N · wallpaper" mono |

---

## 11 · Common mistakes (and the fixes)

| Mistake | Fix |
|---|---|
| Hardcoded `'Inter', system-ui, sans-serif` outside `.signature` | `var(--font-sans)` (only the `.signature` block is exempt — email-compat) |
| Hardcoded `#009FEF` outside `.signature` | `var(--brand)` |
| Body bg `#050506` (off-spec dark) | `var(--canvas)` with `<html data-theme="dark">` (v0.6.1/v0.6.2 fix) |
| `.biz-light` card not getting light tokens because parent is dark-themed | Scope each `.card-stage` / `.sig-bench` / `.wallpaper-grid` with `data-theme="light"` (v0.6.2 fix) |
| Adding `.biz-light` to BOTH front and back of the same card | Each card is one variant; produce two figures for the same person (dark front, dark back) and two more for the light stock variant |
| Multiple brand-dots on a single demonstrated surface | One per surface — per-surface exception is bounded |
| Wallpaper veil using a third radial | Two radials max (one upper-mid, one lower-right) |
| Email signature missing comments next to hardcoded hex | Comments are required for each hardcoded value so the next reader knows the token equivalent |

---

## 12 · Full agent prompt

> You are producing the Point One Zero **brand-application showcase** — a dark gallery page exhibiting printed-piece designs. **Set `<html lang="en" data-theme="dark">`** on the root. Body bg is `var(--canvas)` (resolves dark via the html attr). **Load `../../colors_and_type.css`**.
>
> **Inside-out theming:** wrap each printed-piece demo with `data-theme="light"` (`.card-stage`, `.sig-bench`, `.wallpaper-grid`) so the showcase pieces themselves resolve light tokens. v0.6.2 made `:root, [data-theme="light"]` the light selector so nested-theme scoping works.
>
> **Sections:** site-nav · hero (display-lg, ONE brand-dot in eyebrow) · business cards (4 figures: dark front, dark back, light front, light back) · email signature (mock Gmail UI with inner `.signature` block) · wallpaper · footer.
>
> **Per-surface brand-dot exception:** each demonstrated surface gets ONE `.brand-dot` on its wordmark/mark. Across the page that's 6 instances (hero + 4 cards + email sig) — bounded and documented in README § Two narrow exceptions. Wallpaper carries no `.brand-dot` (the brand-wash gradient is its accent).
>
> **The `.signature` block (inside `.sig-email .body`) is the ONE place hardcoded hex + hardcoded font stacks are allowed** — email clients don't support CSS variables. Every hardcoded value carries an inline comment naming its token equivalent: `#0a0a0a /* = --foreground */`, `font-family: 'Inter', system-ui, sans-serif /* email-compat */`, etc. Everything else (including the mock email chrome `.sig-email .head` and `.sig-email .body`) uses tokens.
>
> **Cards:** 700 × 400 (2× of 3.5 × 2 in @ 100dpi), radius-xl, `--canvas` bg inside light scope, `--shadow-lg` + `--edge-highlight`. Front: 40 px wordmark with `.dot` brand + 14 px tagline. Back: 12 px brand-dot in `.mark` + name (24 px sans 600 track -0.6) + 86px/1fr contact KV grid (10 px eyebrow `dt` + 14 px body `dd`, `.mono` for email/phone) + mono 11 px meta line. `.biz-light` overrides bg to `--surface-1` and veil to `--brand-softer`.
>
> **Wallpaper:** 800 × 450, dual radial veil (brand-soft 30/50, brand-softer 80/100), top row with wordmark + mono pill, stack with 3 rows of "WORD — expansion" at 80 px sans 600 track -3.6, mono sub-text on each row.
>
> **Numerics:** mono for email/phone/address/version everywhere. Body-prose numerics inherit.
>
> Sentence case copy. Mono for data. No brand color except where listed.

---

*The hardcoded-hex `.signature` block is the system's ONE documented exception. Don't extend the exception to any other element. See [`AUTHORING.md`](../../AUTHORING.md) for the system-wide contract.*

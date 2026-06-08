# Report deck template — spec

> **What this is.** The fill-in guide for `template.html` in this kit. The HTML is the kit's existing 12-slide report deck (Northwind Capital sample) wrapped with `<!-- SECTION: ... -->` markers and a hard-rules header. Replace the visible copy with your engagement's content; keep markers, classes, and canvas verbatim.
>
> **Audience.** AI agents and humans dropping content into the template later.

The kit's [`README.md`](./README.md) is the exhaustive design language. This file is the shorter, fill-focused contract.

---

## 1 · How to fill it in

1. Open `template.html`. Read every `<!-- SECTION: ... -->` marker.
2. Replace the visible Northwind Capital copy with your engagement's. Placeholders are realistic content, not literal `{{TOKENS}}` — find-and-replace text directly.
3. Each slide is one `<section data-section="...">` inside `<deck-stage>`. Do **not** add slides outside the stage.
4. Update the cover Report ID (`REP-YY-NNNN-CLIENT`), the date (`2026-04-12`-style), and the version in three places: cover ref, slide-top ref on every slide, closing slide-foot.
5. Update `<title>` to the report name.
6. Export: open in Chrome and use the **"Export as PPTX (editable)"** skill for native PowerPoint, or **"Save as PDF"** for flat PDF.

---

## 2 · Hard rules — never touch

| Rule | Why |
|---|---|
| **Do not modify the CSS** in the `<style>` block. | Layout, classes, and tokens are frozen. |
| **Do not add new classes.** | Use only what's defined here and in `/colors_and_type.css`. |
| **Do not change the canvas dimensions.** | 1920 × 1080 exactly (16:9 at native res). |
| **Do not hardcode hex colors.** | All color comes from `var(--…)` tokens. |
| **Do not rename or remove `<!-- SECTION: ... -->` markers.** | External tools slice the template by them. |
| **Do not add slides outside `<deck-stage>`.** | The stage scales each direct child to fit. |
| **Brand budget (deck exception):** ONE `.brand-dot` per slide is allowed (each slide is its own surface); TWO `.brand-word` total (cover + closing). | Per README — decks rescope, not waive. |
| **Do not stretch a slide's content past the safe area.** | Padding is 100 × 140 px; foot rail is 48 px from bottom. |

---

## 3 · Slide-by-slide spec

| # | data-section | Purpose | Key fill points |
|---|---|---|---|
| 01 | `cover` | Front face | Eyebrow with `.brand-dot`, H1 with ONE `.brand-word`, lead, 4-up cover-meta |
| 02 | `agenda` | Six numbered chapters | `agenda-item` rows with brand mono `01`–`06` |
| 03 | `section_opener` | Chapter divider | `.chap-num` brand mono, big chapter title, lead. Has its own slide veil. |
| 04 | `context` | Two-column body | `.ctx-grid` two columns with subhead + paragraphs |
| 05 | `shipped` | Wide table | `.deck-table` with 4–6 rows at scale |
| 06 | `findings` | 4-up stat grid | Four `.finding-cell` with `.stat-num.stat-num-2xl`; ONE `.featured` (brand) |
| 07 | `figure` | Chart placeholder + caption | `.deck-figure .frame` is the drop-in chart slot |
| 08 | `before_after` | 2-column compare | `.compare-grid` cards; eyebrow labels carry the distinction |
| 09 | `recommendations` | 3 numbered recs | `.rec-card` × 3 with `.n` brand mono |
| 10 | `risks` | Risk list | `.risk-row` items with severity badge |
| 11 | `references` | 4 numbered refs | `.refs-grid` with brand mono `[1]`–`[4]` |
| 12 | `closing` | Thank-you + contact | H1 with second `.brand-word`, `.thanks` contact KV |

---

## 4 · Brand restraint budget

| # | Where | Count |
|---|---|---|
| 1 | `.brand-dot` on slide-top wordmark | **per slide** (deck exception) |
| 2 | `.brand-word` total | **2** (cover + closing) |
| 5 | Featured stat (findings) | **1** brand-tinted number |
| 7 | Mono ordinal markers | agenda (6) + recommendations (3) + references (4) |
| — | `.chap-num` brand mono | **1** (section opener) |
| — | `--gradient-hero-veil` instances | up to **3** — cover + section opener + closing |

---

## 5 · Common mistakes

| Mistake | Fix |
|---|---|
| Two `.brand-word` on the cover title | One per heading. Two total across the deck. |
| Multiple featured stats on findings | Exactly one `.featured`. The same number can echo on the executive surface if you have one. |
| Body paragraphs in mono | Mono is for IDs, refs, page indicators. Body stays sans. |
| Slide title that wraps to 4+ lines at 132 px | Shorten the title — 2 to 5 words at the top sizes. |
| References row using the agenda grid | References use `.refs-grid`. URLs need their own line via `word-break: break-all`. |
| Section opener without its own veil | Each section opener gets one slide-veil. |
| Removing `data-screen-label` | Keep it; the comment surface uses it to label slides in the user's preview. |
| Modifying `deck-stage.js` | Don't. Same script powers every deck in the system. |

---

## 6 · Filler agent prompt

> You are filling the Point One Zero stakeholder report deck — 1920 × 1080, twelve slides, built on `deck-stage.js`. Read `SPEC.md` first. The visible content is a realistic Northwind Capital engagement; replace the copy with your engagement's. Do NOT modify the CSS, add classes, change canvas dimensions, hardcode hex colors, or rename `<!-- SECTION: ... -->` markers.
>
> **Twelve slides in order:** cover · agenda · section_opener · context · shipped · findings · figure · before_after · recommendations · risks · references · closing. Each is one `<section data-section="..." data-screen-label="...">` inside `<deck-stage>`.
>
> **Brand budget (deck exception per AUTHORING.md):** ONE `.brand-dot` is allowed per slide (the slide-top wordmark). TWO `.brand-word` total across the deck — cover + closing. ONE `.featured` finding cell (findings slide). Up to THREE `--gradient-hero-veil` instances total (cover + section opener + closing). Brand mono ordinals on agenda (6), recommendations (3), references (4).
>
> **Numerics:** big stats use `.stat-num.stat-num-2xl` (132 px) on the findings slide. Ordinal markers use `.mono` with `var(--brand)`. Inline data (page indicators, slide refs) uses `.mono` with `var(--foreground-subtle)`. Body-prose numerics stay sans.
>
> **Copy:** slide titles 2–5 words at the top sizes; section leads ≤ 25 words; finding descriptions ≤ 15 words; recommendation titles 6–10 words. Sentence case. Oxford comma. Em-dashes with surrounding spaces. En-dashes for ranges. Numerals always.
>
> **Export:** invoke the "Export as PPTX (editable)" skill for PowerPoint, or "Save as PDF" for flat PDF (landscape, no margins, background graphics on).

---

*The kit's exhaustive design contract is [`README.md`](./README.md). The system-wide contract is [`../../AUTHORING.md`](../../AUTHORING.md). The AEO-specific variant of this deck lives in [`../aeo-report/deck.html`](../aeo-report/deck.html).*

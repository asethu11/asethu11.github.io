# Report document template — spec

> **What this is.** The fill-in guide for `template.html` in this kit. The HTML is the kit's existing 12-page report (Northwind Capital sample) wrapped with `<!-- SECTION: ... -->` markers and a hard-rules header. Replace the visible copy with your engagement's content; keep markers, classes, and page geometry verbatim.
>
> **Audience.** AI agents and humans dropping content into the template later.

The kit's [`README.md`](./README.md) is the exhaustive design language. This file is the shorter, fill-focused contract.

---

## 1 · How to fill it in

1. Open `template.html`. Read every `<!-- SECTION: ... -->` marker.
2. Replace the visible Northwind Capital copy with your engagement's copy. Placeholders are realistic content, not literal `{{TOKENS}}` — find-and-replace text directly.
3. Each page is one `<section class="page" data-section="...">`. Do **not** make a section span pages.
4. Update the cover Report ID (`REP-YY-NNNN-CLIENT`) and footer ID in three places: cover ref block, every page-head `.ref`, back-cover bottom bar.
5. Update `<title>` to the report name.
6. Export: open in Chrome → ⌘P → Save as PDF (US Letter, no margins, background graphics on). Or invoke the **"Save as PDF"** skill.

---

## 2 · Hard rules — never touch

| Rule | Why |
|---|---|
| **Do not modify the CSS** in the `<style>` block. | Page geometry, type, and print rules are frozen. |
| **Do not add new classes.** | Use only what's defined here and in `/colors_and_type.css`. |
| **Do not change `--page-w` / `--page-h` / `--page-pad-*`.** | The document is exactly 816 × 1056 px (US letter at 96 DPI). |
| **Do not hardcode hex colors.** | All color comes from `var(--…)` tokens. |
| **Do not rename or remove `<!-- SECTION: ... -->` markers.** | External tools slice the template by them. |
| **Do not span a section across pages.** | Each `<section class="page">` is ONE letter page. |
| **Do not exceed the brand budget** (§ 4). | The brand is a noun, not a color. |
| **Do not add a page outside the 12-section sequence.** | If you need more, duplicate the body page (page 5) and continue. |

---

## 3 · Section-by-section spec

The kit ships 12 pages. Each `data-section` attribute matches the SECTION marker.

| # | data-section | Purpose | Key fill points |
|---|---|---|---|
| 01 | `cover` | Front face | Eyebrow `Engagement report · Client`, H1 with ONE `.brand-word`, sub, 4-up meta (Prepared for · Prepared by · Date · Report ID) |
| 02 | `executive_summary` | Verdict + 3 cards + TL;DR | Lead ≤ 35 words, three `.exec-card` (one `.featured`), TL;DR pull ≤ 45 words |
| 03 | `toc` | Six numbered chapters | Brand mono `01`–`06`, title + subtitle, page numbers right-aligned |
| 04 | `section_opener` | Chapter divider | `.chap-num` brand mono, 60 px `.chap-title`, lead ≤ 30 words. Has its own hero veil. |
| 05 | `body` | Sub-section + paragraphs + callout | Eyebrow `NN.N · Brief`, H3 sub-section, body paragraphs, one `.callout` with brand-tinted `.l` |
| 06 | `data_figure` | Chart placeholder + table | `.figure .frame` is the drop-in chart slot (striped placeholder until filled), `.table` data |
| 07 | `before_after` | Two-column compare | `.compare-row` with `.col` × 2; eyebrow labels "Before" / "After" carry the distinction |
| 08 | `findings` | 4-up stat grid | Four `.finding-cell` with `.stat-num-lg`; exactly ONE `.featured` (brand-tinted) |
| 09 | `recommendations` | 3 numbered recs | `.rec .n` brand mono `01`–`03`; H3 title (period), 1–2 sentence body, `.pill` Owner · Name · Time |
| 10 | `appendix` | Methodology + KV | H3 sub-sections + `.appendix-kv` (term + mono definition) |
| 11 | `references` | 4 numbered refs | `.refs-list` (NOT `.toc-item` grid — URLs break it); brand mono `[1]`–`[4]` |
| 12 | `back_cover` | Closing + contact | H2 with second `.brand-word`, `.back-contact` 2-col, bottom bar with report ID |

If you need more body pages, duplicate the page 5 `<section>` block and continue. The page-foot indicator increments.

---

## 4 · Brand restraint budget

| # | Where | Count |
|---|---|---|
| 1 | `.brand-dot` on cover wordmark | **1** |
| 2 | `.brand-word` total | **2** (cover title + back-cover H2) |
| 5 | Featured number | **2** — one in `executive_summary`, one in `findings`. Both pages, both `.featured`. |
| 7 | Mono ordinal markers | TOC (6) + recommendations (3) + references (4) |
| 9 | Brand `.callout .l` eyebrow | up to 2 (one max per body page) |
| — | `.chap-num` brand mono | **1** (section opener) |
| — | `.exec-tldr` brand-rail | **1** (executive summary) |
| — | `--gradient-hero-veil` instances | **3** max (cover + section opener + back cover) |

---

## 5 · Common mistakes

| Mistake | Fix |
|---|---|
| Using the TOC `.toc-item` grid for references | References use `.refs-list` / `.ref-item` (URL on its own line). |
| Adding `.brand-dot` to an interior page eyebrow | One per document — cover only. |
| Two `.featured` cells on `findings` | Exactly one. The featured number is the headline outcome. |
| Body paragraphs in mono | Mono is for page numbers, IDs, dates, URLs, ordinals. Body stays sans. |
| Hardcoded `font-size: 56px` on the cover title | Cover title is purposefully 76 px (the kit's one display override). |
| Page-head ref text changed per page | Pattern is `Report <ID> · <section>` — only `<section>` changes per page. |
| Brand-color on a section title (H2) | Foreground only. H2s are taxonomy. |
| Adding a 4th hero veil | Three max — cover + section opener + back cover. |

---

## 6 · Filler agent prompt

> You are filling the Point One Zero stakeholder report — 8.5 × 11 portrait, twelve pages, one HTML file (`template.html`). Read `SPEC.md` first. The visible content is a realistic Northwind Capital engagement; replace the copy with your engagement's. Do NOT modify the CSS, add classes, change canvas dimensions (816 × 1056 px), hardcode hex colors, or rename `<!-- SECTION: ... -->` markers.
>
> **Twelve pages in order:** cover · executive_summary · toc · section_opener · body · data_figure · before_after · findings · recommendations · appendix · references · back_cover. Each is one `<section class="page" data-section="...">`.
>
> **Brand budget (document-wide):** exactly ONE `.brand-dot` (cover wordmark only). TWO `.brand-word` (cover + back-cover). TWO featured numbers (executive summary + findings) — the same number is acceptable. Brand mono ordinals: TOC (6), recommendations (3), references (4). Brand `.callout .l` eyebrow up to 2 (one per body page). THREE `--gradient-hero-veil` instances total: cover + section opener + back cover.
>
> **Numerics:** big metrics use `.stat-num.stat-num-lg`; featured tints brand. Ordinal markers (`01`, `[1]`) use `.mono` with `var(--brand)`. Inline data (page numbers, IDs, dates, URLs) uses `.mono` with `var(--foreground-subtle)`. Body-prose numerics stay sans.
>
> **References page:** use `.refs-list` / `.ref-item`, NOT the TOC `.toc-item` grid (URL strings overflow the TOC's 60 px right column).
>
> **Copy:** cover title 4–8 words; section leads ≤ 35 words; body paragraphs ≤ 60 words; finding descriptions ≤ 20 words; recommendation titles 6–10 words ending with period; figure captions ≤ 14 words. Sentence case. Oxford comma. Em-dashes with surrounding spaces. En-dashes for ranges. Numerals always.
>
> **Print:** the kit ships its own `@media print` rule. Do not modify it. Open in Chrome → ⌘P → Save as PDF, US Letter, no margins, background graphics on.

---

*The kit's exhaustive design contract is [`README.md`](./README.md). The system-wide contract is [`../../AUTHORING.md`](../../AUTHORING.md). The AEO-specific variant of this template lives in [`../aeo-report/`](../aeo-report/).*

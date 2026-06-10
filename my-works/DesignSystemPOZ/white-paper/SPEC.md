# White paper portrait — template spec

> **What this is.** The fill-in guide for the portrait white-paper kit. Unlike the report kits, this one ships as a **layout catalog**: 14 page templates inside a design canvas (`index.html`). Each layout is a React component (`WP*`) with named props that are your fill slots. To produce a real white paper, compose the components in sequence and pass real props.
>
> **Audience.** AI agents and humans dropping content into the template later.

The kit's [`README.md`](./README.md) is the exhaustive design language. This file is the shorter, fill-focused contract.

---

## 1 · The model

| Concept | Where |
|---|---|
| Page canvas | 1080 × 1440 portrait (matches 8.5 × 11 ratio, PowerPoint portrait) |
| Style tokens | `/colors_and_type.css` + `white-paper-styles.css` |
| Page components | `white-paper-pages.jsx` — `WPCover` · `WPToc` · `WPChapter` · `WPBodyStandard` · `WPBodyBullets` · `WPBodyNumbered` · `WPBodyPullquote` · `WPBodyStats` · `WPBodyTwoCol` · `WPBodyFigure` · `WPBodyFeaturedStat` · `WPBodyCallout` · `WPResources` · `WPBack` |
| Catalog | `index.html` — all 14 layouts inside a `<DesignCanvas>` for review |

Every body layout shares the same head + foot chrome (`WPHead`, `WPFoot`). The body slot is what varies.

To produce a white paper, **compose components in sequence** with your props, instead of using the catalog as the deliverable.

---

## 2 · Hard rules — never touch

| Rule | Why |
|---|---|
| **Do not modify the CSS** in `white-paper-styles.css` or `colors_and_type.css`. | Frozen design language. |
| **Do not add new `WP*` components.** | If you need a new layout, propose it as a kit update. |
| **Do not change `WPHead` / `WPFoot`.** | Page chrome must be uniform across the document. |
| **Do not hardcode hex colors.** | All color comes from `var(--…)` tokens. |
| **Do not change `--PAGE_W` / `--PAGE_H`.** | 1080 × 1440 exactly. |
| **Brand budget (document-wide):** ONE `.brand-word` on the cover title, ONE on the back-cover title, ONE featured stat (`WPBodyFeaturedStat`), brand mono ordinals on TOC and `WPBodyNumbered` only. | Per AUTHORING.md. |
| **One chapter divider per chapter.** | Don't insert extra chapter pages mid-chapter. |
| **One `WPBodyFeaturedStat` per chapter.** | The featured number is per-chapter, not per-page. |

---

## 3 · Component prop spec

### 3.1 · `WPCover` — front face

```jsx
<WPCover
  eyebrow="A Point One Zero white paper"
  title="The founder's playbook"
  brandWord="playbook"
  sub="Building an AI-native startup, in six stages."
  author="By Maya Lindgren and the Point One Zero team"
  date="2026 · v1.0"
/>
```

| Prop | Budget | Notes |
|---|---|---|
| `eyebrow` | ≤ 6 words | Sentence case; "A Point One Zero white paper" is canonical |
| `title` | 3–6 words | Display-3xl (120 px) |
| `brandWord` | one word | Wrapped in `.brand-word` inside the title |
| `sub` | ≤ 18 words, one sentence | Body-lg |
| `author` | byline | "By X and the Point One Zero team" pattern |
| `date` | YYYY · vN.N | Mono |

### 3.2 · `WPToc` — table of contents

```jsx
<WPToc page={2} items={[
  { num: '01', title: 'The startup lifecycle, rebooted', page: 3 },
  ...
]} />
```

| Prop | Budget | Notes |
|---|---|---|
| `page` | integer | Current page number |
| `items[]` | 6–10 chapters | Each: `num` (2-digit mono brand), `title` (≤ 8 words), `page` (mono) |

### 3.3 · `WPChapter` — chapter divider

```jsx
<WPChapter
  chapterNum="Chapter 03"
  title="Idea"
  brandWord="stage"
  lead="One sentence about what this chapter covers, ≤ 30 words."
  page={8}
/>
```

| Prop | Budget |
|---|---|
| `chapterNum` | "Chapter NN" mono |
| `title` | 1–2 words at 120 px |
| `brandWord` | one word — wrapped `.brand-word`, sits after the title |
| `lead` | ≤ 30 words, one sentence |
| `page` | integer |

### 3.4 · `WPBodyStandard` — drop-cap opener

```jsx
<WPBodyStandard
  page={9}
  section="Chapter 03 · Idea stage"
  eyebrow="The opening"
  title="The shortest path from idea to evidence."
  body={[
    "Paragraph one.",
    "Paragraph two.",
  ]}
/>
```

| Prop | Budget |
|---|---|
| `eyebrow` | ≤ 5 words UPPER |
| `title` | ≤ 10 words |
| `body[]` | 3–5 paragraphs, each 2–4 sentences |

### 3.5 · `WPBodyBullets` — bullet list

Body holds a prose intro then a `bullets[]` array of items. Each bullet has a `<strong>` lead + sentence.

| Prop | Budget |
|---|---|
| `intro` | 1–2 sentences |
| `bullets[]` | 3–6 items, each `{ lead, body }` |

### 3.6 · `WPBodyNumbered` — numbered list

Same as bullets but each item carries a `num` (mono brand `01`, `02`). Use when order matters.

### 3.7 · `WPBodyPullquote` — pull quote

```jsx
<WPBodyPullquote
  quote="One sharp sentence in the founder's own voice."
  cite={{ name: 'Sarah Park', role: 'CIO', org: 'Northwind Capital' }}
/>
```

| Prop | Budget |
|---|---|
| `quote` | ≤ 30 words |
| `cite` | name · role · org |

One pull quote per chapter, max.

### 3.8 · `WPBodyStats` — 4-up stat row

```jsx
<WPBodyStats stats={[
  { num: '17', unit: 'hrs', label: 'Time to prototype' },
  { num: '10', unit: '×', label: 'Faster to market' },
  ...
]} />
```

| Prop | Budget |
|---|---|
| `stats[]` | exactly 4 | Each: num · unit · label (≤ 5 words) |

No `.featured` on this layout — for a featured number, use `WPBodyFeaturedStat`.

### 3.9 · `WPBodyTwoCol` — side-by-side prose

Two `body[]` arrays — left and right columns. Use sparingly; the format reads denser than standard.

### 3.10 · `WPBodyFigure` — figure placeholder + caption

```jsx
<WPBodyFigure
  figLabel="Fig. 03"
  figTitle="The compressed lifecycle"
  caption="Source: Point One Zero, 2026."
/>
```

The figure frame is a striped placeholder. Replace it with a real image by passing `imgSrc`.

| Prop | Budget |
|---|---|
| `figLabel` | "Fig. NN" mono |
| `figTitle` | ≤ 8 words |
| `caption` | ≤ 14 words |

### 3.11 · `WPBodyFeaturedStat` — the chapter's featured number

```jsx
<WPBodyFeaturedStat
  num="47"
  unit="%"
  label="Cost reduction"
  body="One-sentence framing of what this number means."
/>
```

Brand-tinted number using `.stat-num-3xl` (168 px). **One per chapter, max.**

### 3.12 · `WPBodyCallout` — boxed callout

Use for a "Why this matters" sidebar inside a body page. One per chapter, max.

| Prop | Budget |
|---|---|
| `label` | ≤ 4 words UPPER |
| `body` | 2 sentences |

### 3.13 · `WPResources` — references

```jsx
<WPResources page={33} refs={[
  { num: '[1]', title: '...', source: '...', url: '...' },
  ...
]} />
```

Brand mono `[1]`, `[2]` markers. URLs wrap via `word-break: break-all`.

### 3.14 · `WPBack` — back cover

```jsx
<WPBack
  heading="Ready to map the shortest path between idea and exit?"
  brandWord="Let's talk."
  body="One paragraph."
  contactEmail="hello@pointonezero.com"
  contactPhone="(678) 901-4328"
/>
```

Brand-word in the heading is the second of 2 allowed across the document.

---

## 4 · How to compose a white paper

Recommended sequence for a typical 36-page paper:

1. `WPCover` — page 1
2. `WPToc` — page 2
3. `WPChapter` (Ch. 01) — page 3
4. `WPBodyStandard` — page 4 (chapter opener)
5. `WPBodyBullets` or `WPBodyNumbered` — page 5
6. `WPBodyStats` — page 6
7. `WPBodyFeaturedStat` — page 7 (this chapter's featured number)
8. ...repeat the body pattern per chapter, 4–6 body pages per chapter...
9. `WPResources` — penultimate page
10. `WPBack` — last page

Render them as a vertical stack outside the design canvas for the final deliverable. Wrap each in a `<div class="wp-page">` and use `@media print` to put one per letter page.

A starter scaffold for the final deliverable:

```html
<div class="wp-stack">
  <div class="wp-page"><WPCover {...} /></div>
  <div class="wp-page"><WPToc {...} /></div>
  <div class="wp-page"><WPChapter {...} /></div>
  <div class="wp-page"><WPBodyStandard {...} /></div>
  ...
</div>
```

Where `.wp-stack { display: flex; flex-direction: column; gap: 24px; padding: 56px 0; }` and `.wp-page` is exactly 1080 × 1440 with `page-break-after: always` under `@media print`.

---

## 5 · Common mistakes

| Mistake | Fix |
|---|---|
| Two `.brand-word` in the same heading | One per heading. Two total across the document. |
| `WPBodyFeaturedStat` used twice per chapter | One per chapter. The featured number is the chapter's headline. |
| Modifying `WPHead` per page | Don't. The chrome must be uniform. |
| Using `WPBodyTwoCol` for everything | The two-column format reads dense — use only when the content actually splits. |
| TOC items pointing to non-existent chapter pages | Update the `page` prop after composition. |
| Pull quote in every chapter | One per chapter, and only when the source is named. |

---

## 6 · Filler agent prompt

> You are producing a Point One Zero white paper — 1080 × 1440 portrait, composed from React components in `white-paper-pages.jsx`. Read `SPEC.md` first. Compose the components in sequence with realistic props; do NOT modify the components, the CSS, or `WPHead`/`WPFoot`.
>
> **Recommended page order:** `WPCover` · `WPToc` · per-chapter `[WPChapter, WPBodyStandard, WPBodyBullets|Numbered, WPBodyStats|FeaturedStat, WPBodyTwoCol|Figure|Pullquote|Callout]` · `WPResources` · `WPBack`.
>
> **Brand budget:** ONE `.brand-word` on `WPCover.title`, ONE on `WPBack.heading`. ONE `WPBodyFeaturedStat` per chapter (max). Brand mono ordinals on `WPToc.items[].num` and `WPBodyNumbered` items only.
>
> **Numerics:** featured stats use the 3xl size (168 px) via `WPBodyFeaturedStat`. Stat rows use the 4-up `WPBodyStats` with `<small>` units. Mono only for page numbers, TOC ordinals, reference markers, dates — never body prose.
>
> **Copy:** chapter titles 1–2 words; chapter leads ≤ 30 words; body paragraphs 2–4 sentences; pull quotes ≤ 30 words; figure captions ≤ 14 words; stat labels ≤ 5 words UPPER. Sentence case. Oxford comma. Em-dashes with surrounding spaces. En-dashes for ranges. Numerals always.

---

*The kit's exhaustive design contract is [`README.md`](./README.md). The landscape companion is [`LANDSCAPE.md`](./LANDSCAPE.md) and uses `WPL*` components with the same prop signatures.*

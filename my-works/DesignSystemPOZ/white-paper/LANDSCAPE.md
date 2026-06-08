# White paper template — landscape

**1920 × 1080 (16:9) landscape pages.** Maps to the default PowerPoint slide size. 13 page templates. Same brand grammar and chrome as the portrait kit — the wider format unlocks split layouts where the body sits on one side and a sidebar artifact (figure, pull quote, featured stat, callout) sits on the other.

Open `landscape.html` to see all templates on a canvas.

---

## When to choose landscape

| Context | Use |
|---|---|
| PowerPoint deck (the deck *is* the white paper) | **Landscape.** It's the default slide size. |
| Web preview, scroll, or wide-monitor reading | **Landscape.** |
| Print, PDF download, 8.5 × 11 booklet | **Portrait** (see `README.md`). |
| Mixed — some slides projected, some printed | Build both; the kits share grammar so chapters can be re-laid out without rewriting copy. |

---

## Files

| File | Purpose |
|---|---|
| `landscape.html` | The canvas — instantiates every landscape template. Start here. |
| `white-paper-landscape-pages.jsx` | Every landscape page as a React component, prefixed `WPL*`. |
| `white-paper-landscape-styles.css` | Landscape page-level layout primitives. |
| `colors_and_type.css` | Root design system tokens. Shared with portrait. Do not edit here. |
| `design-canvas.jsx` | Canvas wrapper. Do not edit. |

The landscape kit lives alongside the portrait kit in the same folder. Components are namespaced (`WPL*` vs. `WP*`) so both can be loaded in the same page if you ever need to.

---

## Component reference

Every component renders a full 1920 × 1080 `<article class="wpl-page">`. Drop one inside a `<DCArtboard width={1920} height={1080}>`.

### Front matter

| Component | Use | Key props |
|---|---|---|
| `WPLCover` | Title page. Left: title + sub. Right: meta + credits. | `eyebrow`, `title`, `brandWord`, `brandWordTail`, `sub`, `authors`, `date`, `version`, `number` |
| `WPLToc` | Contents — two columns, four entries each side. | `page`, `items[{num, t, d, pg}]` |

### Chapter dividers

| Component | Use | Key props |
|---|---|---|
| `WPLChapter` | Massive chapter title left, lead + meta right. One per chapter. | `chapterNum`, `title`, `brandWord`, `lead`, `page`, `meta` |

### Body pages

All body pages share the same header/footer chrome — `section` shows in the header, `page` in the footer. Most body pages use a left-right grid: body text on one side, artifact on the other.

| Component | Use | Key props |
|---|---|---|
| `WPLBodyStandard` | Long-form prose, set as two prose columns under a lead. | `section`, `eyebrow`, `heading`, `lead`, `paragraphs[]` |
| `WPLBodyBullets` | Intro on the left, three to five bullet items on the right. | `section`, `heading`, `intro`, `items[{t,d}]` |
| `WPLBodyNumbered` | Intro on the left, numbered items on the right. | `section`, `heading`, `intro`, `items[{t,d}]` |
| `WPLBodyPullquote` | Body on the left (60%), sidebar pull quote on the right with brand-blue opening glyph. | `section`, `heading`, `paragraphs[]`, `quote`, `cite` |
| `WPLBodyStats` | Four stats across, full-width rule above and below. | `section`, `heading`, `intro`, `stats[{n, sx?, l, brand?}]`, `outro` |
| `WPLBodyFeaturedStat` | Body left, giant brand-blue number panel right. The headline page of a chapter. | `section`, `heading`, `paragraphs[]`, `statN`, `statSuffix`, `statLabel` |
| `WPLBodyFigure` | Body left, full-height diagram/image placeholder right. | `section`, `heading`, `paragraphs[]`, `figureLabel`, `caption` |
| `WPLBodyCallout` | Body left, surface-1 callout box right. | `section`, `heading`, `paragraphs[]`, `calloutEyebrow`, `calloutTitle`, `calloutBody` |

### Back matter

| Component | Use | Key props |
|---|---|---|
| `WPLResources` | Numbered references in two columns. | `page`, `refs[{t, src, url}]` |
| `WPLBack` | Final page. Left: heading + CTA. Right: meta + office details. | `heading`, `brandWord`, `sub`, `ctaText`, `address`, `phone`, `number` |

---

## When to use which body layout

Landscape body pages all share the same skeleton: a `wpl-grid` with `body` on one side, `sidebar` on the other. Choose by what the sidebar holds:

- **Sidebar is a quote** → `WPLBodyPullquote`. Use at most once per chapter.
- **Sidebar is a single number** → `WPLBodyFeaturedStat`. The chapter's headline number. One per chapter, max.
- **Sidebar is a figure or diagram** → `WPLBodyFigure`. The frame is a placeholder; the user drops the real image in later.
- **Sidebar is an aside** → `WPLBodyCallout`.
- **Sidebar is a list** → `WPLBodyBullets` or `WPLBodyNumbered`. Bullets for parallel items; numbered for ordered steps, exit criteria, principles.
- **No sidebar — pure prose** → `WPLBodyStandard` (two columns of prose).
- **No sidebar — four stats** → `WPLBodyStats` (one row across the full page).

---

## Stat notation

Same as the portrait kit. One rule:

- **Symbol units** (`+`, `×`, `%`) are part of the number. Pass them inside `n`:
  `{ n: '92+', l: '…' }` · `{ n: '10×', l: '…' }` · `{ n: '47%', l: '…' }`
- **Word units** (`hrs`, `M`, `B`) are a small suffix. Use `sx`:
  `{ n: '17', sx: 'hrs', l: '…' }`
- `WPLBodyStats` accepts four stats (landscape fits one more than portrait). One can be brand-blue (`brand: true`).
- `WPLBodyFeaturedStat`'s number is always brand-blue. `statN: '92+'`.

---

## Page sequencing

Same as portrait. A complete white paper:

1. `WPLCover` — slide 01
2. `WPLToc` — slide 02
3. For each chapter:
   - `WPLChapter` divider
   - `WPLBodyStandard` chapter opener
   - Mix of body layouts — vary the sidebar so consecutive pages don't all use the same artifact
4. `WPLResources`
5. `WPLBack`

---

## Brand grammar — scoped to this kit

(See the root README for the full eight-item rule.)

- **One brand-word per cover.** `brandWord` to `WPLCover`. Once.
- **One brand-word per chapter title.** `brandWord` to `WPLChapter`.
- **One featured stat per chapter.** A page using `WPLBodyFeaturedStat` is the headline number.
- **One pull quote per chapter.**
- **The brand dot appears on the cover and the back cover only.** Not on chapter dividers, not on every eyebrow.
- **Body eyebrows are `--foreground-subtle`, never `--brand`.**
- **Stat row: at most one brand-blue stat.**

---

## Starter snippet — new landscape white paper

Copy `landscape.html`, rename, and replace the artboard children:

```jsx
<DesignCanvas title="Your title" subtitle="1920 × 1080 · PowerPoint 16:9">
  <DCSection id="front" title="Front matter">
    <DCArtboard id="cover" label="Cover" width={1920} height={1080}>
      <WPLCover
        eyebrow="A Point One Zero white paper"
        title="Your title here"
        brandWord="one"
        brandWordTail=" word in brand."
        sub="One sentence under 30 words."
        authors="Author Name"
        date="Month 2026"
        version="Vol. 01 · No. 01"
        number="WP-026-XX"
      />
    </DCArtboard>
    <DCArtboard id="toc" label="Contents" width={1920} height={1080}>
      <WPLToc items={[
        { num: '01', t: 'Chapter title', d: 'One-line abstract.', pg: '03' },
        // … 8 entries fit comfortably in two columns
      ]} />
    </DCArtboard>
  </DCSection>

  <DCSection id="ch1" title="Chapter 01">
    <DCArtboard id="ch1-divider" label="Chapter 01" width={1920} height={1080}>
      <WPLChapter chapterNum="Chapter 01" title="Title" brandWord="word"
        lead="One sentence that opens the chapter." page={3} />
    </DCArtboard>
    {/* body pages — vary the sidebar */}
  </DCSection>

  {/* more chapters */}

  <DCSection id="back" title="Back matter">
    <DCArtboard id="resources" label="Resources" width={1920} height={1080}>
      <WPLResources refs={[ /* … */ ]} />
    </DCArtboard>
    <DCArtboard id="back-cover" label="Back cover" width={1920} height={1080}>
      <WPLBack />
    </DCArtboard>
  </DCSection>
</DesignCanvas>
```

---

## Exporting to PowerPoint

The landscape kit was sized for PPTX. To export:

1. Build the deck in `landscape.html`.
2. Each `<DCArtboard>` becomes one slide.
3. Use the "Export as PPTX" skill — pass `width: 1920, height: 1080` and one slide entry per artboard, with `selector` pointing at each `wpl-page` root.

For pixel-perfect output use `mode: "screenshots"`. For editable text in PowerPoint use `mode: "editable"` — the kit is built on real DOM text, no image-baked type, so editable mode round-trips cleanly.

---

## Don'ts

- **No left-border accent stripes on callouts or featured stats.** Use the surface ladder. Settle the card a step into the page on `surface-1`.
- **No tiny unit symbols.** `+`, `×`, `%` ride at full digit size.
- **No brand fills.** Sidebars are `surface-1`. Headings are foreground.
- **No emoji, no gradient blocks, no neon glows.** Only `--brand-glow` on the dot.
- **Don't repeat the brand dot on every page.** Cover, back cover. That's it.
- **Don't put two sidebar artifacts on the same page.** Body + one artifact. Always.
- **Don't make headings uppercase.** Eyebrow is the only uppercase element.
- **Don't pad pages.** A landscape page with too little content reads as empty, not minimal. If a layout feels thin, switch to a denser one (`WPLBodyStandard` with two prose columns) rather than inventing a sidebar.

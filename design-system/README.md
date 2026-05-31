# Abseth Design System

The personal design system behind **Abhishek Sethuraman**'s portfolio and writing —
a UX & Product Designer working on AI-native products and enterprise experiences.
This system powers two surfaces:

| Surface | URL | What it is |
|---|---|---|
| **Portfolio** | [abseth.com](https://abseth.com) | A single-page showcase: hero intro, case studies, side-quests, writing index. |
| **Blog** | [blogs.abseth.com](https://blogs.abseth.com) | Long-form essays with a reading-optimized article layout (TOC, theme toggle). |

The system's own one-liner: **constraint as a feature.** Eight colors instead of fifty,
seven spacing values instead of arbitrary pixels, two fonts instead of a typographic
buffet. Variables are named for *purpose*, not appearance, so light/dark switching is
automatic. Everything is hand-coded in vanilla HTML/CSS/JS — a point of pride that shows
up literally on the site ("site coded by a human in vanilla HTML, CSS, and JavaScript").

## Sources

Everything here was reconstructed from materials the owner provided. Store these in case
you have access — they're the ground truth, and worth exploring further to build more
faithfully:

- **GitHub (site source):** [github.com/asethu11/asethu11.github.io](https://github.com/asethu11/asethu11.github.io)
  — the full vanilla HTML/CSS/JS portfolio + blog. Imported: `index.html`, `about.html`,
  `css/style.css`, `css/components/*`, real project thumbnails, `img/favicon.png`,
  `img/Abhishek.jpg`.
- **Uploaded:** `blogs.abseth.com` design-system reference page (`uploads/index.html`) and
  its full stylesheet (`uploads/blogs.css`, ITCSS-architected). This is the canonical token
  definition for the blog surface.
- Owner links: [LinkedIn](https://www.linkedin.com/in/asethu/) ·
  [Medium](https://medium.com/@mailsofabhishek) · [GitHub](https://github.com/asethu11)

---

## Content fundamentals

The voice is **lowercase, dry, and unmistakably human.** It undercuts its own polish with
casual asides, then turns precise and confident when explaining design reasoning.

- **Casing:** Headlines and nav are lowercase (`i'm abhishek.`, `main work`, `other projects`).
  Body copy is sentence case. Section labels are short and lowercase.
- **Person:** First person throughout (`I design products.`, `I'm kinda cool.`). Addresses the
  reader directly in essays (`you start pattern-matching`).
- **Humor:** Self-aware and deadpan. Examples (verbatim from the site):
  - "i'm abhishek." / pronunciation gag → "uh-bee-shake"
  - "I'm kinda cool. Read more about me here -->"
  - "Your LinkedIn just called—said it needs me -->"
  - "site coded by a human in vanilla HTML, CSS, and JavaScript."
- **Essay voice:** Declarative, opinionated, compounding. Short punchy openers
  ("Every interface decision compounds."), em-dash asides, and a habit of reframing
  ("The constraint isn't the limitation—it's the feature."). Citations are inline numbered
  superscripts, not footnote clutter.
- **Numbers as proof:** Impact is quantified plainly — "220K+ users", "80% bounce-rate",
  "3× recall", "100K+ residents". Never decorative; always a real outcome.
- **No emoji.** Anywhere. Arrows (`-->`, `→`, `↑`) carry the playful/directional energy instead.
- **Em dash** is the signature punctuation — used for asides and reframes.

---

## Visual foundations

**Palette.** Eight core tokens do almost everything: a near-white `#FCFCFC` canvas, a
barely-there grey surface `#F3F5F7`, near-black text `#262628`, one interactive **blue**
`#0070EA`, and one **red** `#DB4F4F` for emphasis/hover/destructive. Inline code is violet
`#8B5CF6`. An 11-step gray scale handles everything subtle and **inverts wholesale** in dark
mode. Color is an *accent, never the structure* — hierarchy comes from size and spacing first.

**Theme.** Dark mode is first-class, not a retrofit. `prefers-color-scheme` drives automatic
switching; a manual toggle (`data-theme="light|dark"`) overrides per-session. The site is
"optimized for light mode" and politely says so when you arrive in dark.

**Type.** Exactly two faces. **Big Shoulders Display** (weight 650, tracking −0.04em) for
*headlines only* — huge on the portfolio (60–80px), dialed back to 2rem for article titles.
**Inter** for everything else. Monospace (Monaco/Menlo/Consolas) for code. Body sits at a
modest ~15–16px so headings breathe.

**Spacing.** A strict 8px-based scale (`--space-xs` 4px → `--space-3xl` 64px). Non-standard
values only ever come from `calc()` of two tokens (e.g. 12px = `sm + xs`). Vertical spacing is
treated as information architecture: 64px before major sections, 16px between related paragraphs.

**Shape.** A 4-step radius scale: 4 / 8 / 12 / 16px. Cards and buttons use 8px; hero media and
image-cards use 16px. **The one deliberate exception:** buttons rest at a soft 15px and *morph*
to 8px on hover.

**Surfaces & borders.** No heavy elevation system. "Cards" are just `--background-grey` fills
with a radius — flat, no drop shadow in content. Shadows appear only on floating UI (toasts,
hover badges). Borders are a single hairline `--border-light` (#CCCCCC light / #333435 dark).
Two callout flavors: filled (grey) and bordered (outlined).

**Imagery.** Project thumbnails sit in rounded `--background-grey` frames (16px radius) and
crop to `cover`. Image vibe is true-to-source product screenshots — clean, bright, UI-forward,
neither filtered nor grain-treated. Placeholders shimmer (skeleton) until loaded. No stock
photography, no illustration system, no gradients-as-decoration.

**Transparency & blur.** Used sparingly: hover badges use `color-mix` over the background for a
frosted chip; toasts use a near-opaque dark panel. No glassmorphism elsewhere.

**Layout rules.** Body is capped at **1000px** and centered. A fixed vertical "human-coded"
badge rides the left edge (hidden < 1024px). The blog adds a fixed top-left **back button**, a
fixed bottom-right **theme toggle**, and a sticky 220px **table of contents** with a live
reading-progress fill (hidden < 1227px). Article body caps at 700px for reading measure.

---

## Motion & animation

Motion is **functional, fast, and never bouncy.** It confirms input, communicates state, and
guides the eye — it is not decoration. Four rules:

1. **Feedback is near-instant.** Primary interactions respond in ~50ms — before the user finishes
   the thought. Hovers settle in 200ms.
2. **Ambient loops are slow and quiet.** Only two live on the site: the hero cursor blink (0.5s)
   and the "Previously in…" word rotator (3.3s). No generic spinners anywhere.
3. **Loading states are content-shaped and interactive.** Skeletons match the real layout geometry
   (heading width, body line heights, image aspect ratio). The page stays fully scrollable and
   interactive while loading — never block input. On resolve, content fades up in stagger order
   (80ms between items), preserving scroll position.
4. **Reduced motion is honored everywhere.** `prefers-reduced-motion` collapses all durations to
   ~0. Non-negotiable.

**Duration tokens** (in `colors_and_type.css`): `--dur-instant` 50ms · `--dur-fast` 100ms ·
`--dur-base` 200ms · `--dur-slow` 300ms · `--dur-tilt` 140ms · `--dur-reveal` 825ms.

**Easing tokens:** `--ease-standard` (`ease`, the workhorse) · `--ease-snap`
(`cubic-bezier(.2,.8,.2,1)`, decisive UI + tilt) · `--ease-emphasis` (`cubic-bezier(.4,0,.2,1)`,
toasts/slides) · `--ease-linear` (spinners only).

**Hover & press patterns** (utilities in `motion.css`):

| Element | Behavior | Class |
|---|---|---|
| Arrow link ("read more -->") | Arrow slides in from behind text (opacity+translateX, 150ms) | `.headtag`, always in DOM | LOCKED |
| Body link | color → red | `.ds-link`, 200ms | LOCKED |
| List/nav row | background tint, no movement | `.fx-row`, 200ms | LOCKED |
| **Button (press language)** | radius **15→8px** + color → red | `.fx-morph`, 50ms | LOCKED |
| "Play" affordance | hidden → `rotate(-45°) scale(1.1)`, slow | `.fx-play`, 825ms | LOCKED |
| Project thumbnail | 3D tilt tracks cursor (JS) + badge reveal | `.fx-tilt`, 140ms snap | LOCKED |

There is **no shrink-on-press**: the button's radius+color morph *is* the press affordance.

**Components removed:** `.reference-chip` (large pill button) — removed. Use `.ref-inline` (small citation badge) for inline references in blog/article contexts.

Shapes: `.sk-heading` (14px tall) · `.sk-line` (11px, body copy) · `.sk-meta` (10px, dates/tags) ·
`.sk-image` (set height/aspect yourself, radius-xl) · `.sk-avatar` (circular). All use
`var(--surface)` fill + a `::after` shimmer that sweeps left-to-right, synchronized across the
group via shared `animation-duration` with no `animation-delay` offset.

Resolve sequence:
1. Add `.sk-group--resolving` to the wrapper → skeletons fade `opacity: 0` over 200ms
2. After 220ms: remove skeleton DOM, inject real content items
3. Each content item gets `.fx-stagger` + `style="--stagger-delay:N"` (0, 1, 2…) → `fade-up` at 80ms intervals

**Named keyframes** (the complete vocabulary — don't add new ones): `blink` · `word-spin` ·
`skeleton-shimmer` · `fade-up` · `toast-in`. The old `btn-spin` keyframe is retired — use the
resolve + stagger pattern for loading states instead of inline spinners.

---

## Iconography

- **Font Awesome 6.5.1** (loaded from cdnjs) is the icon font for everything chrome-level:
  brand glyphs `fa-github`, `fa-medium`, `fa-linkedin` and solid `fa-envelope`, `fa-check-circle`.
  Stroke/fill follows Font Awesome defaults — no custom icon set.
- **Inline SVG** is used for the few bespoke marks: the back-arrow (`M19 12H5…`, 2px round
  stroke), the directional "play" arrow inside side-quest cards, and the sun/moon theme toggle.
  All use `stroke="currentColor"` so they inherit text color and theme automatically.
- **Unicode arrows as type** carry directional/playful energy in copy: `-->`, `→`, `↑`. These
  are text, not icons.
- **No emoji**, ever.
- **Logo:** `assets/logo.png` — a calligraphic italic *a* beside two bold vertical bars, on cream.
  Doubles as the favicon. There is no separate wordmark; the name is set in Big Shoulders.

When building new surfaces, reach for Font Awesome first (CDN link in both UI-kit `index.html`
files), inline SVG only for one-off directional marks, and keep `currentColor` so theme + hover
states come for free.

---

## Index — what's in this folder

**Foundations**
- `colors_and_type.css` — all design tokens: colors, gray scale, semantic tokens, type scale,
  spacing, radii, **motion duration + easing tokens**. The single source of truth. Import first.
- `motion.css` — keyframes, `.fx-*` interaction utilities, reduced-motion. Import after the above.
- `components.css` — real component classes (buttons, links, references, callouts, table, code).

**Assets** (`assets/`)
- `logo.png` (mark/favicon), `abhishek.jpg` (profile photo), `projects/*` (real case-study thumbnails).

**Preview cards** (`preview/`) — the specimens shown in the Design System tab. One strict spec:
700px wide, shared `_card.css` base, light mode, 11px uppercase label. Grouped Colors / Type /
Spacing / Motion / Components / Brand.

**UI kits** (`ui_kits/`)
- `portfolio/` — interactive recreation of [abseth.com](https://abseth.com). See `portfolio/README.md`.
- `blog/` — the article reading layout from [blogs.abseth.com](https://blogs.abseth.com). See `blog/README.md`.

**`SKILL.md`** — lets this folder be used directly as a Claude Agent Skill.

> **Note on fonts:** Big Shoulders Display and Inter are both free Google Fonts, loaded via CDN
> `@import` in `colors_and_type.css` (exactly as the live site does). No local font files are
> bundled — if you need offline/self-hosted copies, ask and they can be added to `fonts/`.

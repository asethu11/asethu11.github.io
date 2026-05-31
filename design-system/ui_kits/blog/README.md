# Blog UI kit — blogs.abseth.com

A faithful recreation of the long-form **article reading layout** from
[blogs.abseth.com](https://blogs.abseth.com). Built with React (inline Babel) over the shared
foundations plus `blog.css` (the site's actual ITCSS stylesheet, `blogs.css`).

Open `index.html` for a complete sample essay ("Why I Start in High-Fidelity") that exercises
the article chrome and content components.

## Files
- `index.html` — assembled article + sample content and TOC data.
- `Article.jsx` — `BackButton` (fixed top-left), `ThemeToggle` (fixed bottom-right),
  `TOC` (sticky, with live reading-progress fill + scroll-spy), and content blocks
  `Callout`, `RefBadge`, `CodeBlock`.
- `blog.css` — the complete blog stylesheet (typography, callouts, tables, code, references,
  buttons, TOC, toast, theme overrides).

## Interactions recreated
- Sticky table of contents with a reading-progress bar that fills as you scroll and a scroll-spy
  that highlights the active section. (Hidden below 1227px, exactly like the site.)
- Smooth-scroll anchor jumps; back-to-top link with animated arrow.
- Light/dark theme toggle; inline numbered citation badges; the button radius+color morph.

## Notes / fidelity
- The blog content lives on a separate subdomain and wasn't in the imported repo, so the sample
  essay is original copy written in the brand voice to demonstrate the components — swap in real
  posts as needed.
- Cosmetic recreation: layout, type, color, and motion are accurate; analytics and the
  canonical-URL normalizer are omitted.

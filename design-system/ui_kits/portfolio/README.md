# Portfolio UI kit — abseth.com

A faithful, interactive recreation of the single-page portfolio at
[abseth.com](https://abseth.com). Built with React (inline Babel) over the shared
foundations (`colors_and_type.css`, `motion.css`) plus `portfolio.css`.

Open `index.html` to see the whole homepage assembled and clickable.

## Files
- `index.html` — the assembled page + all content data (projects, side-quests, writings).
- `Hero.jsx` — `HumanCodedBadge`, `ThemeToggle`, `Hero` (typed greeting + blinking cursor +
  intro + word-loader + socials), `WordLoader`, `ProjectCard` (3D cursor-tilt + reveal badge).
- `Sections.jsx` — `OtherProjects` (list + sticky hover-preview), `SideQuests` (media rows with
  the rotating play affordance), `Writings`, `Footer`.
- `portfolio.css` — layout lifted from the live `css/style.css`.

## Interactions recreated
- Typed rotating greeting with a blinking cursor.
- "Previously in…" vertical word rotator (`word-spin`).
- Project thumbnails tilt in 3D toward the cursor and reveal a metric badge on hover.
- Other-projects list swaps a sticky preview image as you hover each row.
- Side-quest play button rotates in on hover; theme toggle (light/dark); copy-email toast.

## Notes / fidelity
- Real case-study thumbnails are imported into `assets/projects/`. Side-quest cards use grey
  skeleton placeholders (those media weren't part of the import) — drop real images into the
  `image-background` to complete them.
- This is a cosmetic recreation: layout, type, color, and motion are accurate; the JS is
  simplified (no analytics, no canonical-URL normalizer, no real clipboard fallbacks).

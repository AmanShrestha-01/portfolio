# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev       # Vite dev server
npm run build      # tsc -b (type-check) && vite build — build fails on type errors
npm run preview    # serve the production build locally
npm run lint        # oxlint (not eslint)
```

There is no test suite/framework configured in this project.

## Deployment

Pushing to `main` on GitHub auto-deploys via Vercel's GitHub integration — no `vercel.json`, no manual CLI step. There's no staging branch; every push to `main` goes live.

## Architecture

This is a single-page personal portfolio (no router). `src/App.tsx` renders one section component after another in a fixed order inside a single scrolling page — there is no routing, no separate pages.

**All content lives in one file: `src/data/content.ts`.** Every section component is presentation-only and imports its data from there (`profile`, `quotes`, `skills`, `projects`, `experience`, `education`). Adding/editing a project, job, skill, or any copy on the site means editing this file, not the components. Section index numbers (`// 01`, `// 02`, ...) shown by `SectionHeading` are hardcoded per-component props, not derived — if a section is added, removed, or reordered in `App.tsx`, the `index` prop on each affected `SectionHeading` call must be updated by hand to stay sequential.

**Theming is CSS-variable-driven via Tailwind v4's `@theme` block** in `src/index.css`. Color tokens like `--color-accent`, `--color-bg`, `--color-ink` automatically generate corresponding Tailwind utilities (`bg-accent`, `text-ink`, `border-border`, etc.) — there is no `tailwind.config.js`. Effects that aren't expressible as simple utilities live as plain CSS classes in the same file: `.glass`/`.glass-hover` (the glassmorphism card treatment used across Skills/Projects/Experience/About/Hero), `.bg-grid` (the hero background grid), `.perspective` (used by `TiltCard`). Fonts are loaded via `<link>` tags in `index.html` (IBM Plex Sans + IBM Plex Mono) and referenced through `--font-sans`/`--font-mono`.

**Two shared motion primitives wrap section content:**
- `TiltCard.tsx` — gives any children a mouse-tracked 3D tilt (spring-smoothed `rotateX`/`rotateY`). Used by every card-like surface (Skills tiles, Project cards, Experience entries, the About sidebar, the Hero terminal block).
- `CursorGlow.tsx` — a single global mouse-follow spotlight, mounted once in `App.tsx` (fixed-position, `z-40`, listens on `window`, sits below `Nav`'s `z-50`). It is intentionally not per-section — do not re-add a local mousemove spotlight inside an individual component.

Scroll-reveal throughout the site follows one consistent pattern: `initial`/`whileInView` with `opacity` + `y` + `filter: blur(...)→blur(0px)`, `viewport={{ once: true }}`, easing `[0.16, 1, 0.3, 1]`. New sections/cards should match this rather than introducing a different reveal style.

**Resume download** (`src/utils/downloadResume.ts`) fetches the PDF and triggers a save via a Blob URL rather than relying solely on the anchor `download` attribute — plain `download="..."` is unreliable on mobile Safari. All three resume links (desktop nav, mobile nav, hero) call this helper on click and use `profile.resumeFileName` as the saved filename.

**Icons come from two libraries deliberately**: `lucide-react` for generic icons, `react-icons/fa` specifically for brand icons (GitHub/LinkedIn/Instagram) — `lucide-react` dropped brand/trademarked icons in the installed version, so brand icons must come from `react-icons`, not `lucide-react`.

## Environment note

Global git config in this environment has no `user.name` set. Commits must pass author info per-invocation rather than relying on global config, e.g.:
```bash
git -c user.name="Aman Shrestha" -c user.email="amanshrestha3003@gmail.com" commit -m "..."
```

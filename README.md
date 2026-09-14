# Aman Shrestha — Portfolio

Personal portfolio site built with React, TypeScript, Tailwind CSS, and Framer Motion.

Sections: Hero, About, Skills, Projects, Experience, Contact — all content is
centralized in [`src/data/content.ts`](src/data/content.ts), so updating a project,
job, or skill is a one-file edit.

## Stack

- [Vite](https://vite.dev/) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [Framer Motion](https://www.framer.com/motion/) for scroll-in animations
- [Lucide](https://lucide.dev/) + [react-icons](https://react-icons.github.io/react-icons/) for icons

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

## Deploy

This project deploys to [Vercel](https://vercel.com/): import the GitHub repo,
framework preset "Vite", no extra config needed.

## Updating content

Edit [`src/data/content.ts`](src/data/content.ts) — profile info, skills, projects,
experience, and education all live there.

To update the downloadable resume, replace [`public/resume.pdf`](public/resume.pdf).

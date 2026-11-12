# jefferyliu.dev

Personal portfolio site. Next.js (App Router), TypeScript and Tailwind CSS. Every page is generated at build time.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build; fails if a project file is invalid
```

## Add a project

Create one file in `content/projects/`, for example `my-project.md`:

```md
---
title: My Project
area: AI agents            # AI agents | ML engineering | Data and risk | Research
year: "2027"
date: 2027-02              # used for ordering, newest first
summary: One plain sentence a non-engineer can follow.
result: The single result you would defend, with its conditions.
code: https://github.com/you/my-project   # optional
demo: https://example.com                 # optional
---
```

That is enough for it to appear on the All work page.

- **Feature it on the home page:** add `featured: 1` (or 2, 3) plus `detail`, `stat` and three `steps`. See `kairo.md`. Only three projects can be featured, so give the old one's number to the new one.
- **Give it a case study page:** write Markdown below the header. Optional header fields `kicker`, `lede`, `meta`, `stats`, `statsNote` and `limits` fill the case study layout. See `kairo.md`.
- **No public code:** set `private: true`.

## Edit the rest

Everything about you (headline, facts, background, publications, contact cards) is in `lib/site.ts`.

Empty values are hidden, so the site never shows a dead link. Still to fill in:

- [ ] `email`: a public-facing address
- [ ] `resumeHref`: add `public/resume.pdf`, then set to `"/resume.pdf"`
- [ ] `portraitSrc`: add `public/portrait.jpg`, then set to `"/portrait.jpg"`
- [ ] `available`: your start date
- [ ] `demo` in `content/projects/kairo.md`: the live demo address

## Design tokens

Colours, fonts and the six-step type scale are defined once in `app/globals.css` under `@theme`.

## Rules for content

- Every number must match the career ledger. Keep each number's conditions (sample size, "synthetic", "recorded run").
- No phone number or work-permit details on the site.

## Deploy

Import the repository in Vercel and add the domain. No environment variables are needed.

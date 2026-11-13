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
- **Show a screenshot on the home page:** put the image in `public/projects/` and add an `image` block with `src`, `alt`, `width` and `height`. It replaces the three steps. Describe what the picture shows in `alt`.
- **Give it a case study page:** write Markdown below the header. Optional header fields `kicker`, `lede`, `meta`, `stats`, `statsNote` and `limits` fill the case study layout. See `kairo.md`.
- **No public code:** set `private: true`.

## Edit the How I work page

The seven practices on `/how-i-work` are in `lib/method.ts`: each has a rule, a why, the steps, an example from a project and a question. Add, remove or reword entries there; the page and its index update themselves.

## Edit the rest

Everything about you (headline, facts, background, publications, contact cards) is in `lib/site.ts`.

Empty values are hidden, so the site never shows a dead link. Still to fill in:

- [ ] `portraitSrc`: add `public/portrait.jpg`, then set to `"/portrait.jpg"`

## Update the resume

The PDF behind the Download resume buttons is built from `resume/resume.html`:

```bash
npx playwright install chromium   # first time only
npm run resume
```

Keep it to one page, and keep every number in line with the career ledger.

## Retake the screenshots

The three featured screenshots can be retaken from the live demos at double resolution, all at the same window size:

```bash
npx playwright install chromium   # first time only
npm run screenshots               # or: npm run screenshots -- kairo
```

Each image is saved to `public/projects/` at 2400 x 1600. The home page shows every screenshot in the same 3:2 frame, so keep new images at that shape.

## Design tokens

Colours, fonts and the six-step type scale are defined once in `app/globals.css` under `@theme`.

## Rules for content

- Every number must match the career ledger. Keep each number's conditions (sample size, "synthetic", "recorded run").
- No phone number or work-permit details on the site.

## Deploy

Import the repository in Vercel and add the domain. No environment variables are needed.

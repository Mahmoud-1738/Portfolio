# Mahmoud — Portfolio

A personal portfolio for a web developer, built with React + Vite. It features
an animated home hero, a filterable projects gallery with per‑project detail
pages, an interactive about page, and a working contact form. Motion is powered
by GSAP, and the projects hero shows a 3D phone via React Three Fiber.

## Tech stack

- **React 19** + **Vite** — app & build tooling
- **React Router** — client‑side routing
- **GSAP** (`ScrollTrigger`, `ScrollSmoother`, `SplitText`) + `@gsap/react` — animations
- **React Three Fiber** + **drei** + **three** — the 3D phone
- **Web3Forms** — contact form submissions (no backend)

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # production build → dist/
npm run preview # preview the production build
npm run lint    # run ESLint
```

## Pages

| Route            | Page      | Notes                                                        |
| ---------------- | --------- | ----------------------------------------------------------- |
| `/`              | Home      | Fixed hero; scroll/swipe/arrows cycle the big word, click it to open that page |
| `/projects`      | Projects  | Single / list / grid views, search + sort, smooth scrolling |
| `/projects/:id`  | Project   | Per‑project detail (media, highlights, code, role, download) |
| `/about`         | About     | Intro, marquee, services carousel, tech stack, CTA          |
| `/contact`       | Contact   | Contact form (Web3Forms)                                     |

## Project structure

```
src/
├─ AnimatedRoutes.jsx      # routes + ScrollSmoother setup
├─ components/
│  ├─ Header.jsx           # nav with animated active underline
│  ├─ Footer.jsx           # shared footer
│  └─ Phone.jsx            # loads the 3D phone model
├─ data/
│  └─ projects.js          # single source of truth for projects
├─ hooks/
│  ├─ useReveal.js         # data-reveal scroll/mount animations
│  └─ usePageMeta.js       # per-page <title> + description
└─ pages/
   ├─ Home/  About/  Contact/  projects/
```

## Customizing

### Projects

Edit [`src/data/projects.js`](src/data/projects.js). Each project supports:
`name`, `year`, `date`, `category`, `services`, `featured`, `image`, `video`,
`description`, `highlights`, `code`, `download`, `teamType`, `role`.

Put screenshots/videos in `public/projects/` and reference them, e.g.
`image: "/projects/my-shot.png"`.

### Images

- **About photo:** add `public/about-me.jpg`
- **Social share image:** add `public/og-image.png`

### Contact form

The form uses Web3Forms. The access key lives in
[`src/pages/Contact/Contact.jsx`](src/pages/Contact/Contact.jsx) (`ACCESS_KEY`).
It's a public key, safe to commit. When you deploy, add your live domain in the
Web3Forms dashboard so production submissions are accepted.

### 3D phone

The model is imported in [`src/components/Phone.jsx`](src/components/Phone.jsx).
Swap the `.glb` there (embedded textures recommended). Adjust `scale` /
`rotation` on `<Phone …/>` in the Projects hero. Keep models small — large
`.glb` files load slowly.

## Animations

- Text marked with `data-reveal` (optionally `data-reveal="left|right|zoom|…"`)
  animates in via [`useReveal`](src/hooks/useReveal.js). Long pages use
  ScrollTrigger; single‑screen pages animate on mount.
- Respects `prefers-reduced-motion` (animations are skipped).

## Notes

- The three.js bundle is large, so the build prints a chunk‑size warning — this
  is expected, not an error.
- Home and Contact are fixed single‑screen pages; leaving the Projects page
  clears ScrollSmoother's inline transform so their layout stays correct.

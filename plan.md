# Production Readiness Plan

This is a React 18 + React Router 7 + Tailwind v4 site exported from **Figma Make**. It's a
Product Manager portfolio template with 10 routes (Home, About, About/Travel, About/Climbing,
Portfolio + 3 sub-pages, Resume, Contact) already built out with shadcn/ui + Radix components.
The visual design is done. What's missing is everything needed to actually build, deploy, and
personalize it.

## Tier 0 — Build-breaking (site cannot compile at all)

- [ ] **Add `index.html`** at the project root. It does not exist, so `vite build` fails
      immediately with `Could not resolve entry module "index.html"`. Needs a `<div id="root">`
      and a `<script type="module" src="/src/main.tsx">` tag, plus `<title>`, meta description,
      and favicon link (see Tier 2).
- [ ] **Add `src/main.tsx`** (or `src/index.tsx`). There is currently no file anywhere in `src/`
      that calls `ReactDOM.createRoot(...).render(<App />)` — `App.tsx` exists but nothing
      mounts it. This is the standard Vite React bootstrap file; Figma Make's own hosted
      environment generates this behind the scenes, but it wasn't included in this export.
- [ ] **Add a `dev` script** to `package.json` (`"dev": "vite"`) — only `build` exists today, so
      there's no way to preview locally before shipping changes.
- [ ] **Initialize git.** This directory is not a git repository yet (confirmed via `git status`).
      No version history, no way to connect to Vercel/Netlify/GitHub for CI deploys until this
      exists.

None of the remaining work can be verified in a browser until these four items are done — do
them first, in this order.

## Tier 1 — Placeholder content that must not go live as-is

All of the following are template/dummy values still in the code:

- [ ] **Contact form does nothing.** `Contact.tsx` `handleSubmit` only does
      `console.log("Form submitted:", formData)` — no email is ever sent. Cheapest fix with no
      backend: wire it to [Formspree](https://formspree.io) (free tier, just needs a form
      `action` URL) or [EmailJS](https://www.emailjs.com). Alternative: reduce scope and just
      keep the `mailto:` link, drop the form.
- [ ] **Placeholder email** `hello@example.com` — used in `Contact.tsx:119` and
      `Footer.tsx:31`. Replace with a real address.
- [ ] **Placeholder social links** — `https://github.com` and `https://linkedin.com` (no
      username) appear in `Footer.tsx`, `Contact.tsx`, and three times in
      `SoftwareProjects.tsx` (per-project GitHub links). Replace with real profile/repo URLs.
- [ ] **Entirely fake resume data** in `Resume.tsx` — job history ("Tech Company Inc.",
      "FinTech Startup", "E-commerce Platform"), education ("University Name"), and metrics are
      all sample content. Needs your real experience, education, and skills.
- [ ] **"Download PDF" button is dead** in `Resume.tsx:86` — no `onClick` or `href`, does
      nothing when clicked. Either link it to a real hosted PDF of your resume or remove the
      button.
- [ ] **Generic site identity** — nav bar brand reads "Portfolio" (`Navigation.tsx:19`), footer
      reads "Product Manager Portfolio" (`Footer.tsx:9`), homepage headline is generic
      ("Product Manager / Building the future, one feature at a time"). Personalize with your
      actual name/title.
- [ ] Skim `About.tsx`, `Portfolio.tsx`, `ProductCaseStudies.tsx`, `ProcessImprovement.tsx`,
      `Climbing.tsx`, `Travel.tsx` for any remaining sample copy — the grep above only caught
      the obvious markers (`example.com`, `Tech Company`, `University Name`); these pages
      weren't individually reviewed line-by-line.

## Tier 2 — Missing production/SEO basics

- [ ] `<title>`, meta description, and Open Graph tags (author once `index.html` exists).
- [ ] Favicon — none exists anywhere in the repo.
- [ ] `robots.txt` and `sitemap.xml` (optional but low-effort, put in a `public/` folder which
      also doesn't exist yet).
- [ ] SPA routing fallback: this site uses `createBrowserRouter` (client-side routing), so the
      host must rewrite all paths to `index.html` or deep links like `/resume` will 404 on a
      hard refresh. Vercel/Netlify do this automatically when they detect a Vite SPA, but
      confirm after first deploy by refreshing on a non-root route.

## Tier 3 — Cleanup / tooling hygiene (not blocking, but will bite you later)

- [ ] **Mixed package manager signals**: both `package-lock.json` (npm) and
      `pnpm-workspace.yaml` (pnpm) are present, but there's no `pnpm-lock.yaml`. This is
      ambiguous for hosts that auto-detect package manager from lockfiles. Pick one (npm is
      simplest since the lockfile already exists) and delete the other config.
- [ ] No `README.md` explaining how to install/run/build/deploy.
- [ ] `ATTRIBUTIONS.md` references Unsplash photo licensing, but no `<img>` tags or Unsplash
      URLs currently exist anywhere in `src/` — likely leftover boilerplate from the Figma Make
      template. Harmless, but can be deleted if truly unused once content is finalized.
- [ ] No `LICENSE` file (only relevant if you want the repo public with defined reuse terms).

## Recommended path (least resistance)

1. Fix Tier 0 (index.html + main.tsx + dev script) and confirm `npm run dev` renders the site
   locally, then `npm run build` succeeds.
2. `git init`, commit, push to a new GitHub repo.
3. Deploy via **Vercel** or **Netlify** (either auto-detects Vite, zero config needed, free tier,
   easy custom domain, automatic SPA rewrites). Connecting the GitHub repo gives you CI deploys
   on every push for free — this is the lowest-effort way to get a live URL immediately, even
   before Tier 1/2 content work is finished.
4. Swap in real content (Tier 1) — can be done as follow-up commits after the site is already
   live, since none of it blocks deployment once Tier 0 is fixed.
5. Add favicon/meta/SEO basics (Tier 2).
6. Clean up tooling (Tier 3) whenever convenient.

# Production Readiness Plan

This is a React 18 + React Router 7 + Tailwind v4 site exported from **Figma Make**. It's a
Product Manager portfolio template with 10 routes (Home, About, About/Travel, About/Climbing,
Portfolio + 3 sub-pages, Resume, Contact) already built out with shadcn/ui + Radix components.
The visual design is done. What's missing is everything needed to actually build, deploy, and
personalize it.

## Tier 0 — Build-breaking (site cannot compile at all) — ✅ DONE

- [x] **Add `index.html`** at the project root, with `<div id="root">` and
      `<script type="module" src="/src/main.tsx">`. (`<title>`/meta/favicon still generic —
      revisit in Tier 2.)
- [x] **Add `src/main.tsx`** — mounts `<App />` via `createRoot`.
- [x] **Add `dev`/`preview` scripts** to `package.json` alongside `build`.
- [x] **Initialize git** and made the first commit (`git init`, `dist` added to `.gitignore`).

Verified: `npm run build` succeeds (1623 modules, outputs `dist/`), `npm run dev` serves the
site, and both `/` and `/resume` render correctly with working client-side routing.

## Tier 1 — Placeholder content that must not go live as-is

- [x] **Real resume data** in `Resume.tsx` — replaced fake job history with actual experience
      (Infineon Technologies x4 roles, Trusty co-founder), education (Cal Poly Pomona — grad
      year intentionally omitted, not listed on source resume), and skills (Product/Technical/
      Data Analysis, pulled verbatim from resume).
- [x] **Real contact info** — `mrjrothman@gmail.com` now in `Contact.tsx` and `Footer.tsx`
      (was `hello@example.com`). Phone number deliberately **not** added to the public Contact
      page (kept private, per explicit choice).
- [x] **Real social links** — LinkedIn (`linkedin.com/in/jacob-rothman`) and GitHub
      (`github.com/U-k-t`) wired into `Footer.tsx` and `Contact.tsx`.
- [x] **Generic site identity fixed** — nav brand is now "Jacob Rothman" (`Navigation.tsx`),
      footer copyright reads "Jacob Rothman" (`Footer.tsx`), homepage headline personalized to
      name + title drawn from the resume summary (`Home.tsx`), `<title>` updated in
      `index.html`.
- [ ] **Contact form still does nothing.** `Contact.tsx` `handleSubmit` only does
      `console.log("Form submitted:", formData)` — no email is ever sent. Cheapest fix with no
      backend: wire it to [Formspree](https://formspree.io) (free tier, just needs a form
      `action` URL) or [EmailJS](https://www.emailjs.com). Alternative: reduce scope and just
      keep the `mailto:` link, drop the form.
- [ ] **"Download PDF" button is still dead** in `Resume.tsx` — intentionally left unwired.
      The source resume PDF contains a phone number that was explicitly excluded from the
      public site, so it can't be published as-is. Needs a sanitized/redacted version of the
      resume (no phone number) hosted somewhere (e.g. `public/` on this site, or a link to a
      hosted copy) before this button can point anywhere.
- [ ] **`SoftwareProjects.tsx` still has fictional example projects** — three made-up projects
      ("Product Analytics Dashboard", "Customer Feedback Aggregator", "Sprint Planning
      Assistant") with placeholder `github.com`/`example.com` links. These aren't resume data —
      needs either real project write-ups + repo links, or the section removed if there's
      nothing to show yet.
- [ ] Skim `About.tsx`, `Portfolio.tsx`, `ProductCaseStudies.tsx`, `ProcessImprovement.tsx`,
      `Climbing.tsx`, `Travel.tsx` for remaining generic/sample copy — these are bio/narrative
      pages not directly derivable from the resume, so they still read as template placeholder
      text and haven't been personalized yet.

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

1. ✅ Fix Tier 0 (index.html + main.tsx + dev script) — confirmed `npm run dev` and
   `npm run build` both work.
2. ✅ `git init`, commit, push to GitHub (`git@github.com:U-k-t/jacobdrothman.git`, `main`
   branch).
3. Deploy via **Vercel** or **Netlify** (either auto-detects Vite, zero config needed, free tier,
   easy custom domain, automatic SPA rewrites). Connecting the GitHub repo gives you CI deploys
   on every push for free — this is the lowest-effort way to get a live URL immediately, even
   before the rest of Tier 1/2 content work is finished.
4. ✅ Swap in real content (Tier 1) — resume, contact info, social links, and site identity are
   done. Still open: contact form submission, Download PDF button, fictional software projects,
   and a pass over the narrative pages (About/Travel/Climbing/Portfolio sub-pages).
5. Add favicon/meta/SEO basics (Tier 2).
6. Clean up tooling (Tier 3) whenever convenient.

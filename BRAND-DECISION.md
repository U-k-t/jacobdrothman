# Brand Decision — Ink & Amber

**Decision (2026-10-08):** The site uses **Brand B, "Ink & Amber"**, as its only theme.
Brand A ("Azure / Flight Path") and the dev-only Brand A/B switcher have been removed.

## Why

Brand A and B were built as switchable variants and compared on the real pages
(see `BRAND-HANDOVER.md` for the original test). Brand B was chosen because it
reads as senior / enterprise — steady navy with one scarce amber accent — which suits a
Product Manager portfolio better than the consumer-bright azure. It leans on type and
restraint instead of color.

## What shipped

| | Brand B |
|---|---|
| Palette | Ink & Amber — primary navy `#1d4e89`, ink `#101c2e`, signal amber `#f0a32e`, soft blue `#7fb2e5` |
| Logo | Full Stop wordmark: lowercase `jacob rothman` + amber period (`Brandmark`, compact form `jdr.`) |
| Type | Editorial pairing — Source Serif 4 (headings), Public Sans (body), IBM Plex Mono (code) |
| Dark mode | Defined (`.dark` in `theme.css`), though the site currently has no toggle |

## Where it lives

- Tokens: `src/styles/theme.css` (`:root` and `.dark`); components use `brand`, `brand-strong`,
  `brand-soft`, `signal`, `ink`, `slate`, `font-display` etc. — never hard-coded hex.
- Wordmark: `src/app/components/Brandmark.tsx`
- Fonts: `src/styles/fonts.css`

## What was removed

- Brand A token block, Waypoint-J logo, IBM Plex Sans (font and npm package)
- `BrandSwitcher`, the `data-brand` attribute and the `?brand=` / localStorage logic in `index.html`

Brand A remains recoverable from git history (the commit before this one on the `styling` branch).

# Repository Guidelines

## Project Structure & Module Organization

This portfolio uses React 18, TypeScript, Vite 8, and Tailwind CSS 4. It generates static HTML during the build, then hydrates interactive components. Navigation uses normal links rather than a client router.

`src/HomeSite.tsx` composes the interactive dev.play home; `src/Site.tsx` composes interior pages with `src/layout/CreativeLayout.tsx`. `src/utils/routes.ts` defines Spanish/English routes and metadata. Project content lives in `src/data/projects.ts` and `caseStudies.ts`, shared copy in `src/utils/translations.ts`, and identity/contact information in `src/config/site.ts`. `scripts/prerender.mjs` uses Vite’s manifest to include each page’s styles and generates HTML, schema, robots, and sitemap. Public assets belong in `public/`. Never edit generated `dist/` or `.ssr/`.

`src/concepts/` contains the shared dev.play experience and bilingual previews at `/conceptos` and `/conceptos/orbita`. Keep the Orbit proposal’s JavaScript separate from production, and exclude previews from indexing and the sitemap. Home-only console/game code must stay off interior pages.

## Build, Test, and Development Commands

Use Node.js 24 and install with `npm ci`.

- `npm run dev`: start Vite on port 3000.
- `npm run build`: typecheck, compile, and prerender all public pages.
- `npm run preview`: serve the static output on port 4173, including headers and real 404 responses.
- `npm run lint` and `npm run format:check`: check ESLint and Prettier.
- `npm test`: run focused Node tests.
- `npm run test:e2e`: verify browser behavior and accessibility.
- `npm run assets`: regenerate responsive portraits, icons, and social artwork.

## Coding Style & Naming Conventions

Use two-space indentation, semicolons, single quotes, trailing commas, and a 100-character print width. Prefer PascalCase component files, explicit TypeScript types, and `@/` imports. Keep both languages synchronized. Avoid unnecessary dependencies and unsupported claims. Enable animations by default, honor reduced-motion preferences, and keep clickable targets stable while animating their visuals.

## Testing Guidelines

Browser tests live in `tests/browser/*.spec.ts`; focused Node tests use `tests/*.test.mjs`. Install the browser with `npx playwright install chromium`; local tests use installed Chrome, CI uses Chromium. Validate static content without JavaScript, all language routes, keyboard access, responsive layouts, and contact behavior. No numeric coverage threshold is configured.

## Commit & Pull Request Guidelines

Prefer concise imperative messages such as `fix: corrige navegación móvil`. Explain behavior changes, link relevant issues, report checks, and include screenshots for visual changes.

## Privacy & Content

Keep Accounty/InvoiceGen access private and exclude household screenshots. Contact drafts open email; they never prove delivery. Do not invent credentials, dates, employers, metrics, or testimonials. Publish public project links and team affiliation only with verified attribution.

# AGENTS.md

## Repo layout

- The actual app is the Astro portfolio in `portfolio/` — run every command from there, not the repo root.
- Root `README.md` is only a GitHub profile README (personal bio), not project docs. The app has no README.
- Single-page site: `portfolio/src/pages/index.astro` composes components in `portfolio/src/components/`.

## Commands (run in `portfolio/`)

- Package manager is **pnpm** (Node >=22.12.0). Don't use npm/yarn.
- `pnpm dev` — dev server
- `pnpm build` / `pnpm preview` — build & serve the production bundle (Vercel adapter output)
- There is **no lint, test, or typecheck script**. `pnpm build` + `astro check` is the only verification available.

## Gotchas

- **Missing `RESEND_API_KEY` env var breaks the `sendEmail` action.** `src/actions/index.ts` constructs `new Resend(...)` at module scope, so the server refuses the `/_actions/sendEmail` route without `RESEND_API_KEY` in `portfolio/.env`. The Contact section currently uses a mailto + copy-email button (no form), so the action is unused — leave it intact. `.env` is gitignored; copy it from a teammate/CI.
- `.astro/` is a gitignored, generated directory with `types.d.ts` referenced by `tsconfig.json`. Recreated on `astro dev`/`build`; don't hand-edit it.
- Tailwind CSS v4 is wired through the `@tailwindcss/vite` plugin in `astro.config.mjs` — there is **no** `tailwind.config.*`. The single `@import "tailwindcss";` lives at the top of `src/styles/global.css` (Tailwind is used for preflight/reset + a few utilities like the skip link).
- Site theme lives as plain CSS custom properties in `:root` inside `src/styles/global.css`: background `#0b1713`, foreground `#edf3e8`, primary lime `#b6d93b`, muted `#92a39a`, border `rgba(218,240,203,.14)`, contact background `#163323`. The layout is driven by the hand-written theme classes in that file (`.site-shell`, `.nav-wrap`, `.hero`, `.section-kicker`, `.skill-cloud`, etc.). Keep editing those classes — do not reintroduce Tailwind utility classes for the layout.

## Deploy

- Deployed on Vercel via the `@astrojs/vercel` adapter (`astro.config.mjs`) with Vercel Web Analytics enabled. Builds are triggered by pushes to `main`.
- Vercel env vars are managed in the Vercel dashboard (`.env` is local-only).

## Conventions

- Commits use gitmoji + conventional type prefix (e.g. `💄 feat:`, `📈 feat:`, `🧱 fix:`), matching git history.
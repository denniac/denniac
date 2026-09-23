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

- **Missing `RESEND_API_KEY` env var breaks the contact action.** `src/actions/index.ts` constructs `new Resend(...)` at module scope, so the server refuses the `/_actions/sendEmail` route (called by the Contact form) without `RESEND_API_KEY` in `portfolio/.env`. `.env` is gitignored; copy it from a teammate/CI.
- `.astro/` is a gitignored, generated directory with `types.d.ts` referenced by `tsconfig.json`. Recreated on `astro dev`/`build`; don't hand-edit it.
- Tailwind CSS v4 is wired through the `@tailwindcss/vite` plugin in `astro.config.mjs` — there is **no** `tailwind.config.*`. The single `@import "tailwindcss";` lives in `src/styles/global.css`.
- Site theme is hardcoded Tailwind arbitrary values: background `#10141E`, accent green `#29BE43`. Keep using these arbitrary value tokens for consistency.

## Deploy

- Deployed on Vercel via the `@astrojs/vercel` adapter (`astro.config.mjs`) with Vercel Web Analytics enabled. Builds are triggered by pushes to `main`.
- Vercel env vars are managed in the Vercel dashboard (`.env` is local-only).

## Conventions

- Commits use gitmoji + conventional type prefix (e.g. `💄 feat:`, `📈 feat:`, `🧱 fix:`), matching git history.
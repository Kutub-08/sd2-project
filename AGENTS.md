# AGENTS.md

To-Let — flat-rental marketplace. **No root package.json / root git repo.** Two standalone projects, each its own git repo (`SD2/.git`, `frontend/.git`). Both are currently on the same branch (`feat-ai-intregate`). Run commands from each project dir.

| Path | What | Commands (run from that dir) |
|------|------|------------------------------|
| `frontend/` | React 19 + Vite 8 + Tailwind v4 + Redux Toolkit + TanStack Query | `npm run dev`, `npm run build`, `npm run lint` (oxlint), `npm test` (vitest) |
| `SD2/` | Express 5 + Prisma v7 + PostgreSQL (ESM) | `npm run dev` (tsx watch), `npm run build` (tsc), `npm test` (Jest) |

## Prisma v7 quirks (SD2/)

- `prisma.config.ts` at project root with `defineConfig` — **not** a root `schema.prisma`.
- Schema is a multi-file dir: `prisma/schema/*.prisma` (11 files).
- Generated client at `generated/prisma/client` — gitignored, run `npx prisma generate` after schema changes.
- `prisma.config.ts` imports `dotenv/config`, so `.env` is available during Prisma CLI commands.
- Run: `npm run prisma:generate`, `npm run prisma:migrate`, `npm run prisma:studio`, `npm run prisma:seed`.

## Backend conventions (SD2/)

- **ESM** (`"type": "module"`) — `.ts` source imports use `.js` extensions (resolved by tsx/tsc).
- Each feature lives in `src/modules/<name>/` with files named `<feature>.controller.ts`, `<feature>.service.ts`, `<feature>.routes.ts`, `<feature>.schema.ts`, `<feature>.types.ts`. Modules: `auth`, `listings`, `listingImages`, `favorites`, `inquiries`, `reviews`, `users`, `ai`.
- Routes mounted under `/api` via `src/routes/index.ts`. Middleware stack in `src/app.ts`: helmet → cors → json → cookieParser → morgan → globalLimiter → routes → `/api/docs` (Swagger) → notFound → errorHandler.
- Auth: JWT access (15m) + refresh token (7d, httpOnly cookie) — `src/middleware/auth.ts`; token helpers in `src/utils/jwt.ts`.
- DB connection via `@prisma/adapter-pg` in `src/lib/prisma.ts`.
- CORS: `allowedOrigins` = `CLIENT_URL` + `FRONTEND_URL` env vars, always including `http://localhost:5173`; falls back to `*` if all empty.
- `npm run stripe:webhook` starts a Stripe CLI listener forwarding to `localhost:3000/api/subscription/webhook`, **but there is no subscription module/route in the repo** — the endpoint isn't mounted; treat the script as currently dead.
- `planning.md` is the design blueprint (not fully implemented). `complition.md` is an empty completion tracker.

## Frontend conventions (frontend/) — `src/` layout

- Entry: `src/main.tsx` (BrowserRouter → Redux store → QueryClientProvider) → `App.tsx`. Structure: `api/`, `app/` (`store.ts`, `queryClient.ts`), `router/` (`AppRouter.tsx`), `features/` (auth, ui), `pages/` (landlord, tenant), `components/`, `hooks/queries` + `hooks/mutations`, `schemas/`, `types/`, `utils/`.
- TypeScript ~6.0.2 with `erasableSyntaxOnly` in tsconfig.app.json (no enums, no namespaces, no parameter properties) and `verbatimModuleSyntax` (must use `import type` for type-only imports).
- **Linter is oxlint**, not eslint: `npm run lint` → `oxlint`, config in `.oxlintrc.json` (react + typescript + oxc plugins). Prettier is present for formatting only.
- Env via `import.meta.env.VITE_*`. `VITE_API_BASE_URL=/api` is relative — dev proxy in vite.config.ts: `/api` → `http://localhost:3000`.
- API layer: `src/api/axiosClient.ts` + `src/api/interceptors.ts` (JWT attach + 401 refresh; side-effect imported in `src/main.tsx`). Typed per-feature clients: `auth.api.ts`, `listings.api.ts`, etc.
- State: Redux Toolkit for auth/UI, TanStack Query for server state.
- Styling: Tailwind v4 via `@tailwindcss/vite`. Maps via leaflet / react-leaflet.
- `planning2.md` is the design blueprint. `coplition2.md` is an empty completion tracker.

## Testing

- SD2 backend: `npm test` = `node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand --forceExit` (ts-jest ESM). Tests live in `tests/integration/**/*.test.ts` and `tests/unit/*.test.ts` (plus `integration.test.ts`, shared `helpers.ts`, `globalSetup.ts`). **Prereqs:** running Postgres (tests `clearDatabase()` against `DATABASE_URL` in `.env`) and generated client (`npx prisma generate` — tests import from `generated/prisma/client`). JWT secrets are set in `tests/globalSetup.ts`. Coverage: `npm run test:coverage`.
- Frontend: `npm test` = `vitest run` (single run); `npm run test:watch` = `vitest` (watch). Config in vite.config.ts `test` block: jsdom, globals, `tests/setupTests.ts`. MSW handlers in `tests/mocks/handlers.ts`; `renderWithProviders()` in `tests/testUtils.tsx`.
- No `typecheck` script anywhere: frontend typecheck = `npx tsc -b` (also part of `npm run build`); backend typecheck = `npm run build` (`tsc`).
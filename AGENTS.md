# AGENTS.md

To-Let — flat-rental marketplace. **No root package.json / root git repo.** Two standalone projects, each its own git repo (`SD2/.git`, `frontend/.git`). Run commands from each project dir.

| Path | What | Commands (run from that dir) |
|------|------|------------------------------|
| `frontend/` | React 19 + Vite 8 + Tailwind v4 + Redux Toolkit + TanStack Query | `npm run dev`, `npm run build`, `npm run lint` (oxlint) |
| `SD2/` | Express 5 + Prisma v7 + PostgreSQL (ESM) | `npm run dev` (tsx watch), `npm run build` (tsc), `npm test` (Jest) |

---

## ⚠️ CRITICAL: `frontend/` is mid-merge — verify before working there

`frontend/` is a separate git repo with an **unresolved merge in progress** (`git status` → "You have unmerged paths"). A copy of the SD2 backend was merged into the frontend repo by mistake:

- `frontend/package.json` and `frontend/README.md` still contain `<<<<<<< HEAD` / `>>>>>>>` conflict markers (React app vs. a full copy of the backend manifest). Also conflicted: `.gitignore`, `package-lock.json`, `tsconfig.json`.
- Backend files that don't belong in the frontend repo are present: `src/server.ts`, `src/app.ts`, `src/modules/**`, `src/middleware/**`, `src/routes/**`, `prisma/**`, `tests/integration/**`, `tests/globalSetup.ts`.
- The real React app is committed at HEAD in `frontend/src` (`main.tsx`, `App.tsx`, `api/`, `features/`, `pages/`).

Until the merge is aborted/completed and markers removed, `frontend/package.json` is unreliable: its `dev`/`build`/`test` scripts mix frontend + backend and it carries a backend `prisma` field. Run `git status` in `frontend/` before doing any work there.

## Prisma v7 quirks (SD2/)

- `prisma.config.ts` at project root with `defineConfig` — **not** a root `schema.prisma`.
- Schema is a multi-file dir: `prisma/schema/*.prisma` (currently 11 files).
- Generated client at `generated/prisma/client` — gitignored, run `npx prisma generate` after schema changes.
- `prisma.config.ts` imports `dotenv/config`, so `.env` is available during Prisma CLI commands.
- Run: `npm run prisma:generate`, `npm run prisma:migrate`, `npm run prisma:studio`, `npm run prisma:seed`.

## Backend conventions (SD2/)

- **ESM** (`"type": "module"`) — `.ts` source uses `.js` import extensions (resolved by tsx/tsc).
- Each feature lives in `src/modules/<name>/` with `controller.ts`, `service.ts`, `routes.ts`, `schema.ts`, `types.ts`.
- Routes mounted under `/api` via `src/routes/index.ts`. Middleware stack in `src/app.ts`: helmet → cors → json → cookieParser → morgan → globalLimiter → routes → notFound → errorHandler. Swagger UI at `/api/docs`.
- Auth: JWT access (15m) + refresh token (7d, httpOnly cookie) — `src/middleware/auth.ts`; token helpers in `src/utils/jwt.ts`.
- DB connection via `@prisma/adapter-pg` in `src/lib/prisma.ts`.
- CORS allowlist: `CLIENT_URL` / `FRONTEND_URL` env vars, falling back to `localhost:5173`.
- `npm run stripe:webhook` = Stripe CLI local listener for subscription webhooks (`stripe listen --forward-to localhost:3000/api/subscription/webhook`).
- `planning.md` is the design blueprint (not fully implemented). `complition.md` is an empty completion tracker.

## Frontend conventions (frontend/) — committed HEAD state

- TypeScript ~6.0.2 with `erasableSyntaxOnly` in tsconfig.app.json (no enums, no namespaces, no parameter properties) and `verbatimModuleSyntax` (must use `import type` for type-only imports).
- **Linter is oxlint**, not eslint: `npm run lint` → `oxlint`, config in `.oxlintrc.json` (react + typescript + oxc plugins).
- Env via `import.meta.env.VITE_*`. `VITE_API_BASE_URL=/api` is relative — dev proxy in vite.config.ts: `/api` → `http://localhost:3000`.
- API layer: `src/api/axiosClient.ts` + `src/api/interceptors.ts` (JWT attach + 401 refresh; side-effect imported in `src/main.tsx`).
- State: Redux Toolkit for auth/UI, TanStack Query for server state.
- Styling: Tailwind v4 via `@tailwindcss/vite`.
- `planning2.md` is the design blueprint. `coplition2.md` is an empty completion tracker.

## Testing

- SD2 backend: `npm test` = `node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand --forceExit` (ts-jest ESM, roots at `tests/`). **Prereqs:** running Postgres (tests `clearDatabase()` against `DATABASE_URL` in `.env`) and generated client (`npx prisma generate` — tests import from `generated/prisma/client`). JWT secrets set in `tests/globalSetup.ts`. Coverage: `npm run test:coverage`.
- Frontend: `npm test` = `vitest run` (single run); `npm run test:watch` = `vitest` (watch). Config lives in vite.config.ts `test` block: jsdom, globals, `tests/setupTests.ts`. MSW handlers in `tests/mocks/handlers.ts`; `renderWithProviders()` in `tests/testUtils.tsx`.
- No `typecheck` script anywhere: frontend typecheck = `npx tsc -b` (also part of `npm run build`); backend typecheck = `npm run build` (`tsc`).

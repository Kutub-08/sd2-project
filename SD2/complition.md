# Completion Tracker — backend vs planning.md

> Last updated: Aug 20, 2026. Tracks SD2 (Express 5 + Prisma v7 + PostgreSQL) against
> `planning.md`. Everything in planning.md §1–§12 is implemented; the §13 "Remaining /
> possible next steps" are logged as Not-started rows at the bottom of the table.

## What's Been Done (backend)

The To-Let API is feature-complete against planning.md's core scope. Highlights:

- **Stack** — Node 22+, Express 5, TypeScript ESM (`"type": "module"`, `.js` import extensions), Prisma 7 multi-file schema with `@prisma/adapter-pg`, PostgreSQL.
- **Security** — helmet headers, CORS allowlist (`CLIENT_URL` / `FRONTEND_URL` / `localhost:5173`), express-rate-limit tiers (global 100 req/15 min, auth/inquiry/AI 10 req/min), Zod validation on every route, bcrypt (10 rounds), JWT access (15 min) + refresh (7 days, httpOnly cookie, hashed in DB), reset/refresh tokens stored as SHA-256 hashes.
- **Auth** — register/login/logout/refresh/me; forgot/reset password via Nodemailer SMTP with a `[DEV]` console-log fallback; **email OTP verification** (`POST /auth/verify/request` + `/auth/verify`, 10-min TTL, max 5 attempts, one active code); `requireVerified` gate on listing creation; `isBanned` enforced at login and re-checked from the DB on every authenticated request (bans/role changes apply immediately — no token-window staleness).
- **Listings** — full CRUD with `isOwner` enforcement; filters (price, bedrooms, bathrooms, area, city, status), 4 sorts, pagination (shared helper in `utils/pagination.ts`); coords nullable at DB, required at API; images via Multer → Cloudinary (primary + ordering).
- **Marketplace flows** — favorites (tenant-only, unique per user+listing), inquiries (tenant → landlord, rate-limited, PENDING → RESPONDED → CLOSED), reviews (one per tenant per listing, 409 on duplicate, includes tenant name).
- **Admin module** — user list (paginated, role filter, never password_hash), role change + ban/unban with self-target guards (400), listing takedown → `INACTIVE` / reinstate → `AVAILABLE`; banned users rejected by `authenticate` and `login` (403).
- **AI** — Groq (`llama-3.3-70b-versatile`, forced JSON, `temperature: 0`), parsed filters clamped before querying, 6 sort modes incl. `nearest` (haversine), 5-minute in-memory cache keyed by user+query, content-aware `fallbackSearch.ts` (disabled in test env), results logged to `ai_search_logs` (logging failures swallowed).
- **Docs & ops** — Swagger UI at `/api/docs` (all endpoints documented), Winston + morgan logging, route-level + global limiters, `prisma.config.ts` wiring seed to `migrate reset`/`db seed`.
- **Testing** — Jest + Supertest (ts-jest ESM): **131 tests** across 7 files (integration, admin, middleware, reviews, users, verification, unit utils), `test:coverage` script, `tests/globalSetup.ts` sets JWT secrets + DB cleanup.

## Build Status (planning.md §13)

| # | Area | Status | Notes |
|---|------|--------|-------|
| 1 | Project scaffold + middleware stack | ✅ Done | Express 5, TS ESM, helmet → cors → json → cookieParser → morgan → globalLimiter → routes → notFound → errorHandler |
| 2 | Prisma v7 schema + migrations + seed | ✅ Done | 11 multi-file schema files; **6 migrations** (`init`, `add_password_reset_token`, `make_listing_coords_nullable`, `add_user_banned`, `add_verification_code`, `add_verification_code_created_at`) — reconciled with hosted DB; seed = 5 users (2 landlords + 2 tenants + 1 admin) / 7 listings / 14 images / 4 favorites / 3 inquiries, all passwords `password123` |
| 3 | Auth + JWT/refresh + role middleware | ✅ Done | `authenticate` / `authorize(...roles)` / `isOwner` / `isSelf` / `requireVerified`; access 15 min, refresh 7 d httpOnly cookie scoped to `path: /api/auth` |
| 4 | Password reset + email OTP verification | ✅ Done | Forgot/reset via SMTP with dev-console fallback; 6-digit OTP verify/request + verify |
| 5 | Users module | ✅ Done | Public `GET /users/:id` (no password_hash), self-only PATCH, `GET /users/:id/listings` (400 for non-landlord) |
| 6 | Listings CRUD + filters + images | ✅ Done | `listing.filters.ts` → Prisma where; pagination caps limit 100; Multer + Cloudinary uploads |
| 7 | Favorites / Inquiries / Reviews | ✅ Done | With per-resource rate limits and duplicate guards |
| 8 | Admin module | ✅ Done | `GET/PATCH` user list/role/ban, listing takedown/reinstate, self-target guards, ban enforcement |
| 9 | AI recommend + similar | ✅ Done | `POST /ai/recommend` + `GET /ai/similar/:listingId`; Groq, clamp, fallback, cache, 6 sorts |
| 10 | Swagger docs + Winston logging + rate limiting | ✅ Done | `/api/docs`; morgan → Winston stream; global + auth/inquiry/AI limiters |
| 11 | Jest test suite | ✅ Done | 131 tests / 7 files; `npm test` (prereqs: Postgres + `npx prisma generate`) |
| 12 | Redis-backed rate-limit store + AI cache | ❌ Not started | Rate limiting + AI search cache are in-memory (single-process) |
| 13 | CI pipeline + Dockerfile / docker-compose + deployment | ❌ Not started | No CI config or container files yet |
| 14 | PostGIS geolocation | ❌ Not started | `nearest` sort uses in-memory haversine |
| 15 | Phone OTP verification | ❌ Not started | Blocked on an SMS provider (email OTP already done) |
| 16 | Subscriptions / billing (Stripe / SSLCommerz) | ❌ Not started | Deps + `stripe:webhook` script stubbed, no route/module yet |

## Missing from planned structure / Not implemented

| Item | Status |
|------|--------|
| Subscription & payment module (Stripe / SSLCommerz) | ❌ Not started — deps installed (`stripe`, `sslcommerz-lts`), `npm run stripe:webhook` forwards to `POST /api/subscription/webhook`, but no schema, module, or route exists |
| File/document parsing (mammoth, pdf-parse), Firebase, OpenAI SDK | ❌ Installed but unused — leftover deps from a broader original scope (see §Extras) |
| Redis rate-limit store / AI cache | ❌ In-memory only |
| CI + Dockerfile / docker-compose + Vercel/Render config | ❌ None |
| Phone OTP | ❌ Needs SMS provider |

## Environment & Seed (local run)

- Env vars (`.env.example`): `GROQ_API_KEY`, `GROQ_MODEL`, `DATABASE_URL`, `CLOUDINARY_CLOUD_NAME`/`_API_KEY`/`_API_SECRET`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `PORT`, `CLIENT_URL`, `SMTP_HOST`/`PORT`/`USER`/`PASS`, `EMAIL_FROM`.
- Prereqs to run: Postgres (`DATABASE_URL`), `npx prisma generate` (client → `generated/prisma`, gitignored).
- Seed creds: 5 users, all passwords `password123` (2 landlords + 2 tenants + 1 admin). `prisma.config.ts` wires seed so `prisma db seed` / `migrate reset` auto-seed.

## Notes & caveats

- **Bans are immediate** — `authenticate` re-reads `role`/`isBanned`/`isVerified` from the DB on every request, so admin role/ban changes need no token refresh.
- **Rate limiter is a no-op in `NODE_ENV=test`**; AI fallback search is also disabled in test env.
- **SMTP fallback** — with `SMTP_HOST` empty, reset links are logged to the dev console instead of emailed (mailer also logs OTP codes in dev).
- **AI reliability** — parsed filters are always clamped before the DB query; AI-log failures are swallowed so they never break the response.
- **`ai_search_logs.user_id` is nullable (SetNull)** — anonymous searches are still logged.
- **planning.md §4 lists `password_reset_tokens` twice** (duplicate section) — implemented once, as specified.

## Extras (deps present beyond planning.md's documented stack)

Installed in `package.json` but **not used by any module**: `stripe`, `sslcommerz-lts`, `firebase-admin`, `openai`, `mammoth`, `pdf-parse`, `node-cron`. They are the residue of a broader original scope (subscriptions, document parsing, Firebase push, scheduled jobs); planning.md's `stripe:webhook` script and any subscription work remain future steps (§Build Status row 16).
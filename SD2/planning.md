# Backend Planning — To-Let (Flat Rental Marketplace)

## 1. Project Summary

**Problem Statement:** Finding a rental flat in Bangladesh typically relies on word-of-mouth, local brokers (dalals often charging a month's rent as commission), or scattered Facebook groups with no structured filtering. Landlords have no easy way to list vacant flats with structured details (price, size, rooms, location), and tenants can't search/filter/compare listings in one place or get guidance on what fits their budget and preferred area.

**Solution:** A two-sided marketplace where landlords list flats with structured attributes (price, sq ft, bedrooms, bathrooms, location) and tenants search/filter/browse listings — with an AI layer that recommends flats matching a user's stated budget and preferred location/area, even when their query is loose ("around 15k in Chattogram near IIUC").

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Runtime | Node.js 22+ |
| Framework | Express.js 5 |
| Language | TypeScript (ESM, `.js` import extensions) |
| Database | PostgreSQL |
| ORM | Prisma 7 (multi-file schema, `@prisma/adapter-pg`) |
| Auth | JWT access token (15 min) + refresh token (7 days, httpOnly cookie) |
| Password Hashing | bcryptjs |
| Validation | Zod 4 |
| Rate Limiting | express-rate-limit (in-memory; no-op in test env) |
| Logging | Winston + morgan |
| File/Image Upload | Multer + Cloudinary |
| Geolocation | lat/lng columns + haversine distance (in-memory sorting) |
| AI Integration | Groq SDK (`llama-3.3-70b-versatile`) — natural-language search |
| API Docs | swagger-jsdoc + swagger-ui-express (served at `/api/docs`) |
| Testing | Jest + Supertest (ts-jest ESM) |

> **Note:** AI uses **Groq** (via `groq-sdk`), not Gemini/OpenAI. Rate limiting is in-memory — no Redis dependency.

---

## 3. High-Level Architecture

```
Client (React.js)
      │
      ▼
Express API
 ├── Security Headers (helmet)
 ├── CORS (allowlist: CLIENT_URL / FRONTEND_URL / localhost:5173)
 ├── JSON body + cookie parsing
 ├── Morgan → Winston log stream
 ├── Global Rate Limiter (100 req/15 min)
 │
 ├── /api/auth      → Auth module (register, login, refresh, password reset)
 ├── /api/listings  → Listing CRUD + search/filter/pagination (+ images)
 ├── /api/users     → Profile module
 ├── /api/favorites → Saved listings
 ├── /api/inquiries → Tenant → landlord contact flow
 ├── /api/reviews   → Tenant reviews of listings
 ├── /api/ai        → AI Recommendation (Groq) + similar listings
 ├── /api/docs      → Swagger UI
 │
 ▼
PostgreSQL (via Prisma + @prisma/adapter-pg)
```

---

## 4. Database Schema (PostgreSQL — normalized, multi-file Prisma)

Schema lives in `prisma/schema/*.prisma` (11 files: `schema.prisma`, `enum.prisma`, plus one per model). Enums are **uppercase**: `UserRole` (`TENANT` / `LANDLORD` / `ADMIN`), `ListingStatus` (`AVAILABLE` / `RENTED` / `INACTIVE`), `InquiryStatus` (`PENDING` / `RESPONDED` / `CLOSED`). Generated client outputs to `generated/prisma` (gitignored; run `npx prisma generate` after schema changes).

### `users`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| name | VARCHAR | |
| email | VARCHAR UNIQUE | |
| phone | VARCHAR | contact for inquiries |
| password_hash | VARCHAR | bcrypt |
| role | ENUM('TENANT','LANDLORD','ADMIN') | default 'TENANT' |
| is_verified | BOOLEAN | default false |
| is_banned | BOOLEAN | default false — admin moderation / takedown flag |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### `refresh_tokens`
| id | UUID PK |
| user_id | FK → users.id (Cascade) |
| token_hash | VARCHAR |
| expires_at | TIMESTAMP |
| revoked | BOOLEAN |

### `password_reset_tokens`
| id | UUID PK |
| user_id | FK → users.id (Cascade) |
| token_hash | VARCHAR |
| expires_at | TIMESTAMP |
| used_at | TIMESTAMP | nullable |

### `verification_codes`
| id | UUID PK |
| user_id | FK → users.id (Cascade) |
| code_hash | VARCHAR | SHA-256 of 6-digit OTP |
| expires_at | TIMESTAMP | 10 min TTL |
| used_at | TIMESTAMP | nullable |
| attempts | INT | max 5, then invalidated |
| created_at | TIMESTAMP |

### `listings`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| landlord_id | FK → users.id (Cascade) | |
| title | VARCHAR | |
| description | VARCHAR | |
| price | NUMERIC(10,2) | monthly rent |
| size_sqft | NUMERIC(8,2) | |
| bedrooms | INT | |
| bathrooms | INT | |
| floor_number | INT | nullable |
| address | VARCHAR | full text address |
| area | VARCHAR | e.g. "Panchlaish", "Khulshi" — for filtering |
| city | VARCHAR | |
| latitude | NUMERIC(10,7) | nullable — historical/edge listings may lack geo data |
| longitude | NUMERIC(10,7) | nullable — historical/edge listings may lack geo data |
| amenities | VARCHAR[] | e.g. lift, generator, parking, gas |
| status | ENUM('AVAILABLE','RENTED','INACTIVE') | default 'AVAILABLE' |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### `listing_images`
| id | UUID PK |
| listing_id | FK → listings.id (Cascade) |
| image_url | VARCHAR |
| is_primary | BOOLEAN |
| order_index | INT |

### `favorites` (saved listings)
| id | UUID PK |
| user_id | FK → users.id (Cascade) |
| listing_id | FK → listings.id (Cascade) |
| created_at | TIMESTAMP |

> Unique constraint on (`user_id`, `listing_id`).

### `inquiries`
| id | UUID PK |
| listing_id | FK → listings.id (Cascade) |
| tenant_id | FK → users.id (Cascade) |
| message | VARCHAR |
| status | ENUM('PENDING','RESPONDED','CLOSED') | default 'PENDING' |
| created_at | TIMESTAMP |

### `reviews`
| id | UUID PK |
| listing_id | FK → listings.id (Cascade) |
| tenant_id | FK → users.id (Cascade) |
| rating | INT (1-5) |
| comment | VARCHAR |
| created_at | TIMESTAMP |

### `ai_search_logs`
| id | UUID PK |
| user_id | FK → users.id (SetNull, nullable for anonymous) |
| query_text | VARCHAR | raw natural-language query |
| parsed_filters | JSONB | budget, location, bedrooms extracted by AI |
| created_at | TIMESTAMP |

### `password_reset_tokens`
| id | UUID PK |
| user_id | FK → users.id (Cascade) |
| token_hash | VARCHAR | SHA-256 hash of the raw reset token |
| expires_at | TIMESTAMP |
| used_at | TIMESTAMP | null until the token is consumed |

**Indexes:**
- `listings(city, area)`, `listings(price)`, `listings(bedrooms, bathrooms)`, `listings(status)`, `listings(latitude, longitude)`, GIN on `listings(amenities)`
- `favorites(user_id)` + unique `(user_id, listing_id)`, `inquiries(listing_id)`

---

## 5. REST API Endpoints

### Auth (`/api/auth`)
```
POST   /auth/register             (role: TENANT | LANDLORD) — rate limited
POST   /auth/login                — rate limited
POST   /auth/logout               (authenticated)
POST   /auth/refresh              (httpOnly cookie) — rate limited
POST   /auth/forgot-password      — rate limited
POST   /auth/reset-password       — rate limited
POST   /auth/verify/request       (authenticated — sends 6-digit email OTP, 10 min expiry)
POST   /auth/verify               (authenticated — { code }, sets isVerified)
GET    /auth/me                   (authenticated)
```

### Listings (`/api/listings`)
```
GET    /listings                  ?page=&limit=&minPrice=&maxPrice=&bedrooms=&bathrooms=&area=&city=&status=&sort=
GET    /listings/:id
POST   /listings                  (landlord + verified email only)
PUT    /listings/:id              (landlord — owner only)
DELETE /listings/:id              (landlord — owner only)
PATCH  /listings/:id/status       (landlord — owner only, mark rented/available)
GET    /listings/landlord/:landlordId
```

### Listing Images (`/api/listings`)
```
POST   /listings/:id/images       (multipart, landlord — owner only)
DELETE /listings/:id/images/:imageId   (landlord — owner only)
```

### Favorites (`/api/favorites`)
```
POST   /favorites                 (tenant)
GET    /favorites                 (tenant's saved listings, paginated)
DELETE /favorites/:id             (tenant, owner of the favorite)
```

### Inquiries (`/api/inquiries`)
```
POST   /inquiries                 (tenant → landlord about a listing, rate limited 10/min)
GET    /inquiries/sent            (tenant view)
GET    /inquiries/received        (landlord view)
PATCH  /inquiries/:id/status      (landlord updates status)
```

### Reviews (`/api/reviews`)
```
POST   /reviews                   (tenant, one review per listing — 409 if duplicate)
GET    /reviews/listing/:listingId   (public, includes tenant name)
```

### AI Recommendation (`/api/ai`)
```
POST   /ai/recommend              { query, sort?, location? } → ranked listings (rate limited 10/min)
GET    /ai/similar/:listingId     → "similar flats" suggestions (price ±30%, same area, ±1 bedroom)
```

### Users (`/api/users`)
```
GET    /users/:id                 (public — never exposes password_hash)
PATCH  /users/:id                 (authenticated + isSelf — name, phone)
GET    /users/:id/listings        (listings by a landlord user, 400 if not a landlord)
```

### Admin (`/api/admin`)
```
GET    /admin/users               (admin only — paginated, filter by role, never password_hash)
PATCH  /admin/users/:id/role      (admin only — set TENANT/LANDLORD/ADMIN; 400 if targeting self)
PATCH  /admin/users/:id/ban       (admin only — { banned: boolean } toggle; 400 if targeting self)
GET    /admin/listings            (admin only — all listings incl. INACTIVE/RENTED, full filters)
PATCH  /admin/listings/:id/status (admin only — takedown → INACTIVE / reinstate → AVAILABLE)
```

---

## 6. Authentication & Authorization

- **JWT access token** (15 min) + **refresh token** (7 days, httpOnly cookie scoped to `path: /api/auth`, hashed in DB).
- **Roles:** `TENANT`, `LANDLORD`, `ADMIN`.
- **Middleware:**
  - `authenticate` — verifies Bearer token, then **re-reads `role`/`isBanned`/`isVerified` from the DB on every request** (not from the token). Missing user → 401, banned user → 403. Bans and role changes take effect immediately — no token-window staleness, no refresh-token edge case.
  - `authorize(...roles)` — restricts e.g. listing creation to landlords, favorites/inquiries/reviews to tenants, moderation to admins.
  - `isOwner` — checks `listing.landlord_id === req.user.id` before update/delete/image ops (prevents a landlord editing someone else's listing).
  - `isSelf` — checks `req.params.id === req.user.id` before profile update (403 otherwise).
  - `requireVerified` — 403 `EMAIL_NOT_VERIFIED` until the user's email is verified (used on `POST /listings`).
  - Admin self-target guard — role change / ban endpoints reject `req.user.id === req.params.id` (400) so an admin can't demote or lock themselves out.
- `login` also rejects banned users (403) — they can't mint tokens at all.
- Password hashing via bcrypt, 10 salt rounds.
- **Email verification (OTP):** implemented for landlords. `POST /auth/verify/request` sends a 6-digit code (10 min expiry, max 5 attempts, one active code) via the SMTP mailer; `POST /auth/verify` marks the user verified; listing creation requires a verified email. Phone OTP still possible in the future (needs an SMS provider).

---

## 7. Middleware Stack (execution order)

1. `helmet()` — security headers (with `crossOriginResourcePolicy: "cross-origin"`)
2. `cors()` — restrict to `CLIENT_URL` / `FRONTEND_URL` / `localhost:5173`
3. `express.json()` — body parsing
4. `cookieParser()`
5. `morgan` → piped to Winston logger (via `src/config/logger.ts` stream)
6. Global rate limiter (`globalLimiter` — 100 req/15 min per IP; no-op in test env)
7. Route-level limiters: `authLimiter` (10/min), `inquiryLimiter` (10/min), `aiLimiter` (10/min)
8. Route-level `authenticate` (JWT verify + DB `role`/`isBanned`/`isVerified` check) / `authorize(role)` / `isOwner` / `isSelf` / `requireVerified`
9. Zod validation middleware per route
10. Route handler
11. `notFound` (404) then centralized `errorHandler` — consistent JSON error shape

---

## 8. Input Validation & Security

- All bodies/params/query validated via Zod (price ≥ 0, bedrooms/bathrooms 0–50, coordinates within valid lat/lng bounds, pagination caps at limit 100).
- Prisma parameterized queries — no raw SQL concatenation (SQL injection protection).
- CORS whitelist limited to frontend origin(s).
- Rate limit tiers: auth 10/min, inquiry 10/min, AI 10/min, global 100/15 min.
- Image upload: Multer file filter (type/size) → Cloudinary; never trust raw file paths from client.
- `isOwner` / `isSelf` checks on every protected mutation — never rely on the frontend hiding buttons.
- Admin moderation: `isBanned` users are rejected in `authenticate` and `login` (403); admin role/ban endpoints block self-targeting (400).
- Passwords are bcrypt-hashed; reset/refresh tokens stored as hashes (SHA-256).

---

## 9. AI Integration — Recommendation & Natural-Language Search

**Flow:**
1. Tenant enters a free-text query (e.g. *"2 bed flat under 15000 near IIUC"*) via `POST /api/ai/recommend`.
2. `ai.service.ts` sends the query to **Groq** (`llama-3.3-70b-versatile`, `temperature: 0`, forced JSON) using the template in `prompts.ts`, with an 8s timeout + abort.
3. Groq returns structured JSON (e.g. `{ maxPrice: 15000, bedrooms: 2, area: "IIUC" }`) which is clamped (`clampFilters` — no negative/absurd prices, bedrooms 0–50, max 20 amenities).
4. Backend runs this as a normal Prisma filter query against `listings` (status AVAILABLE) via `listing.filters.ts` — AI is used for **query understanding**, not for inventing listings.
5. Results are ranked/sorted and returned. Every call logs raw query + parsed filters to `ai_search_logs`; logging failures are swallowed so they never break the response.
6. A **5-minute in-memory cache** (keyed by user + query) prevents re-running the LLM on repeated/sort-changed requests.

**Sort options** (`POST /ai/recommend`): `relevance` (default), `price_asc`, `price_desc`, `highest_rated`, `most_reviewed`, `nearest` (requires `location {lat, lng}` — haversine distance). Price sorts run in Prisma; the rest sort in JS after loading the full pool.

**`GET /api/ai/similar/:listingId`** — given a listing, find others within ±30% price, same area (case-insensitive), ±1 bedroom, status AVAILABLE, max 10 results.

**Cost/reliability guardrails:**
- Always clamp the AI's parsed filters before running the DB query — never trust the LLM output blindly.
- `fallbackSearch.ts` is content-aware: strips stop-words, parses price hints (`under/up to/৳Nk/taka`), detects bedroom counts (e.g. "2bhk"), intersects keyword + budget + bedroom constraints (max 20 results). Disabled (no-op) when `NODE_ENV=test`. Used when the AI call fails/times out or returns no usable filters.
- Rate-limit the AI endpoint separately (`aiLimiter`) since LLM calls cost more than a normal DB query.

---

## 9a. AI Module — Folder Structure

```
src/modules/ai/
├── ai.controller.ts       # handles POST /api/ai/recommend, GET /api/ai/similar/:listingId
├── ai.service.ts          # calls Groq, parses/clamps filters, sorts, caches, logs
├── ai.routes.ts           # route definitions, mounted under /api/ai
├── ai.schema.ts           # Zod schema validating the incoming { query, sort?, location? } body
├── ai.types.ts            # TS types for parsed filters (maxPrice, bedrooms, area, etc.)
├── prompts.ts             # prompt template(s) instructing the model to return structured JSON
└── fallbackSearch.ts      # plain keyword/price search used if the AI call fails or times out
```

**Flow through these files:**
1. `ai.routes.ts` → `ai.controller.ts` receives `{ query, sort, location }`.
2. `ai.controller.ts` calls `ai.service.ts`, which sends the query to Groq using a template from `prompts.ts`.
3. `ai.service.ts` parses the model's JSON into the shape defined in `ai.types.ts`, validating/clamping values.
4. Service passes the parsed filters into `listings/listing.filters.ts` to run the actual Prisma query — the AI module never queries the DB directly for parsing.
5. If the AI call fails/times out, `fallbackSearch.ts` runs a plain `ILIKE`/price-range match instead, so the endpoint still returns results.

---

## 10. Error Handling & Logging

- Centralized error middleware, consistent shape:
  ```json
  { "success": false, "error": { "code": "VALIDATION_ERROR", "message": "..." } }
  ```
- `AppError` class distinguishes operational (4xx) vs unexpected (5xx) errors.
- Winston logs: request logs (via morgan stream), error/warn files in production (`logs/error.log`, `logs/warn.log`), colorized console in dev.
- No raw DB/stack traces leaked to client in production.

---

## 11. API Documentation

- OpenAPI spec via `swagger-jsdoc` with inline JSDoc annotations on each route, served at `/api/docs` (Swagger UI).
- All listing filter query params documented (price range, bedrooms, bathrooms, area, city, status, sort) — the most-used endpoint.
- Auth, AI, Favorites, Inquiries, Reviews, Users, Listing Images, and Admin endpoints all documented.

---

## 12. Testing Strategy

- **Unit tests:** `tests/unit/utils.test.ts` (jwt, hash, param, apiResponse helpers, pagination helper, mailer fallback).
- **Integration tests (Supertest, in `tests/integration/`):**
  - `users.test.ts` — profile get/update/self-enforcement, landlord listings
  - `reviews.test.ts` — create review, duplicate prevention, listing reviews
  - `admin.test.ts` — non-admin 403s, user list/role/ban, ban enforcement across login + existing tokens, listing takedown/reinstate, self-target guards
  - `verification.test.ts` — email OTP: unverified landlord blocked from publishing, request/verify flows, wrong/expired codes, attempt invalidation, already-verified guard
  - `middleware.test.ts` — authenticate/authorize/isOwner/isSelf behavior
  - `tests/integration.test.ts`, `tests/helpers.ts`, `tests/globalSetup.ts` (JWT secrets + DB cleanup)
- Prereqs: running Postgres (`DATABASE_URL` in `.env`) and generated client (`npx prisma generate`). Run: `npm test`.

---

## 13. Build Status / Suggested Next Steps

**Implemented:** project scaffold, auth (register/login/logout/refresh/me + forgot/reset password via SMTP with `[DEV]` log fallback, `isBanned` enforcement at login, **email OTP verification** via `POST /auth/verify/request` + `/auth/verify` with `isVerified` gate on listing creation), listings CRUD + filters + pagination (coords nullable at DB, required at API; shared pagination helper in `utils/pagination.ts`), listing images (Multer → Cloudinary), favorites, inquiries (with rate limit), reviews, **admin module** (user list/role/ban + listing moderation with self-target guards), AI recommend + similar (Groq, fallback search, caching, 6 sort modes, location support), users module, Swagger docs, Winston logging + global limiter, seed script (`prisma/seed.ts` — 5 users incl. admin / 7 listings / 14 images / 4 favorites / 3 inquiries, all passwords `password123`), Jest test suite (131 tests).

**Migration history:** 6 migrations (`init`, `add_password_reset_token`, `make_listing_coords_nullable`, `add_user_banned`, `add_verification_code`, `add_verification_code_created_at`) — reconciled with the hosted DB, so `prisma migrate status` / `migrate dev --create-only` / `migrate deploy` / `migrate reset` all run cleanly. Seed is wired in `prisma.config.ts` so `prisma db seed` and `migrate reset` auto-seed.

**Remaining / possible next steps:**
1. Phone OTP verification (needs an SMS provider).
2. Redis-backed rate-limit store + search caching (production hardening).
3. CI pipeline + Dockerfile / docker-compose + deployment config.
4. Geolocation via PostGIS (currently haversine in-memory for `nearest` sort).

---

## Appendix — Backend Folder Structure

```
SD2/
├── prisma.config.ts               # Prisma v7 defineConfig (datasource + migrations path + seed command)
├── prisma/
│   ├── schema/                    # multi-file schema (schema.prisma + model files)
│   │   ├── schema.prisma          # generator → generated/prisma, datasource postgresql
│   │   ├── enum.prisma            # UserRole, ListingStatus, InquiryStatus
│   │   ├── user.prisma            # + isBanned, + verificationCodes relation
│   │   ├── passwordResetToken.prisma
│   │   ├── verificationCode.prisma
│   │   ├── refreshToken.prisma
│   │   ├── listing.prisma         # latitude/longitude nullable
│   │   ├── listingImage.prisma
│   │   ├── favorite.prisma
│   │   ├── inquiry.prisma
│   │   ├── review.prisma
│   │   └── aiSearchLog.prisma
│   ├── migrations/                # init, add_password_reset_token, make_listing_coords_nullable, add_user_banned, add_verification_code, add_verification_code_created_at
│   └── seed.ts                    # 2 landlords + 2 tenants + 1 admin, listings/images/favorites/inquiries
├── generated/prisma/              # generated client (gitignored)
├── src/
│   ├── config/
│   │   ├── logger.ts              # Winston setup + morgan stream
│   │   ├── mailer.ts              # Nodemailer transport (SMTP) + dev-log fallback for reset emails
│   │   └── cloudinary.ts          # Cloudinary config for listing images
│   ├── middleware/
│   │   ├── auth.ts                # authenticate (JWT + DB role/isBanned/isVerified check) + authorize(...roles) + requireVerified
│   │   ├── isOwner.ts             # listing.landlord_id === req.user.id
│   │   ├── isSelf.ts              # req.params.id === req.user.id (profile self-update)
│   │   ├── rateLimiter.ts         # global + auth/inquiry/ai limiters (+ test no-op)
│   │   ├── validate.ts            # generic Zod validation middleware
│   │   ├── upload.ts              # Multer config (file type/size validation)
│   │   ├── errorHandler.ts        # centralized error middleware
│   │   └── notFound.ts            # 404 handler
│   ├── modules/
│   │   ├── auth/                  # controller/service/routes/schema/types
│   │   ├── users/
│   │   ├── listings/              # + listing.filters.ts (query → Prisma where)
│   │   ├── listingImages/
│   │   ├── favorites/
│   │   ├── inquiries/
│   │   ├── reviews/
│   │   ├── admin/                 # controller/service/routes/schema (user list/role/ban, listing moderation)
│   │   └── ai/                    # controller/service/routes/schema/types/prompts/fallbackSearch
│   ├── utils/
│   │   ├── AppError.ts            # custom operational error class
│   │   ├── asyncHandler.ts        # wraps async route handlers
│   │   ├── jwt.ts                 # sign/verify access token helpers
│   │   ├── hash.ts                # bcrypt helpers
│   │   ├── apiResponse.ts         # consistent success/error response shape
│   │   ├── param.ts               # safe req.params[name] accessor
│   │   └── pagination.ts          # getPagination / getSkipTake / getPaginationMeta
│   ├── types/
│   │   └── express.d.ts           # extends Express Request with `user`
│   ├── docs/
│   │   └── swagger.ts             # swagger-jsdoc + swagger-ui-express setup
│   ├── routes/
│   │   └── index.ts               # mounts all module routers under /api
│   ├── lib/
│   │   └── prisma.ts              # PrismaClient + @prisma/adapter-pg
│   ├── app.ts                     # express app setup (middleware chain, routes)
│   └── server.ts                  # entrypoint — connects DB, starts HTTP server
└── tests/
    ├── globalSetup.ts             # JWT secrets, test DB setup
    ├── helpers.ts                 # request/test helpers
    ├── integration.test.ts
    ├── integration/               # users / reviews / admin / middleware Supertest suites
    └── unit/
        └── utils.test.ts
```
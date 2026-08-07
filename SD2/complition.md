# To-Let — Completion Notes

## Project Setup
- TypeScript/Express.js backend with ESM (`"type": "module"`)
- `package.json` merged from old project template — name `to-let-backend`, description "Flat Rental Marketplace Backend"
- Dependencies: express, prisma, pg, bcryptjs, jsonwebtoken, cookie-parser, zod, helmet, cors, morgan, winston, dotenv, express-rate-limit, multer, cloudinary, openai, @google/generative-ai, groq-sdk, stripe, sslcommerz-lts, firebase-admin, nodemailer, swagger-jsdoc, swagger-ui-express, etc.

## Infrastructure

| File | Purpose |
|------|---------|
| `src/server.ts` | Entrypoint — connects Prisma, starts Express on port 3000 |
| `src/app.ts` | Express app — middleware stack: helmet → cors → json → cookieParser → morgan → swagger docs → routes → notFound → errorHandler |
| `src/lib/prisma.ts` | PrismaClient singleton with `@prisma/adapter-pg` |
| `src/routes/index.ts` | Mounts all module routers under `/api` |
| `src/config/cloudinary.ts` | Cloudinary SDK config |

## Prisma Schema (`prisma/schema/`)

12 model files covering the full schema from planning.md:

| File | Model | Key features |
|------|-------|-------------|
| `schema.prisma` | Generator + datasource (PostgreSQL) |
| `enum.prisma` | `UserRole` (TENANT/LANDLORD/ADMIN), `ListingStatus` (AVAILABLE/RENTED/INACTIVE), `InquiryStatus` (PENDING/RESPONDED/CLOSED) |
| `user.prisma` | `User` | UUID PK, unique email, role, password_hash, is_verified, relations to all modules |
| `refreshToken.prisma` | `RefreshToken` | token_hash, expires_at, revoked |
| `passwordResetToken.prisma` | `PasswordResetToken` | token_hash, expires_at, used_at (1-time use) |
| `listing.prisma` | `Listing` | price, size_sqft, bedrooms, bathrooms, floor_number, lat/lng, amenities[], status; indexes on city+area, price, bedrooms+bathrooms, status, lat+lng, GIN on amenities |
| `listingImage.prisma` | `ListingImage` | image_url, is_primary, order_index |
| `favorite.prisma` | `Favorite` | `@@unique([userId, listingId])` |
| `inquiry.prisma` | `Inquiry` | message, status |
| `review.prisma` | `Review` | rating (1-5), comment |
| `aiSearchLog.prisma` | `AiSearchLog` | query_text, parsed_filters (JsonB) |

Migrations: `20260729214052_init` (all tables) + `20260806000000_add_password_reset_token` (password_reset_tokens table).

## Modules Built

### Auth (`/api/auth`)
| Method | Path | Auth | Rate limit | Description |
|--------|------|------|------------|-------------|
| POST | `/api/auth/register` | No | 10/min | Register (name, email, phone, password, role) |
| POST | `/api/auth/login` | No | 10/min | Login, returns access token + refreshToken cookie |
| POST | `/api/auth/logout` | Bearer | — | Revokes refresh token, clears cookie |
| POST | `/api/auth/refresh` | Cookie | 10/min | Rotates refresh token, issues new access token |
| POST | `/api/auth/forgot-password` | No | 10/min | Issues hashed reset token (32-byte hex, 15 min TTL); generic message to prevent email enumeration |
| POST | `/api/auth/reset-password` | No | 10/min | Validates 1-time token, re-hashes password, updates user + marks token used in a transaction |
| GET | `/api/auth/me` | Bearer | — | Current user profile |

Files: `auth.controller.ts`, `auth.service.ts`, `auth.routes.ts`, `auth.schema.ts`, `auth.types.ts`

### Users (`/api/users`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/users/:id` | Public | Public profile (never exposes password_hash) |
| PATCH | `/api/users/:id` | Bearer + `isSelf` | Update own profile (name, phone) |
| GET | `/api/users/:id/listings` | Public | Listings by a landlord user (400 if not a landlord) |

Files: `user.controller.ts`, `user.service.ts`, `user.routes.ts`, `user.schema.ts`, `user.types.ts`

### Listings (`/api/listings`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/listings` | Public | Paginated, filtered (price, beds, baths, area, city, status, sort) |
| POST | `/api/listings` | Landlord | Create listing |
| GET | `/api/listings/:id` | Public | Get single listing |
| PUT | `/api/listings/:id` | Landlord (owner) | Update listing |
| DELETE | `/api/listings/:id` | Landlord (owner) | Delete listing |
| PATCH | `/api/listings/:id/status` | Landlord (owner) | Change status (AVAILABLE/RENTED/INACTIVE) |
| GET | `/api/listings/landlord/:landlordId` | Public | All listings by a landlord |

Files: `listing.controller.ts`, `listing.service.ts`, `listing.routes.ts`, `listing.schema.ts`, `listing.types.ts`, `listing.filters.ts`

### Listing Images (`/api/listings/:id/images`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/listings/:id/images` | Landlord (owner) | Upload image (multipart, validates type/size) |
| DELETE | `/api/listings/:id/images/:imageId` | Landlord (owner) | Delete image from Cloudinary + DB |

Files: `image.controller.ts`, `image.service.ts`, `image.routes.ts`

### Favorites (`/api/favorites`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/favorites` | Tenant | Save a listing (unique constraint) |
| GET | `/api/favorites` | Tenant | Paginated saved listings |
| DELETE | `/api/favorites/:id` | Tenant | Remove favorite (owner only) |

Files: `favorite.controller.ts`, `favorite.service.ts`, `favorite.routes.ts`, `favorite.schema.ts`

### Inquiries (`/api/inquiries`)
| Method | Path | Auth | Rate limit | Description |
|--------|------|------|------------|-------------|
| POST | `/api/inquiries` | Tenant | 10/min + 5/day | Send inquiry about a listing |
| GET | `/api/inquiries/sent` | Tenant | — | Tenant's sent inquiries |
| GET | `/api/inquiries/received` | Landlord | — | Inquiries on landlord's listings |
| PATCH | `/api/inquiries/:id/status` | Landlord | — | Update status (PENDING/RESPONDED/CLOSED) |

Files: `inquiry.controller.ts`, `inquiry.service.ts`, `inquiry.routes.ts`, `inquiry.schema.ts`

### Reviews (`/api/reviews`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/reviews` | Any authenticated | Create review (listingId, rating 1-5, comment); 403 if author owns the listing |
| GET | `/api/reviews/listing/:listingId` | Public | All reviews for a listing |
| PUT | `/api/reviews/:id` | Owner | Update own review (rating, comment) |
| DELETE | `/api/reviews/:id` | Owner | Delete own review |

Files: `review.controller.ts`, `review.service.ts`, `review.routes.ts`, `review.schema.ts`

**Review rules:** one review per user per listing (409 `ALREADY_REVIEWED`); a landlord cannot review their own listing (403 `CANNOT_REVIEW_OWN_LISTING`); update/delete only by the review author (403 otherwise).

### AI (`/api/ai`)
| Method | Path | Limit | Description |
|--------|------|-------|-------------|
| POST | `/api/ai/recommend` | 10/min | Natural language → AI parses → Prisma query; fallbackSearch on failure |
| POST | `/api/ai/price` | 10/min | Area prices — Groq parses area/budget → Prisma → min/avg/max summary + cheapest + best-reviewed flats + Groq insight |
| GET | `/api/ai/similar/:listingId` | — | ±30% price, same area, ±1 bedroom |

Files: `ai.controller.ts`, `ai.service.ts`, `ai.routes.ts`, `ai.schema.ts`, `ai.types.ts`, `prompts.ts`, `fallbackSearch.ts`

**AI flow:** Groq (LLM) parses query → `ParsedFilters` (maxPrice, minBedrooms, area, amenities) → clamped → `buildWhereClause()` → Prisma query. Falls back to keyword search if AI fails/times out/returns empty.

**`fallbackSearch.ts`** is content-aware: strips stop-words, parses price hints (`under/up to/৳Nk/taka` — `lte` for budget keywords, `equals` otherwise), detects bedroom counts from "2bhk"/"2 bed"/"2br" (structured field OR title), intersects keyword + bedroom + price constraints, capped at 20 results.

## Middleware

| File | Purpose |
|------|---------|
| `auth.ts` | `authenticate` (JWT verify) + `authorize(...roles)` |
| `validate.ts` | Generic Zod validation (body/query/params) |
| `isOwner.ts` | Checks `listing.landlordId === req.user.id`, returns 403 |
| `isSelf.ts` | Checks `req.params.id === req.user.id` for profile self-update, returns 403 |
| `rateLimiter.ts` | `globalLimiter` (100/15min), `authLimiter` (10/min), `inquiryLimiter` (10/min), `aiLimiter` (10/min); all no-op when `NODE_ENV=test` |
| `upload.ts` | Multer — memory storage, whitelist JPEG/PNG/GIF/WebP, 5MB limit |
| `errorHandler.ts` | AppError-aware, consistent JSON error shape |
| `notFound.ts` | 404 handler |

## Config

| File | Purpose |
|------|---------|
| `src/config/cloudinary.ts` | Cloudinary v2 config from env vars |
| `src/config/logger.ts` | Winston setup — JSON in production (with `logs/error.log` + `logs/warn.log` files), colorized console in dev; `stream()` feeds morgan |

## Utilities

| File | Purpose |
|------|---------|
| `jwt.ts` | `generateAccessToken()` / `verifyAccessToken()` |
| `hash.ts` | `hashPassword()`, `comparePassword()`, `hashToken()` (SHA-256 for refresh + password-reset tokens) |
| `param.ts` | Safe `req.params[name]` accessor (handles array values) |
| `asyncHandler.ts` | Wraps async route handlers, forwards errors |
| `AppError.ts` | Custom error class (statusCode, code, message) |
| `apiResponse.ts` | `success()` and `fail()` response helpers |

## Seed Script

- `prisma/seed.ts` (`npm run prisma:seed`) — clears tables in dependency order, then creates:
  - Users: 2 landlords + 2 tenants (password: `password123` for all)
  - 7 sample listings across Chattogram (Panchlaish, Kumira, Khulshi, Nasirabad, Agrabad, Halishahar)
  - 2 placeholder images (picsum.photos) per listing
  - 4 favorites + 3 inquiries

## API Documentation

- Swagger UI served at `GET /api/docs` (OpenAPI 3.0)
- All route files annotated with `@swagger` JSDoc blocks
- Components: `Error`, `Pagination` schemas; `bearerAuth` security scheme

## Security & Rate Limiting

- **CORS** — restricted to `CLIENT_URL` / `FRONTEND_URL` env vars, falls back to `localhost:5173` for dev
- **Helmet** — security headers with `crossOriginResourcePolicy: "cross-origin"`
- **Global limiter** — `globalLimiter`, 100 req/15min per IP
- **Auth endpoints** — 10 req/min (`authLimiter`)
- **Inquiry creation** — 10 req/min + service-level 5 inquiries/day per tenant
- **AI recommend** — 10 req/min (cost control on LLM calls)- **Image upload** — file type/size validated by Multer
- **Ownership** — `isOwner` middleware on all listing mutations; `isSelf` on profile updates; review ownership checked in `review.service.ts` (`findOwnedReview` → 404/403)
- **Password reset tokens** — random 32-byte hex, stored as SHA-256 hash only, 15-min expiry, single-use, generic response to prevent email enumeration

## Remaining (from planning.md)

- [ ] Geo-radius / PostGIS search queries (lat/lng + bounding box exists in schema, not used for geo search)
- [ ] AI search logging wired to DB (`ai_search_logs` table exists, not written)
- [ ] Redis integration (rate-limit store, caching)
- [ ] Email delivery for password reset (link is logged to console in dev)
- [ ] SSLCommerz / Stripe payment integration
- [x] Tests (Jest + Supertest) — 93 tests / 5 suites, incl. full reviews coverage (create/list/update/delete, ownership guards, self-review block)
- [ ] Deployment config (Dockerfile, CI, env template)

## Latest: Reviews & Ratings feature (Aug 2026)

### Backend — Reviews module extended

| File | Change |
|------|--------|
| `src/modules/reviews/review.service.ts` | `create()` now blocks the listing's own landlord (403 `CANNOT_REVIEW_OWN_LISTING`); added `update()` + `remove()` backed by a shared `findOwnedReview()` guard (404 if missing, 403 if not the author) |
| `src/modules/reviews/review.routes.ts` | POST `/api/reviews` open to **any authenticated user** (was tenant-only via `authorize("TENANT")`); added `PUT /api/reviews/:id` + `DELETE /api/reviews/:id` (authenticated) with Swagger docs |
| `src/modules/reviews/review.schema.ts` | Extracted shared `ratingField` / `commentField`; added `updateReviewSchema` (rating + comment only) |
| `src/modules/reviews/review.controller.ts` | Added `update` + `remove` handlers using the shared `param()` helper |
| `tests/integration/reviews.test.ts` | Updated self-review test to expect `CANNOT_REVIEW_OWN_LISTING`; added 7 tests (landlord reviews another landlord's listing 201, PUT own 200, PUT foreign 403, PUT rating validation 400, PUT unauthenticated 401, DELETE missing 404, DELETE own 200) → **93/93 tests passing** |

### Frontend — comment box + rating UI (`frontend/`)

- `src/api/reviews.api.ts` — getReviewsByListing / createReview / updateReview / deleteReview (typed against `ApiSuccess`)
- `src/types/review.types.ts`, `src/schemas/review.schema.ts` (rating int 1-5, comment 5-1000, mirrors backend)
- `src/hooks/queries/useReviews.ts` + `src/hooks/mutations/useCreateReview.ts` / `useUpdateReview.ts` / `useDeleteReview.ts` (invalidate `['reviews', listingId]`)
- `src/components/reviews/` — `RatingStars` (interactive + read-only), `ReviewForm` (create / edit-prefill / delete-with-confirm; sign-in prompt when logged out; hidden for the listing's own landlord), `ReviewSection` (average rating + count, comment list, loading/empty/error states)
- `src/pages/ListingDetailsPage.tsx` — renders `<ReviewSection>` below the "Listed by" card
- Tests: MSW review handlers added to `tests/mocks/handlers.ts`; new `tests/reviews.test.tsx` **6 tests** → **35/35 frontend tests passing**
- Also fixed 6 stale pre-existing frontend tests (`listingsBrowse.test.tsx`, `createListing.test.tsx`) asserting pre-redesign UI strings ("Listings" heading, "Price (monthly)", "e.g. Gulshan", "No listings match your filters")

### Verified

- Backend: `npm run build` (tsc) clean; `npm test` → **93/93 pass**
- Frontend: `npm run lint` clean (pre-existing warnings only); `npx tsc -b` clean; `npm test` → **35/35 pass**; `npm run build` (vite) succeeds

## Latest: Groq AI integration + area price estimator (Aug 2026)

Replaced the AI provider (Google Gemini) with **Groq** everywhere and added a new natural-language "current rents by area" endpoint.

### Backend (`SD2/`)

| File | Change |
|------|--------|
| `src/modules/ai/ai.service.ts` | Swapped `@google/generative-ai` → `groq-sdk` (`GROQ_API_KEY`, model `llama-3.3-70b-versatile` via `GROQ_MODEL`, 8s abort, JSON mode for parsing / plain text for the insight). Added `areaPrice(query)`: Groq parses `{area, maxPrice?}` → Prisma `AVAILABLE` query on area/city/address → min/avg/max price summary + `cheapest` (price asc) + `bestReviewed` (avg rating desc) + a Groq-generated plain-text `insight`. Falls back to DB-only (no insight) if the insight call fails; empty result returns zeroed summary. |
| `src/modules/ai/prompts.ts` | Added `EXTRACT_AREA_PROMPT` (area + optional maxPrice extraction). |
| `src/modules/ai/ai.types.ts` | Added `ParsedArea`, `PriceSummary`, `AreaPriceResult`. |
| `src/modules/ai/ai.schema.ts` | Added `priceSchema` (query min 2). |
| `src/modules/ai/ai.controller.ts` | Added `areaPrice` handler. |
| `src/modules/ai/ai.routes.ts` | Added `POST /api/ai/price` (Swagger-documented, `aiLimiter`, `validate`). |
| `package.json` | Removed `@google/generative-ai` dependency. |
| `.env` | Added `GROQ_API_KEY` + optional `GROQ_MODEL` (gitignored). |
| `tests/integration.test.ts` | Re-mocked `groq-sdk` (was `@google/generative-ai`); renamed Gemini → Groq failure test; added 3 tests for `/api/ai/price` (success, Groq-failure fallback, validation 400). |

### Frontend (`frontend/`)

| File | Change |
|------|--------|
| `src/api/ai.api.ts` | Added `AreaPriceResult` type + `areaPrice()` client. |
| `src/hooks/queries/useAreaPrice.ts` | New mutation hook (mirrors `useAIRecommend`). |
| `src/pages/AISearchPage.tsx` | Added **Recommend / Area prices** tab switch with per-mode placeholder, heading, and submit handling. |
| `src/components/ai/AreaPriceResult.tsx` | New — stat cards (count/min/avg/max), Groq insight callout, cheapest + best-reviewed `ListingGrid`s, loading/empty states. |
| `tests/mocks/handlers.ts` | Added MSW handlers for `POST /api/ai/recommend` and `POST /api/ai/price`. |

### Notes

- Groq key is only stored in `SD2/.env` (gitignored) — **rotate the key** since it was shared in plaintext during the session.
- Backend unit tests pass (19); full integration suite compiles but requires a running Postgres (documented prereq, none available during this session).
- Frontend: lint (2 pre-existing warnings only), `npx tsc -b`, 35/35 tests, and `npm run build` all pass.

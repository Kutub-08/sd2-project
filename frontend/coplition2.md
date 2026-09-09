# Completion Tracker — frontend vs planning2.md

> Last updated: Aug 20, 2026 — after the **Bug-fix + Admin pass** (Listing type alignment,
> AI-search error/retry, tenant favorite hearts, `/admin` console), on top of the **Auth pass**
> (route guards + email verification + forgot/reset password + editable profile), the **Reviews +
> Tests + AI sort** pass (and the **UI overhaul + AI integration + bug-solve** pass, commit
> `Update-UI-AI-Integraion-bug-solve`). Build steps below match planning2.md §11.

## What's Been Done (frontend)

The To-Let React frontend is feature-complete against the core scope of planning2.md. Highlights:

- **Stack** — React 19 + Vite 8 + TypeScript, React Router v7, Redux Toolkit (auth/UI), TanStack Query (server state), Tailwind v4 design tokens.
- **Full dark "ink glassmorphism" UI theme** — `@theme` tokens in `index.css`, centralized class tokens + framer-motion variants in `styles/tokens.tsx`, mobile-first responsive throughout.
- **Auth** — Login/Register forms (react-hook-form + Zod) + Redux auth slice + role-aware `ProtectedRoute` **wired into AppRouter**; `/verify-email` (6-digit OTP keyring + EmailVerificationBanner), `/forgot-password` + `/reset-password`; editable `/profile` (name/phone, email read-only).
- **Home/landing** — animated `HeroSection` (parallax blobs, count-up stats, area autocomplete, budget search), How-It-Works, Why To-Let, landlord CTA.
- **Browse & detail** — ListingsPage with grid ⇄ **map toggle** (OpenStreetMap embed), FilterPanel synced to URL, pagination; ListingDetailsPage with hero gallery + image lightbox + inquiry form + similar flats + mobile inquiry bar.
- **Dashboards** — landlord stats + inline status table, create/edit listing (react-dropzone image upload); tenant favorites + sent inquiries; dashboard sidebar layout.
- **AI Search** — `/ai-search` with animated layout, "Understood as" parsed-filter chips, "AI matched" vs "Keyword results" badges, fallback toast, AISortDropdown (incl. geolocation "nearest").
- **Reviews** — `ReviewsSection` on listing details (average + animated 5-tier distribution bar), `StarPicker`/`StarRating`, tenant-only posting with already-reviewed guard, `useReviews`/`useCreateReview`, zod `review.schema.ts`.
- **Tests** — Vitest + RTL + MSW (`tests/` with 12 test files, `setupTests.ts`, `testUtils.tsx`, `mocks/handlers.ts` + `server.ts`). 52 tests, all green; lint (oxlint) + `tsc -b` clean.
- **Polish** — ErrorBoundary, EmptyStates, Skeleton loaders, sonner Toasts, scroll-progress bar, `prefers-reduced-motion` support.

---

| # | Build Step (from planning2.md §11) | Status | Notes |
|---|--------------------------------------|--------|-------|
| 1 | Vite + TS scaffold, Tailwind v4 + design tokens, routing skeleton | ✅ Done | Vite 8, React 19, TS 6, Tailwind v4, `@theme` ink/glass tokens in `index.css`, all routes in AppRouter.tsx |
| 2 | Axios client + interceptors + typed API layer stubs | ✅ Done | `axiosClient.ts`, `interceptors.ts`, 7 API modules (incl. `reviews.api.ts`) |
| 3 | Auth pages (Login/Register) + Redux auth slice + ProtectedRoute | ✅ Done | LoginForm + RegisterForm with react-hook-form + Zod, `authSlice.ts` (adds `updateUser`), `ProtectedRoute.tsx` **wired into AppRouter** (any-role guard on `/profile` + `/verify-email`, role guards on tenant/landlord routes) |
| 4 | Reusable UI components (`components/ui/`) + `styles/tokens.tsx` | ✅ Done | Button, Input, Select, Modal, Pagination, Skeleton, Badge, EmptyState, GlowDot, Toast; glass tokens + framer variants |
| 5 | Listings browse page — grid ⇄ map toggle, FilterPanel, Pagination, TanStack Query | ✅ Done | ListingsPage with Grid/Map toggle (OpenStreetMap embed), FilterPanel, Pagination, SortDropdown, useListings |
| 6 | Listing details page — hero gallery + lightbox + inquiry + similar flats | ✅ Done | ListingDetailsPage: hero gallery, ImageLightbox, stat cards, amenities, landlord card, similar flats, mobile inquiry bar |
| 7 | Landlord dashboard — create/edit form, image upload, stats + table with inline status | ✅ Done | LandlordDashboard (stat cards + table + inline status select), CreateListingPage, EditListingPage, ListingForm (react-dropzone) |
| 8 | Tenant dashboard — favorites, sent inquiries | ✅ Done | TenantDashboard, FavoritesPage, SentInquiriesPage |
| 9 | Landlord inquiries received view | ✅ Done | ReceivedInquiriesPage |
| 10 | New UI theme pass — Navbar/Footer/AppLayout, Home redesign | ✅ Done | Glass Navbar (scroll-aware), multi-column Footer, AppLayout ScrollProgress bar, Home = HeroSection + How It Works + Why To-Let + landlord CTA |
| 11 | AI search page + "understood as" chips + results | ✅ Done | AISearchPage (animated layout, inline search bar), AIResultsList (parsed-filter chips, "AI matched" / "Keyword results" badge), useAIRecommend, AISortDropdown (relevance/price_asc/price_desc/highest_rated/most_reviewed/nearest, geolocation for "nearest") |
| 12 | Reviews (optional) | ✅ Done | components/reviews/ (StarRating, StarPicker, ReviewsSection, ReviewForm, ReviewCard), `reviews.api.ts`, `useReviews`/`useCreateReview`, `review.schema.ts` + `review.types.ts` |
| 13 | Error boundaries, loading/empty states polish, responsive QA, reduced-motion | ✅ Partial | ErrorBoundary + EmptyState + Skeleton built; reduced-motion respected in hero; full QA still pending |
| 14 | Tests (unit + integration with MSW) | ✅ Done | Flat `tests/` (no unit/integration split): setupTests.ts, testUtils.tsx, mocks/server.ts + handlers.ts (stateful `currentUser` + verify/forgot/reset + PATCH users), 10 test files (authSlice, Pagination, loginFlow, listingsBrowse, aiSearch, createListing, reviews, verifyEmail, forgotPassword, profileEdit) |
| 15 | Deployment config (env vars, Vercel setup) | ❌ Not started | Only `.env` with `VITE_API_BASE_URL`, no Vercel config |
| 16 | Auth pass: route guards + email verification + forgot/reset password + editable profile | ✅ Done | Guards wired; `/verify-email` OTP keyring (`CodeEntry`) + `EmailVerificationBanner` in AppLayout; `/forgot-password` (anti-enumeration success) + `/reset-password` (token from URL, confirm match); editable `/profile`; `users.api.ts` (`updateProfile` unwraps `res.data.data`); `forgotPasswordSchema`/`resetPasswordSchema`/`verifyEmailSchema`/`profileSchema`; CreateListingPage handles `EMAIL_NOT_VERIFIED` → redirect to `/verify-email`; login form links to forgot-password |
| 17 | Bug fixes + admin module | ✅ Done | Listing type aligned with real API (`address`/`latitude`/`longitude` nullable, `floorNumber: number | null` — fixes edit-address wipe); AI search error state + "Try again" retry; tenant favorite hearts on browse + details (optimistic toggle w/ snapshot rollback, `useFavoriteIds` map); `/admin` Admin Console (Users + Listings tabs, role change, ban/unban, take down/restore, TO LET board status chips, pagination) + `admin.api.ts` + MSW admin handlers + `tests/admin.test.tsx` |

## Missing from planned folder structure

| Path | Status |
|------|--------|
| `hooks/useAuth.ts` | ❌ (convenience wrapper not created — auth read via `useSelector` on auth slice) |
| `features/auth/authSlice.test.ts` | ❌ (slice test lives at `tests/authSlice.test.ts`) |
| `components/forms/ReviewForm.tsx` | ❌ (review form lives at `components/reviews/ReviewForm.tsx`) |

## Extras (beyond the original planning2.md — now documented there after the Aug 20 update)

### New UI/theme work (ink glassmorphism)
- `src/styles/tokens.tsx` — centralized glass class tokens + framer-motion variants
- `src/index.css` — Tailwind v4 `@theme` tokens (ink/ink-soft/ink-deep/teal/amberglow/paper/mist/line), Space Grotesk + Inter fonts, skyline `tolet-window` styles, `prefers-reduced-motion` handling
- `components/hero/HeroSection.tsx` — animated hero: parallax gradient blobs, count-up stats, area-suggestion autocomplete, area+budget search → /listings
- `components/hero/LightningBackground.tsx` — canvas lightning/stars/clouds backdrop
- `components/layout/AppLayout.tsx` — added `ScrollProgress` bar (framer-motion `useScroll`)
- `components/layout/DashboardLayout.tsx` — sidebar shell wrapping dashboards
- `components/ui/EmptyState.tsx`, `components/ui/GlowDot.tsx`, `components/ui/Toast.tsx`
- Redesigned: Navbar, Footer, Button, Badge, Input, Select, Modal, Pagination, Skeleton, FilterPanel, ListingCard, SortDropdown

### New features
- **Grid ⇄ Map view** on ListingsPage (`MapView` with OpenStreetMap iframe + selected-listing marker)
- **LandlordDashboard table** — stat cards (Total/Available/Rented/Inactive), responsive table with inline status `<select>` (via `useUpdateListing`) and view/edit/delete row actions
- **AI search polish** — "Understood as" parsed-filter chips, "AI matched" vs "Keyword results" badges, `parsedFilters` rendering, `AISortDropdown` (6 options incl. geolocation "nearest")
- **Listing details polish** — image lightbox (keyboard nav), hero gallery, mobile sticky inquiry bar
- **Reviews** — `components/reviews/` (StarRating, StarPicker, ReviewsSection w/ animated distribution bar, ReviewForm, ReviewCard), `reviews.api.ts`, `useReviews`/`useCreateReview`, `review.schema.ts`, `review.types.ts`, `reviews.test.tsx`
- **Tests** — flat `tests/` dir: `setupTests.ts`, `testUtils.tsx` (`renderWithProviders`), `mocks/server.ts` + `handlers.ts` (auth/listings/favorites/inquiries/reviews/ai endpoints), 7 test files
- **Restyle gap resolved (Aug 20)** — `InquiryForm` + `ReceivedInquiriesPage` restyled to the ink-glass theme; `ListingGallery` and `AISearchBar` **deleted** (dead code — the live gallery is the hero + `ImageLightbox` in ListingDetailsPage, the live AI search bar is inline in AISearchPage).

### Other
- `hooks/mutations/useUpdateInquiryStatus.ts`
- `hooks/queries/useLandlordListings.ts`
- `assets/hero.png`, `assets/react.svg`, `assets/vite.svg`
- `App.css`
- `public/icons.svg`
- Deps added: `framer-motion`, `lucide-react`, `sonner`, `leaflet`/`react-leaflet`

### Auth pass (Aug 20) — newly added
- `src/pages/VerifyEmailPage.tsx` — 6-digit OTP "keyring" (`CodeEntry`, sr-only numeric input, `autoComplete="one-time-code"`); on-mount code request (StrictMode-safe via `mounted` ref + `useCallback`), resend, ALREADY_VERIFIED redirect, dispatches `updateUser({ isVerified: true })`
- `src/pages/ForgotPasswordPage.tsx` — email → anti-enumeration "Check your inbox" success state
- `src/pages/ResetPasswordPage.tsx` — new + confirm password, token from `?token=`, missing-token state
- `src/components/layout/EmailVerificationBanner.tsx` — dismissible amber bar for authed + unverified users, wired into AppLayout
- `src/pages/ProfilePage.tsx` — rewritten to editable (name/phone via react-hook-form + `profileSchema`, email read-only, verification status + verify link); refreshes via `getMe()` after PATCH
- `src/features/auth/authSlice.ts` — new `updateUser(Partial<User>)` reducer (merges + syncs `role`)
- `src/api/users.api.ts` — `updateProfile(id, data)` → PATCH `/users/:id`, returns unwrapped `res.data.data`
- `src/api/auth.api.ts` — `forgotPassword`, `resetPassword`, `requestVerification`, `verifyEmail`
- `src/schemas/auth.schema.ts` — `forgotPasswordSchema`, `resetPasswordSchema` (confirm-match refine), `verifyEmailSchema`, `profileSchema`
- `src/router/AppRouter.tsx` — `ProtectedRoute` wired (any-role on `/profile` + `/verify-email`, `TENANT`/`LANDLORD` role guards, guards redirect to `/login` preserving intended route); new `/forgot-password`, `/reset-password` routes
- `src/features/auth/LoginForm.tsx` — "Forgot password?" link; `src/components/layout/Navbar.tsx` — ADMIN role label
- `src/pages/landlord/CreateListingPage.tsx` — `EMAIL_NOT_VERIFIED` → toast + redirect `/verify-email`
- `tests/verifyEmail.test.tsx`, `tests/forgotPassword.test.tsx`, `tests/profileEdit.test.tsx`; `tests/mocks/handlers.ts` stateful `currentUser` + verify/forgot/reset/PATCH handlers; `tests/createListing.test.tsx` + `tests/listingsBrowse.test.tsx` assertions updated to current UI copy (e.g. "Price (monthly, ৳)", "Available flats in Bangladesh", "e.g. Bashundhara", "No flats match your filters")

### Bug-fix + Admin pass (Aug 20) — newly added
- `src/types/listing.types.ts` — aligned with the real API: `address`, `latitude`/`longitude` (nullable), `floorNumber: number | null`; removed `division`/`lat`/`lng`; `ListingImage` no longer carries `createdAt`. Fixes the bug where editing a listing wiped its address/coords.
- `src/hooks/queries/useAIRecommend.ts` — rewritten with `hasError` state + `onError`; `src/pages/AISearchPage.tsx` shows a sonner toast + error card with a **"Try again"** retry button on failure (no more silent client-side keyword fallback).
- `src/hooks/queries/useFavoriteIds.ts` — new tenant-only hook returning `Set<listingId>` + `Map<listingId, favoriteId>`; `useFavorites(page, limit, enabled)` gained an `enabled` flag; `useToggleFavorite` rewritten with optimistic snapshot rollback + invalidation of `['favorites']`, `['listings']`, `['listing', id]`.
- Hearts wired into `ListingsPage` grid and `ListingDetailsPage` (hero Save button + similar-flat cards) — tenant-only via `useFavoriteIds`, with `favoriteId` passed so un-favoriting removes the correct record.
- `src/pages/admin/AdminDashboard.tsx` — new `/admin` route (ADMIN-guarded) with **Users** tab (role filter, inline role `<select>`, ban/unban, verified/banned badges, pagination, self-row guard) and **Listings** tab (status filter, take down/restore, pagination). Price coerced with `Number()` (backend returns Decimal strings). Status column uses the **TO LET board** chip — solid amber "TO LET" (available), teal "LET" (rented), dashed struck-through "TO LET" (taken down); masthead carries a small amber TO LET board glyph + "Keep the rental board true" tagline.
- `src/api/admin.api.ts` — 5 ADMIN endpoints (`getAdminUsers`, `updateUserRole`, `toggleUserBan`, `getAdminListings`, `updateListingStatus`) unwrapping `res.data.data`.
- `src/components/layout/DashboardSidebar.tsx` — ADMIN "Admin Console" link (ping dot recolored teal); `Navbar.tsx` — ADMIN dashboard link → `/admin`.
- `tests/editListing.test.tsx` (prefill + preserve-address-on-submit via `updateListing` spy), `tests/admin.test.tsx` (users table, role filter, ban/unban, role change, listings tab, TENANT guard), browse favorite-toggle test; MSW admin handlers + stateful `mockUsers`.

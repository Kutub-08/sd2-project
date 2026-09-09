Frontend Planning — To-Let (Flat Rental Marketplace)
1. Tech Stack
Layer	Choice
Framework	React 19 (Vite
Language	TypeScript 6 (`erasableSyntaxOnly` + `verbatimModuleSyntax` in tsconfig.app.json)
Routing	React Router v7
State Management	Redux Toolkit (global: auth, UI) + TanStack Query (server state: listings, favorites, inquiries, reviews, AI)
Styling	Tailwind CSS v4 via `@tailwindcss/vite` + custom `@theme` tokens (ink/glass design system)
Motion	Framer Motion (hero, scroll progress, view reveals, layout transitions, review distribution bar)
Icons		lucide-react
Fonts		Space Grotesk (display) + Inter (body)
Forms & Validation	React Hook Form + Zod v4 (shared validation logic mirroring backend schemas)
API Client	Axios (with interceptors for JWT attach + refresh)
Maps	OpenStreetMap iframe embed on ListingsPage (grid ⇄ map toggle). `leaflet`/`react-leaflet` installed but unused
Image Handling	react-dropzone (landlord upload UI, JPEG/PNG/GIF/WebP, 5MB max, previews + cover marker)
Notifications	sonner (with custom Toast wrapper)
Testing	Vitest + React Testing Library + MSW (Mock Service Worker) — `npm test` = `vitest run`
Deployment	Vercel (planned, not yet configured — only `.env` with `VITE_API_BASE_URL=/api`)
2. High-Level Architecture
main.tsx
  └── StrictMode
        └── BrowserRouter
              ├── ReduxProvider (auth state, UI filters)
              └── QueryClientProvider (TanStack Query, 5m staleTime, retry 1, no refetchOnWindowFocus)
                    └── App.tsx
                          ├── ErrorBoundary (class-based, "Something went wrong" fallback)
                          └── AppRouter (Routes under AppLayout)
                                └── AppLayout (public chrome)
                                      ├── ScrollProgress (framer-motion useScroll top bar)
                                      ├── Navbar (glass, scroll-aware, role-aware)
                                      ├── Outlet
                                      └── Footer (multi-column + landlord CTA)
                                      
                                ├── Public
                                │     ├── Home (HeroSection + How It Works + Why To-Let + landlord CTA)
                                │     ├── Listings (grid ⇄ map toggle)
                                │     ├── ListingDetails (hero gallery, lightbox, inquiry, ReviewsSection, similar flats)
                                │     ├── AI Search (sortable results)
                                │     ├── Login / Register
                                │     └── NotFound
                                │
                                ├── Tenant pages (wrapped in DashboardLayout)
                                │     ├── Dashboard (favorites, inquiries sent)
                                │     └── Profile (read-only)
                                │
                                └── Landlord pages (wrapped in DashboardLayout)
                                      ├── Dashboard (my listings table, stats, status inline edit)
                                      ├── Create/Edit Listing
                                      └── Received Inquiries
Server state (listings, favorites, inquiries, reviews, AI results) → TanStack Query, so caching/loading/error states come mostly for free.
Client/global state (logged-in user, access token, active filter panel state) → Redux Toolkit slices.
Route guards: `ProtectedRoute` is wired into AppRouter. `/profile` and `/verify-email` require authentication (any role); tenant routes require `TENANT`, landlord routes require `LANDLORD`, admin routes require `ADMIN`. Guards redirect unauthenticated users to `/login` (preserving the intended route) and mis-roled users to `/`; the Axios 401 interceptor still backs up against expired access tokens (auto-refresh, else logout + redirect `/login`).
3. Pages / Routes
Route	Access	Purpose
/	Public	Home — HeroSection (animated skyline, area autocomplete, budget search), How It Works, Why To-Let, landlord CTA
/listings	Public	Browse all listings, FilterPanel + SortDropdown + Pagination + Grid/Map view toggle (OSM iframe)
/listings/:id	Public	Listing hero gallery + lightbox, stats, description, amenities, landlord card, InquiryForm, ReviewsSection, similar flats, mobile inquiry bar
/ai-search	Public	Natural-language search → AI-parsed results ("Understood as" chips, AI vs keyword badges, AISortDropdown incl. geolocation "nearest")
/login	Public	Login form (+ "Forgot password?" link)
/register	Public	Register form (role selector: tenant/landlord)
/forgot-password	Public	Email → anti-enumeration "check your inbox" success state → /reset-password
/reset-password	Public	New password + confirm (token from `?token=`); missing-token state
/verify-email	Authenticated	6-digit OTP ("keyring") verification; on-mount code request + resend; redirects when already verified
/profile	Authenticated	Editable profile (name, phone via react-hook-form + profileSchema; email read-only; verification status + "Verify your email" link)
/dashboard	Tenant	Welcome + stat cards (favorites, inquiries) + recent favorites / recent inquiries
/dashboard/favorites	Tenant	Saved listings (grid of ListingCard + toggle favorite)
/dashboard/inquiries	Tenant	Sent inquiry status
/landlord/dashboard	Landlord	My listings overview (stat cards + table with inline status change, view/edit/delete)
/landlord/listings/new	Landlord	Create listing form (+ react-dropzone image upload)
/landlord/listings/:id/edit	Landlord	Edit listing form (prefilled, hides image upload)
/landlord/inquiries	Landlord	Received inquiries, advance PENDING → RESPONDED → CLOSED
/admin	Admin	Admin Console — tabbed Users (role filter, inline role change, ban/unban, pagination) + Listings (status filter, take down/restore, pagination); TO LET board status chips
*	Public	404 page
4. Frontend Requirements Mapping
Requirement	Implementation
Responsive Design	Tailwind breakpoints; mobile-first listing cards/grid, mobile sticky inquiry bar on details
Reusable Components	Button, Input, Select, Modal, Pagination, ListingCard, FilterPanel, Skeleton, Badge, EmptyState, GlowDot, Toast in components/ui/
Form Validation	React Hook Form + Zod resolver, same validation rules as backend schemas
State Management	Redux Toolkit (auth/ui) + TanStack Query (server state)
API Integration	Centralized Axios instance + typed API service modules per resource
Error Handling	Global Axios interceptor for 401 (auto-refresh or logout), ErrorBoundary component, inline form errors, toast (sonner) for mutation failures
Loading States	Skeleton components for listing cards/detail, spinner for buttons during submit, TanStack Query isLoading/isPending flags
Pagination	Pagination component driven by page/limit query params, synced to URL search params
Search & Filtering	FilterPanel (price range, bedrooms, bathrooms, area, city) synced to URL query string so filters are shareable/bookmarkable; active-filter chips
4a. Design System / UI Theme
- Dark "ink" glassmorphism theme defined as Tailwind v4 `@theme` tokens in src/index.css:
  --color-ink (#0b1420), ink-soft (#101c2c), ink-deep (#070e18), teal (#2fd6bf), amberglow (#ffb45e), paper (#f2f6f4), mist (#8fa3ae), line (white/10)
- Fonts: Space Grotesk (display) + Inter (body), loaded via Google Fonts @import.
- Class-string tokens + framer-motion variants centralized in src/styles/tokens.tsx (GLASS_CARD, GLASS_PANEL, GLASS_BUTTON, GLASS_INPUT, GLASS_PILL, GLASS_LINK_BUTTON, containerVariants, itemVariants, fadeUp).
- Motion: scroll-progress bar (AppLayout), staggered hero/stats reveals, hover lifts on cards/buttons, `prefers-reduced-motion` respected throughout.
- Custom CSS: animated city skyline (`tolet-window` lit/flicker), nav pulse ring, no-scrollbar utility.
- Hero: dusk gradient + drifting teal/orange blobs with mouse parallax, count-up stats, live area suggestions (keyboard navigable), budget+area search → /listings.
- Known restyle gaps (still light-theme): InquiryForm, ListingGallery, AISearchBar use old blue/gray classes; ReceivedInquiriesPage also mixes light-theme styling. — ✅ Resolved Aug 20: InquiryForm + ReceivedInquiriesPage restyled to ink-glass; AISearchBar + ListingGallery removed (unused — the live AI search bar is inline in AISearchPage, the live gallery is the hero + ImageLightbox in ListingDetailsPage).
5. State Management Details
Redux slices (features/)
authSlice — user, accessToken, isAuthenticated, role; actions `setCredentials` / `logout` / `updateUser` (merge partial user + sync role). In-memory (no localStorage), no thunks/extraReducers.
uiSlice — filterPanelOpen; actions `toggleFilterPanel` / `setFilterPanelOpen`.
There is no `hooks/useAuth.ts` — components read auth via `useSelector` on the auth slice.
TanStack Query hooks (hooks/queries/)
useListings(filters) — ['listings', filters] — GET /listings (mapped through toBackendFilters)
useListing(id) — ['listing', id] — GET /listings/:id
useFavorites(page, limit, enabled) — ['favorites', page, limit] — GET /favorites
useFavoriteIds() — ['favorites', 1, 100] — tenant-only Set<listingId> + Map<listingId, favoriteId> of favorited listing ids (powers hearts on browse/details)
useInquiriesSent(page, limit) — ['inquiries', 'sent', page, limit]
useInquiriesReceived(page, limit) — ['inquiries', 'received', page, limit]
useLandlordListings(landlordId) — ['listings', 'landlord', landlordId] — GET /listings/landlord/:id
useReviews(listingId) — ['reviews', listingId] — GET /reviews/listing/:id
useAIRecommend() — lives in queries/ but is a mutation: POST /ai/recommend, holds result in local useState, returns { ...mutation, data, search(query, sort, location) }
Mutations (hooks/mutations/)
useCreateListing — POST /listings; invalidates ['listings']
useUpdateListing — PUT /listings/:id; invalidates ['listings'] + ['listing', id]
useDeleteListing — DELETE /listings/:id; invalidates ['listings']
useToggleFavorite — add/remove favorite with optimistic update (cancel ['favorites'], snapshot/rollback on error, invalidate on settle)
useCreateInquiry — POST /inquiries; invalidates ['inquiries']
useUpdateInquiryStatus — PATCH /inquiries/:id/status; invalidates ['inquiries']
useUploadListingImage — POST /listings/:id/images (multipart); invalidates ['listings'] + ['listing', id]
useCreateReview — POST /reviews; invalidates ['reviews', listingId]
Query keys are namespaced per resource so cache invalidation on mutation is predictable. Known gap: listing mutations don't invalidate the landlord list cache (`['listings','landlord',...]`).
6. API Integration Layer
src/api/
  axiosClient.ts       # base Axios instance, baseURL = VITE_API_BASE_URL (relative /api), withCredentials for refresh cookie
  interceptors.ts       # attaches Bearer token; 401 → POST /auth/refresh once (queue concurrent requests) → retry, else logout + redirect /login
  auth.api.ts           # register, login, refresh, logout (POST /auth/logout), getMe, forgotPassword, resetPassword, requestVerification, verifyEmail
  users.api.ts          # updateProfile (PATCH /users/:id — returns unwrapped `res.data.data`, unlike auth.api.ts)
  listings.api.ts       # getListings, getListingById, createListing, updateListing, deleteListing, getLandlordListings, uploadListingImage
  favorites.api.ts      # addFavorite, getFavorites, removeFavorite
  inquiries.api.ts      # createInquiry, getSentInquiries, getReceivedInquiries, updateInquiryStatus
  ai.api.ts             # recommendListings(query, sort, location?)
  reviews.api.ts        # getReviewByListing, createReview
  admin.api.ts          # getAdminUsers, updateUserRole, toggleUserBan, getAdminListings, updateListingStatus (ADMIN only)
All API functions are typed against shared TypeScript interfaces in types/ mirroring backend response shapes ({ success, data } / { success, error }).
Response-shape gotcha: most modules unwrap `res.data.data` and return the payload directly; auth.api.ts returns the full envelope (`res.data`). Inconsistent but deliberate per-module.
Filters gotcha: `ListingFilters.maxBedrooms`/`maxBathrooms` are typed but never sent; `minBedrooms`/`minBathrooms` map to backend `bedrooms`/`bathrooms`; `division` is in the Listing type but not filterable.
401 handling: interceptor tries POST /auth/refresh once; on failure, dispatches Redux logout() and redirects to /login.
7. Component Structure (by domain)
components/ui/ — generic, reusable, no business logic (10): Button, Input, Select, Modal, Pagination, Skeleton, Badge, EmptyState, GlowDot, Toast
components/layout/ — (7): AppLayout, Navbar, Footer, ProtectedRoute, DashboardLayout, DashboardSidebar, ErrorBoundary
components/hero/ — HeroSection, LightningBackground (animated canvas skyline/lightning/stars backdrop)
components/listings/ — ListingCard, ListingGrid, FilterPanel, SortDropdown
components/forms/ — ListingForm (create/edit, shared), InquiryForm (only 2 files here)
components/ai/ — AIResultsList, AISortDropdown (relevance/price_asc/price_desc/highest_rated/most_reviewed/nearest)
components/reviews/ — StarRating (fractional fill), StarPicker (interactive radio, live verdict), ReviewsSection (avg + distribution bar + list + form), ReviewForm, ReviewCard
Design tokens / motion helpers — src/styles/tokens.tsx
8. Error Handling & Loading States
Global: ErrorBoundary wraps the app for uncaught render errors.
Network errors: Axios interceptor normalizes backend { success:false, error:{ code, message } } into a consistent shape consumed by toast notifications.
Form errors: Zod validation errors mapped inline under each field via React Hook Form's formState.errors.
Loading states: Skeleton loaders for listing grid/detail while isLoading; disabled + spinner state on submit buttons while isPending (mutation).
Empty states: dedicated "No listings match your filters" / "No favorites yet" / "No inquiries" components rather than blank screens.
9. AI Search UX
AISearchPage on /ai-search (inline search bar). On submit: call useAIRecommend(query, sort, location) → animated "understood as" parsed-filter chips (maxPrice, minBedrooms, area, amenities) → results via ListingGrid/ListingCard.
Badges show "AI matched" vs "Keyword results" (usedFallback). If the AI call fails (mirroring backend fallback), show a toast ("Couldn't understand that — showing keyword results instead") and still render the fallback results rather than a dead end.
Sorting: AISortDropdown with 6 options — relevance, price_asc, price_desc, highest_rated, most_reviewed, nearest. "nearest" requests navigator.geolocation (10s timeout) and falls back to relevance with a toast if denied/unsupported.
9a. Reviews UX
ReviewsSection on /listings/:id renders: average-rating summary card with animated 5-tier distribution bar (framer-motion), "N tenants weighed in" count, the ReviewCard list, and the ReviewForm.
StarPicker (via react-hook-form Controller) + comment textarea; zod reviewSchema (rating 1–5, comment 5–1000).
Role gating: unauthenticated → sign-in prompt; non-tenant → "Only tenants leave reviews here"; already-reviewed → "already left a verdict" and the form is hidden (mirrors backend ALREADY_REVIEWED 409).
10. Testing Strategy (Vitest + RTL + MSW — implemented)
Tests live flat under tests/ (no unit/ vs integration/ split).
tests/setupTests.ts — jest-dom matchers + MSW server (listen/reset/close).
tests/testUtils.tsx — renderWithProviders() (Redux store + QueryClient + MemoryRouter wrapper).
tests/mocks/handlers.ts — MSW handlers for: auth (register/login/refresh/me/logout, forgot/reset-password, verify/request + verify with stateful `currentUser`), users (PATCH /users/:id), listings (list w/ filter+sort+paginate, get, create, update, delete, landlord), favorites (add/list/remove), inquiries (create/sent/received/status), reviews (list/create), ai/recommend (parsed filters + sort incl. nearest), admin (users list + role + ban, listings list + status — stateful `mockUsers`).
tests/mocks/server.ts — MSW Node server.
Test files: authSlice.test.ts (slice reducers), Pagination.test.tsx (component behavior), loginFlow.test.tsx (login form + Redux + navigation), listingsBrowse.test.tsx (browse/filter/reset/sort/empty state + tenant favorite toggle), aiSearch.test.tsx (search + sort + error/retry), createListing.test.tsx (form render + validation + submit), editListing.test.tsx (prefill + preserve address on submit), reviews.test.tsx (ReviewsSection render/guard/post), verifyEmail.test.tsx (OTP submit/resend/redirect), forgotPassword.test.tsx (email → success state), profileEdit.test.tsx (edit name/phone, getMe refresh), admin.test.tsx (users table, role filter, ban/unban, role change, listings tab, TENANT guard).
Mock backend responses with MSW so tests don't depend on a live backend.
11. Build Order — Status
1. Vite + TS scaffold, Tailwind v4 + design tokens, routing skeleton — ✅ Done
2. Axios client + interceptors + typed API layer — ✅ Done (7 API modules)
3. Auth pages (Login/Register) + Redux auth slice — ✅ Done (ProtectedRoute wired into AppRouter — guards + routes in §3)
4. Reusable UI components (components/ui/) + styles/tokens.tsx — ✅ Done
5. Listings browse — grid ⇄ map toggle, FilterPanel, Pagination, TanStack Query — ✅ Done
6. Listing details — gallery + lightbox + inquiry + similar flats — ✅ Done (+ ReviewsSection)
7. Landlord dashboard — create/edit form, image upload, stats + table with inline status — ✅ Done
8. Tenant dashboard — favorites, sent inquiries — ✅ Done
9. Landlord inquiries received view — ✅ Done (status advance)
10. UI theme pass — Navbar/Footer/AppLayout, Home redesign — ✅ Done (3 light-theme stragglers noted in §4a)
11. AI search page + AISortDropdown + "understood as" chips + results — ✅ Done
12. Reviews — ✅ Done (components, api, hooks, schema, tests)
13. Error boundaries, loading/empty states polish, responsive QA, reduced-motion — ✅ Partial (ErrorBoundary/EmptyState/Skeleton done; full QA pending)
14. Tests (unit + integration with MSW) — ✅ Done (10 files, flat layout)
15. Deployment config (env vars, Vercel setup) — ❌ Not started (only `.env` with VITE_API_BASE_URL; no Vercel config)
16. Auth pass: route guards + email verification + forgot/reset password + editable profile — ✅ Done (guards wired; `/verify-email` OTP keyring + EmailVerificationBanner; `/forgot-password` + `/reset-password`; editable `/profile`; `updateUser` reducer; `users.api.ts`; 3 new test files — 42 tests green, lint + tsc clean)
17. Bug fixes + admin module — ✅ Done (bug #1: Listing type aligned with real API — `address`/`latitude`/`longitude` (nullable), `floorNumber: number | null`, no `division`/`lat`/`lng` — fixing the edit-address-wipe; bug #2: AI search error state + "Try again" retry instead of silent keyword fallback; bug #3: tenant favorite hearts on browse + details with snapshot-rollback optimistic toggle + `useFavoriteIds` map; admin: `/admin` Admin Console w/ Users + Listings tabs, role change + ban/unban + take down/restore, TO LET board status chips, `admin.api.ts`, MSW admin handlers — 52 tests green, lint + tsc clean)
Frontend Folder Structure (actual) — To-Let
frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── api/
│   │   ├── axiosClient.ts          # base Axios instance, baseURL = VITE_API_BASE_URL
│   │   ├── interceptors.ts         # attach JWT, handle 401 refresh/logout (with request queue)
│   │   ├── auth.api.ts
│   │   ├── listings.api.ts
│   │   ├── favorites.api.ts
│   │   ├── inquiries.api.ts
│   │   ├── ai.api.ts
│   │   ├── reviews.api.ts
│   │   └── admin.api.ts             # ADMIN-only endpoints (users + listings management)
│   │
│   ├── app/
│   │   ├── store.ts                 # Redux store (auth + ui slices)
│   │   └── queryClient.ts           # TanStack Query client config
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authSlice.ts
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx     # (slice tests live in tests/authSlice.test.ts)
│   │   └── ui/
│   │       └── uiSlice.ts           # filter panel state
│   │
│   ├── hooks/
│   │   ├── queries/
│   │   │   ├── useListings.ts
│   │   │   ├── useListing.ts
│   │   │   ├── useFavorites.ts
│   │   ├── useFavoriteIds.ts        # tenant-only Set + Map of favorited listings (heart state)
│   │   │   ├── useInquiries.ts       # useInquiriesSent + useInquiriesReceived
│   │   │   ├── useLandlordListings.ts
│   │   │   ├── useAIRecommend.ts     # mutation-style, local state
│   │   │   └── useReviews.ts
│   │   └── mutations/
│   │       ├── useCreateListing.ts
│   │       ├── useUpdateListing.ts
│   │       ├── useDeleteListing.ts
│   │       ├── useToggleFavorite.ts  # optimistic update
│   │       ├── useCreateInquiry.ts
│   │       ├── useUpdateInquiryStatus.ts
│   │       ├── useUploadListingImage.ts
│   │       └── useCreateReview.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── GlowDot.tsx
│   │   │   └── Toast.tsx             # sonner Toaster wrapper
│   │   │
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx         # public chrome + ScrollProgress bar + EmailVerificationBanner
│   │   │   ├── Navbar.tsx            # glass, scroll-aware, role-aware
│   │   │   ├── Footer.tsx
│   │   │   ├── ProtectedRoute.tsx    # role-aware guard (wired into AppRouter)
│   │   │   ├── DashboardLayout.tsx   # sidebar shell (wraps children directly)
│   │   │   ├── DashboardSidebar.tsx
│   │   │   ├── EmailVerificationBanner.tsx # dismissible "verify your email" bar (authed + unverified)
│   │   │   └── ErrorBoundary.tsx
│   │   │
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx       # animated hero + area/budget search
│   │   │   └── LightningBackground.tsx # canvas lightning/stars/clouds backdrop
│   │   │
│   │   ├── listings/
│   │   │   ├── ListingCard.tsx
│   │   │   ├── ListingGrid.tsx
│   │   │   ├── FilterPanel.tsx
│   │   │   └── SortDropdown.tsx
│   │   │
│   │   ├── forms/
│   │   │   ├── ListingForm.tsx       # shared create/edit form + react-dropzone upload
│   │   │   └── InquiryForm.tsx
│   │   │
│   │   ├── ai/
│   │   │   ├── AIResultsList.tsx     # "understood as" chips + AI/fallback badge
│   │   │   └── AISortDropdown.tsx    # 6 AI sort options
│   │   │
│   │   └── reviews/
│   │       ├── StarRating.tsx        # read-only, fractional fill
│   │       ├── StarPicker.tsx        # interactive radio with verdict
│   │       ├── ReviewsSection.tsx    # avg + distribution bar + list + form
│   │       ├── ReviewForm.tsx
│   │       └── ReviewCard.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx                  # Hero + How It Works + Why To-Let + landlord CTA
│   │   ├── ListingsPage.tsx          # grid ⇄ map toggle (OSM iframe MapView defined inline)
│   │   ├── ListingDetailsPage.tsx    # gallery, lightbox, inquiry, ReviewsSection, similar flats
│   │   ├── AISearchPage.tsx          # + sort dropdown + geolocation nearest
│   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── ForgotPasswordPage.tsx # email → "check your inbox" success state
│   │   │   ├── ResetPasswordPage.tsx  # token from ?token=, new + confirm password
│   │   │   ├── VerifyEmailPage.tsx    # 6-digit OTP keyring, resend, already-verified redirect
│   │   │   ├── ProfilePage.tsx        # editable name/phone (read-only email + verification status)
│   │   ├── NotFoundPage.tsx
│   │   │
│   │   ├── tenant/
│   │   │   ├── TenantDashboard.tsx
│   │   │   ├── FavoritesPage.tsx
│   │   │   └── SentInquiriesPage.tsx
│   │   │
│   │   └── landlord/
│   │       ├── LandlordDashboard.tsx # stat cards + table + inline status edit
│   │       ├── CreateListingPage.tsx
│   │       ├── EditListingPage.tsx
│   │       └── ReceivedInquiriesPage.tsx
│   │
│   │   └── admin/
│   │       └── AdminDashboard.tsx    # tabbed Users + Listings console
│   │
│   ├── router/
│   │   └── AppRouter.tsx             # React Router route definitions
│   │
│   ├── schemas/
│   │   ├── auth.schema.ts            # loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema, verifyEmailSchema, profileSchema
│   │   ├── listing.schema.ts         # createListingSchema
│   │   ├── inquiry.schema.ts         # inquirySchema
│   │   └── review.schema.ts          # reviewSchema
│   │
│   ├── types/
│   │   ├── user.types.ts
│   │   ├── listing.types.ts
│   │   ├── inquiry.types.ts
│   │   ├── favorite.types.ts
│   │   ├── review.types.ts
│   │   └── admin.types.ts            # AdminUser = User + isBanned
│   │   └── api.types.ts              # shared { success, data } / { success, error } shapes
│   │
│   ├── utils/
│   │   ├── formatCurrency.ts         # ৳ with en-BD locale
│   │   ├── formatDate.ts             # en-BD short date
│   │   └── queryParams.ts            # useListingFilters hook — syncs filters <-> URL search params
│   │
│   ├── styles/
│   │   └── tokens.tsx                # glass class tokens + framer-motion variants
│   │
│   ├── App.css                       # legacy Vite stylesheet (unused)
│   ├── index.css                     # Tailwind v4 @theme tokens + base styles + fonts
│   ├── App.tsx                       # ErrorBoundary + AppRouter + Toast
│   └── main.tsx                      # BrowserRouter > ReduxProvider > QueryClientProvider > App
│
├── tests/
│   ├── setupTests.ts                 # jest-dom + MSW server setup
│   ├── testUtils.tsx                 # renderWithProviders()
│   ├── mocks/
│   │   ├── handlers.ts               # MSW request handlers per endpoint
│   │   └── server.ts
│   ├── authSlice.test.ts
│   ├── Pagination.test.tsx
│   ├── loginFlow.test.tsx
│   ├── listingsBrowse.test.tsx
│   ├── aiSearch.test.tsx
│   ├── createListing.test.tsx
│   ├── editListing.test.tsx
│   ├── reviews.test.tsx
│   └── admin.test.tsx
│
├── .env                              # VITE_API_BASE_URL=/api (no .env.example)
├── .oxlintrc.json                    # oxlint config (react + typescript + oxc)
├── index.html
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts                    # /api → http://localhost:3000 dev proxy + vitest config
├── package.json
└── README.md
Notes on key files
api/interceptors.ts — mirrors the backend's refresh-token flow: on a 401 response, it calls POST /auth/refresh once (queueing concurrent requests via failedQueue); if that also fails, it dispatches authSlice's logout() action and redirects to /login. Keeps this logic in one place instead of scattered try/catch per component.
components/layout/ProtectedRoute.tsx — role-aware guard (checks authSlice.role against allowedRoles, redirects to /login preserving the intended route or to / otherwise). Wired around /profile, /verify-email, tenant, and landlord routes in AppRouter — see §2 and §3.
components/hero/HeroSection.tsx — animated landing hero. Mouse-parallax gradient blobs, staggered reveals, count-up stats (IntersectionObserver), live area-suggestion autocomplete (keyboard navigable), area + max-rent search that navigates to /listings?area=&maxPrice=.
pages/ListingsPage.tsx MapView — list view toggles to an OpenStreetMap iframe (openstreetmap.org/export/embed.html) whose marker follows the selected listing (defaults to Dhaka); not react-leaflet despite the installed deps.
components/ui/Toast.tsx — sonner wrapper; used for mutation success/failure feedback across app (e.g. AI fallback, listing status update).
components/layout/DashboardLayout.tsx — sidebar shell wrapping tenant/landlord dashboard pages by rendering <DashboardSidebar/> + children (AppRouter passes the page as a child element, not an Outlet).
LandlordDashboard — stat cards (total/available/rented/inactive) + a responsive table with inline status <select> (AVAILABLE/INACTIVE/RENTED via useUpdateListing) and view/edit/delete row actions.
styles/tokens.tsx — centralized glass class strings (GLASS_CARD, GLASS_BUTTON, ...) and framer-motion variants so the design system stays consistent.
hooks/queries/ vs hooks/mutations/ — split so it's obvious at a glance which hooks just read (cached, auto-refetch) vs which ones write and need to invalidate related query keys afterward (e.g. useCreateListing invalidates ['listings']). Note useAIRecommend sits in queries/ but is really a mutation.
schemas/ — kept deliberately parallel to the backend's Zod schemas so form validation feels identical to what the API will enforce, minimizing round-trip validation-error surprises.
utils/queryParams.ts — exports useListingFilters() hook; filters synced to the URL (?minPrice=&maxPrice=&bedrooms=) so a search is shareable/bookmarkable and survives a page refresh (default limit 12).
components/reviews/ReviewsSection.tsx — fetches via useReviews, computes the average + 5-tier distribution, and renders ReviewForm only when the user is an authenticated tenant who hasn't already reviewed.
tests/mocks/ — MSW handlers let integration tests run without a live backend, matching the response shapes the actual API returns ({ success, data } / { success, error }).
utils/queryParams.ts — filters synced to the URL (?minPrice=&maxPrice=&bedrooms=) so a search is shareable/bookmarkable and survives a page refresh.
tests/mocks/ — MSW handlers let integration tests run without a live backend, matching the response shapes your actual API returns ({ success, data } / { success, error }).
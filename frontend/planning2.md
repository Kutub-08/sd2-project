Frontend Planning — To-Let (Flat Rental Marketplace)
1. Tech Stack
Layer	Choice
Framework	React 19 (Vite 8)
Language	TypeScript
Routing	React Router v7
State Management	Redux Toolkit (global: auth, UI) + TanStack Query (server state: listings, favorites)
Styling	Tailwind CSS v4 via `@tailwindcss/vite` + custom `@theme` tokens (ink/glass design system)
Motion	Framer Motion (hero, scroll progress, view reveals, layout transitions)
Icons		lucide-react
Fonts		Space Grotesk (display) + Inter (body)
Forms & Validation	React Hook Form + Zod (shared validation logic mirroring backend schemas)
API Client	Axios (with interceptors for JWT attach + refresh)
Maps	Leaflet / OpenStreetMap embed (listings grid ⇄ map view toggle)
Image Handling	react-dropzone (landlord upload UI)
Notifications	sonner (with custom Toast wrapper)
Testing	Vitest + React Testing Library
Deployment	Vercel
2. High-Level Architecture
main.tsx
  └── App.tsx (Router + Providers)
        ├── QueryClientProvider (TanStack Query)
        ├── ReduxProvider (auth state, UI filters)
        ├── ToastProvider (sonner)
        │
        ├── AppLayout (public chrome)
        │     ├── ScrollProgress (top progress bar)
        │     ├── Navbar (glass, role-aware)
        │     ├── Footer (multi-column + landlord CTA)
        │     │
        │     ├── Public
        │     │     ├── Home (HeroSection + How It Works + Why To-Let + landlord CTA)
        │     │     ├── Listings (grid ⇄ map toggle)
        │     │     ├── ListingDetails (hero gallery, lightbox, inquiry, similar flats)
        │     │     ├── AI Search
        │     │     ├── Login / Register
        │     │     └── NotFound
        │     │
        │     ├── Tenant Protected Layout (role guard)
        │     │     ├── Dashboard (favorites, inquiries sent)
        │     │     └── Profile
        │     │
        │     └── Landlord Protected Layout (role guard)
        │           ├── Dashboard (my listings table, stats, status inline edit)
        │           ├── Create/Edit Listing
        │           └── Profile
        │
        └── DashboardLayout (sidebar + Outlet for authed dashboards)
Server state (listings, favorites, inquiries, AI results) → TanStack Query, so caching/loading/error states come mostly for free.
Client/global state (logged-in user, access token, active filter panel state) → Redux Toolkit slices.
Route guards read from the Redux auth slice to redirect unauthenticated users, and check role to separate tenant vs landlord views.
3. Pages / Routes
Route	Access	Purpose
/	Public	Home — HeroSection (animated skyline, area autocomplete, budget search), How It Works, Why To-Let, landlord CTA
/listings	Public	Browse all listings, filters + pagination + Grid/Map view toggle
/listings/:id	Public	Listing hero gallery + lightbox, stats, description, amenities, landlord card, inquiry form, similar flats, mobile inquiry bar
/ai-search	Public	Natural-language search → AI-parsed results ("Understood as" chips, AI vs keyword badges)
/login	Public	Login form
/register	Public	Register form (role selector: tenant/landlord)
/dashboard	Tenant	Favorites, sent inquiries
/dashboard/favorites	Tenant	Saved listings
/dashboard/inquiries	Tenant	Sent inquiry status
/landlord/dashboard	Landlord	My listings overview (stat cards + table with inline status change, view/edit/delete)
/landlord/listings/new	Landlord	Create listing form
/landlord/listings/:id/edit	Landlord	Edit listing form
/landlord/inquiries	Landlord	Received inquiries, respond
/profile	Authenticated	Edit name/phone, change password
*	Public	404 page
4. Frontend Requirements Mapping
Requirement	Implementation
Responsive Design	Tailwind breakpoints; mobile-first listing cards/grid, mobile sticky inquiry bar on details
Reusable Components	Button, Input, Select, Modal, Pagination, ListingCard, FilterPanel, Skeleton, Badge, EmptyState, GlowDot, Toast in components/ui/
Form Validation	React Hook Form + Zod resolver, same validation rules as backend schemas
State Management	Redux Toolkit (auth/ui) + TanStack Query (server state)
API Integration	Centralized Axios instance + typed API service modules per resource
Error Handling	Global Axios interceptor for 401 (auto-refresh or logout), ErrorBoundary component, inline form errors, toast (sonner) for mutation failures
Loading States	Skeleton components for listing cards/detail, spinner for buttons during submit, TanStack Query isLoading/isFetching flags
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
5. State Management Details
Redux slices (store/)
authSlice — user, accessToken, isAuthenticated, role
uiSlice — active filter panel open/closed, theme (if applicable)
TanStack Query hooks (hooks/queries/)
useListings(filters) — GET /listings
useListing(id) — GET /listings/:id
useFavorites() — GET /favorites
useInquiriesSent() / useInquiriesReceived()
useAIRecommend(query) — POST /ai/recommend
Mutations: useCreateListing, useUpdateListing, useDeleteListing, useToggleFavorite, useCreateInquiry, useUploadListingImage

Query keys namespaced per resource (e.g. ['listings', filters], ['listing', id]) so cache invalidation on mutation (e.g. after creating a listing) is predictable.

6. API Integration Layer
src/api/
  axiosClient.ts       # base Axios instance, baseURL from env, withCredentials for refresh cookie
  interceptors.ts       # attaches Bearer token, handles 401 → refresh → retry, else logout
  auth.api.ts
  listings.api.ts
  favorites.api.ts
  inquiries.api.ts
  ai.api.ts
  reviews.api.ts
All API functions are typed against shared TypeScript interfaces in types/ mirroring backend response shapes ({ success, data } / { success, error }).
401 handling: interceptor tries POST /auth/refresh once; on failure, dispatches Redux logout() and redirects to /login.
7. Component Structure (by domain)
components/ui/ — generic, reusable, no business logic (Button, Input, Select, Modal, Pagination, Skeleton, Badge, EmptyState, GlowDot, Toast)
components/listings/ — ListingCard, ListingGrid, ListingGallery, FilterPanel, SortDropdown
components/forms/ — ListingForm (create/edit, shared), InquiryForm, ReviewForm, LoginForm, RegisterForm
components/layout/ — Navbar, Footer, ProtectedRoute, DashboardSidebar, DashboardLayout, AppLayout, ScrollProgress, ErrorBoundary
components/hero/ — HeroSection, LightningBackground (animated canvas skyline/lightning backdrop)
components/ai/ — AISearchBar, AIResultsList
Design tokens / motion helpers — src/styles/tokens.tsx
8. Error Handling & Loading States
Global: ErrorBoundary wraps the app for uncaught render errors.
Network errors: Axios interceptor normalizes backend { success:false, error:{ code, message } } into a consistent shape consumed by toast notifications.
Form errors: Zod validation errors mapped inline under each field via React Hook Form's formState.errors.
Loading states: Skeleton loaders for listing grid/detail while isLoading; disabled + spinner state on submit buttons while isPending (mutation).
Empty states: dedicated "No listings match your filters" / "No favorites yet" components rather than blank screens.
9. AI Search UX
AISearchBar/AISearchPage on /ai-search. On submit: call useAIRecommend(query) → animated "understood as" parsed-filter chips (maxPrice, minBedrooms, area, amenities) → results via ListingGrid/ListingCard.
Badges show "AI matched" vs "Keyword results" (usedFallback). If the AI call fails (mirroring backend fallback), show a toast ("Couldn't understand that — showing keyword results instead") and still render the fallback results rather than a dead end.
10. Testing Strategy
Unit tests (Vitest + RTL): reusable UI components (Pagination, FilterPanel logic, form validation), Redux slices.
Integration tests: login/register flow, listing browse + filter interaction, create-listing form submission (mocked API via MSW — Mock Service Worker).
Mock backend responses with MSW so tests don't depend on a live backend.
11. Suggested Build Order (Frontend)
Vite + TypeScript scaffold, Tailwind v4 + design-token setup, routing skeleton
Axios client + interceptors + typed API layer stubs
Auth pages (Login/Register) + Redux auth slice + ProtectedRoute
Reusable UI components (components/ui/) + styles/tokens.tsx
Listings browse page — grid ⇄ map toggle, FilterPanel, Pagination, TanStack Query
Listing details page — hero gallery + lightbox + inquiry form + similar flats + mobile inquiry bar
Landlord dashboard — create/edit listing form, image upload, stats + table with inline status edit
Tenant dashboard — favorites, sent inquiries
Landlord inquiries received view
New UI theme pass — Navbar/Footer/AppLayout (scroll progress), Home (HeroSection, How It Works, Why To-Let, landlord CTA), redesign pages/components to ink/glass system
AI search page + AISearchBar + "understood as" chips + results rendering
Reviews (optional, if time permits)
Error boundaries, loading/empty states polish, responsive QA, reduced-motion
Tests (unit + integration with MSW)
Deployment config (env vars, Vercel setup)
Frontend Folder Structure (React + TypeScript + Vite) — To-Let
frontend/
├── public/
│   └── favicon.svg
│
├── src/
│   ├── api/
│   │   ├── axiosClient.ts          # base Axios instance, baseURL from env
│   │   ├── interceptors.ts         # attach JWT, handle 401 refresh/logout
│   │   ├── auth.api.ts
│   │   ├── listings.api.ts
│   │   ├── favorites.api.ts
│   │   ├── inquiries.api.ts
│   │   ├── ai.api.ts
│   │   └── reviews.api.ts
│   │
│   ├── app/
│   │   ├── store.ts                 # Redux store config
│   │   └── queryClient.ts           # TanStack Query client config
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authSlice.ts
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── authSlice.test.ts
│   │   │
│   │   └── ui/
│   │       └── uiSlice.ts           # filter panel state, misc UI flags
│   │
│   ├── hooks/
│   │   ├── queries/
│   │   │   ├── useListings.ts
│   │   │   ├── useListing.ts
│   │   │   ├── useFavorites.ts
│   │   │   ├── useInquiries.ts
│   │   │   ├── useLandlordListings.ts
│   │   │   ├── useAIRecommend.ts
│   │   │   └── useReviews.ts
│   │   ├── mutations/
│   │   │   ├── useCreateListing.ts
│   │   │   ├── useUpdateListing.ts
│   │   │   ├── useDeleteListing.ts
│   │   │   ├── useToggleFavorite.ts
│   │   │   ├── useCreateInquiry.ts
│   │   │   ├── useUpdateInquiryStatus.ts
│   │   │   └── useUploadListingImage.ts
│   │   └── useAuth.ts               # convenience hook wrapping authSlice
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
│   │   │   └── Toast.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx          # public chrome + ScrollProgress bar
│   │   │   ├── Navbar.tsx             # glass, scroll-aware, role-aware
│   │   │   ├── Footer.tsx             # multi-column + landlord CTA
│   │   │   ├── ProtectedRoute.tsx     # role-aware route guard
│   │   │   ├── DashboardLayout.tsx    # sidebar shell for dashboards
│   │   │   ├── DashboardSidebar.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   │
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx        # animated hero + area/budget search
│   │   │   └── LightningBackground.tsx# canvas lightning/stars backdrop
│   │   │
│   │   ├── listings/
│   │   │   ├── ListingCard.tsx
│   │   │   ├── ListingGrid.tsx
│   │   │   ├── ListingGallery.tsx
│   │   │   ├── FilterPanel.tsx
│   │   │   └── SortDropdown.tsx
│   │   │
│   │   ├── forms/
│   │   │   ├── ListingForm.tsx       # shared create/edit form
│   │   │   ├── InquiryForm.tsx
│   │   │   └── ReviewForm.tsx
│   │   │
│   │   └── ai/
│   │       ├── AISearchBar.tsx
│   │       └── AIResultsList.tsx     # "understood as" chips + AI/fallback badge
│   │
│   ├── pages/
│   │   ├── Home.tsx                  # Hero + How It Works + Why To-Let + landlord CTA
│   │   ├── ListingsPage.tsx          # grid ⇄ map view toggle
│   │   ├── ListingDetailsPage.tsx    # hero gallery, lightbox, inquiry, similar flats
│   │   ├── AISearchPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── NotFoundPage.tsx
│   │   │
│   │   ├── tenant/
│   │   │   ├── TenantDashboard.tsx
│   │   │   ├── FavoritesPage.tsx
│   │   │   └── SentInquiriesPage.tsx
│   │   │
│   │   └── landlord/
│   │       ├── LandlordDashboard.tsx   # stat cards + table + inline status edit
│   │       ├── CreateListingPage.tsx
│   │       ├── EditListingPage.tsx
│   │       └── ReceivedInquiriesPage.tsx
│   │
│   ├── router/
│   │   └── AppRouter.tsx             # React Router route definitions
│   │
│   ├── schemas/
│   │   ├── auth.schema.ts            # Zod schemas mirroring backend validation
│   │   ├── listing.schema.ts
│   │   ├── inquiry.schema.ts
│   │   └── review.schema.ts
│   │
│   ├── types/
│   │   ├── user.types.ts
│   │   ├── listing.types.ts
│   │   ├── inquiry.types.ts
│   │   ├── favorite.types.ts
│   │   └── api.types.ts              # shared { success, data } / { success, error } shapes
│   │
│   ├── utils/
│   │   ├── formatCurrency.ts
│   │   ├── formatDate.ts
│   │   └── queryParams.ts            # sync filters <-> URL search params
│   │
│   ├── styles/
│   │   ├── tokens.tsx                # glass class tokens + framer-motion variants
│   │   └── index.css                 # Tailwind @theme tokens + base styles
│   │
│   ├── App.tsx                       # providers (Redux, QueryClient, Toast) + AppRouter
│   └── main.tsx                      # ReactDOM root render
│
├── tests/
│   ├── setupTests.ts                 # RTL + MSW setup
│   ├── mocks/
│   │   ├── handlers.ts               # MSW request handlers per endpoint
│   │   └── server.ts
│   ├── unit/
│   │   ├── components/
│   │   └── slices/
│   └── integration/
│       ├── auth.test.tsx
│       ├── listings.test.tsx
│       └── createListing.test.tsx
│
├── .env
├── .env.example
├── .oxlintrc.json                  # oxlint config (react + typescript + oxc)
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
Notes on key files
api/interceptors.ts — mirrors the backend's refresh-token flow: on a 401 response, it calls POST /auth/refresh once; if that also fails, it dispatches authSlice's logout() action and redirects to /login. Keeps this logic in one place instead of scattered try/catch per component.
components/layout/ProtectedRoute.tsx — wraps tenant/landlord route groups, checks authSlice.role against an allowedRoles prop, redirects to /login or a 403 page otherwise.
components/hero/HeroSection.tsx — animated landing hero. Mouse-parallax gradient blobs, staggered reveals, count-up stats (IntersectionObserver), live area-suggestion autocomplete (keyboard navigable), area + max-rent search that navigates to /listings?area=&maxPrice=.
components/layout/ListingsPage MapView — list view toggles to an OpenStreetMap embed whose bounding box + marker follow the selected listing (lat/lng).
components/ui/Toast.tsx — sonner wrapper; used for mutation success/failure feedback across app (e.g. AI fallback, listing status update).
components/layout/DashboardLayout.tsx — sidebar shell wrapping tenant/landlord dashboard pages via Outlet; DashboardSidebar holds nav links.
LandlordDashboard — stat cards (total/available/rented/inactive) + a responsive table with inline status <select> (AVAILABLE/INACTIVE/RENTED via useUpdateListing) and view/edit/delete row actions.
styles/tokens.tsx — centralized glass class strings (GLASS_CARD, GLASS_BUTTON, ...) and framer-motion variants so the design system stays consistent.
hooks/queries/ vs hooks/mutations/ — split so it's obvious at a glance which hooks just read (cached, auto-refetch) vs which ones write and need to invalidate related query keys afterward (e.g. useCreateListing invalidates ['listings']).
schemas/ — kept deliberately parallel to the backend's Zod schemas so form validation feels identical to what the API will enforce, minimizing round-trip validation-error surprises.
utils/queryParams.ts — filters synced to the URL (?minPrice=&maxPrice=&bedrooms=) so a search is shareable/bookmarkable and survives a page refresh.
tests/mocks/ — MSW handlers let integration tests run without a live backend, matching the response shapes your actual API returns ({ success, data } / { success, error }).
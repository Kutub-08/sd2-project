Frontend Planning — To-Let (Flat Rental Marketplace)
1. Tech Stack
Layer	Choice
Framework	React.js (Vite)
Language	TypeScript
Routing	React Router v6
State Management	Redux Toolkit (global: auth, filters) + React Query/TanStack Query (server state: listings, favorites)
Styling	Tailwind CSS
Forms & Validation	React Hook Form + Zod (shared validation logic mirroring backend schemas)
API Client	Axios (with interceptors for JWT attach + refresh)
Maps	React-Leaflet or Google Maps React (for listing location display)
Image Handling	react-dropzone (landlord upload UI)
Notifications	react-hot-toast / sonner
Testing	Vitest + React Testing Library
Deployment	Vercel
2. High-Level Architecture
main.tsx
  └── App.tsx (Router + Providers)
        ├── QueryClientProvider (TanStack Query)
        ├── ReduxProvider (auth state, UI filters)
        ├── ToastProvider
        │
        ├── Public Layout
        │     ├── Home
        │     ├── Listings (browse/search)
        │     ├── ListingDetails
        │     ├── Login / Register
        │     └── AI Search
        │
        ├── Tenant Protected Layout (role guard)
        │     ├── Dashboard (favorites, inquiries sent)
        │     └── Profile
        │
        └── Landlord Protected Layout (role guard)
              ├── Dashboard (my listings, inquiries received)
              ├── Create/Edit Listing
              └── Profile
Server state (listings, favorites, inquiries, AI results) → TanStack Query, so caching/loading/error states come mostly for free.
Client/global state (logged-in user, access token, active filter panel state) → Redux Toolkit slices.
Route guards read from the Redux auth slice to redirect unauthenticated users, and check role to separate tenant vs landlord views.
3. Pages / Routes
Route	Access	Purpose
/	Public	Home — hero, search bar, featured listings
/listings	Public	Browse all listings, filters + pagination
/listings/:id	Public	Listing details, images, inquiry form
/ai-search	Public	Natural-language search → AI-parsed results
/login	Public	Login form
/register	Public	Register form (role selector: tenant/landlord)
/dashboard	Tenant	Favorites, sent inquiries
/dashboard/favorites	Tenant	Saved listings
/dashboard/inquiries	Tenant	Sent inquiry status
/landlord/dashboard	Landlord	My listings overview
/landlord/listings/new	Landlord	Create listing form
/landlord/listings/:id/edit	Landlord	Edit listing form
/landlord/inquiries	Landlord	Received inquiries, respond
/profile	Authenticated	Edit name/phone, change password
*	Public	404 page
4. Frontend Requirements Mapping
Requirement	Implementation
Responsive Design	Tailwind breakpoints; mobile-first listing cards/grid
Reusable Components	Button, Input, Select, Modal, Pagination, ListingCard, FilterPanel, Skeleton in components/ui/
Form Validation	React Hook Form + Zod resolver, same validation rules as backend schemas
State Management	Redux Toolkit (auth/filters) + TanStack Query (server state)
API Integration	Centralized Axios instance + typed API service modules per resource
Error Handling	Global Axios interceptor for 401 (auto-refresh or logout), ErrorBoundary component, inline form errors, toast for mutation failures
Loading States	Skeleton components for listing cards, spinner for buttons during submit, TanStack Query isLoading/isFetching flags
Pagination	Pagination component driven by page/limit query params, synced to URL search params
Search & Filtering	FilterPanel (price range, bedrooms, bathrooms, area, city) synced to URL query string so filters are shareable/bookmarkable
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
components/ui/ — generic, reusable, no business logic (Button, Input, Select, Modal, Pagination, Skeleton, Badge)
components/listings/ — ListingCard, ListingGrid, ListingGallery, FilterPanel, SortDropdown
components/forms/ — ListingForm (create/edit, shared), InquiryForm, ReviewForm, LoginForm, RegisterForm
components/layout/ — Navbar, Footer, ProtectedRoute, DashboardSidebar
components/ai/ — AISearchBar, AIResultsList
8. Error Handling & Loading States
Global: ErrorBoundary wraps the app for uncaught render errors.
Network errors: Axios interceptor normalizes backend { success:false, error:{ code, message } } into a consistent shape consumed by toast notifications.
Form errors: Zod validation errors mapped inline under each field via React Hook Form's formState.errors.
Loading states: Skeleton loaders for listing grid/detail while isLoading; disabled + spinner state on submit buttons while isPending (mutation).
Empty states: dedicated "No listings match your filters" / "No favorites yet" components rather than blank screens.
9. AI Search UX
AISearchBar component on /ai-search and optionally embedded on /listings as an alternate search mode.
On submit: calls useAIRecommend(query) → shows loading skeleton → renders results via the same ListingGrid/ListingCard components used elsewhere (consistency, less duplicate UI).
If the AI call fails (mirroring backend fallback), show a toast ("Couldn't understand that — showing keyword results instead") and still render whatever the fallback search returned rather than a dead end.
10. Testing Strategy
Unit tests (Vitest + RTL): reusable UI components (Pagination, FilterPanel logic, form validation), Redux slices.
Integration tests: login/register flow, listing browse + filter interaction, create-listing form submission (mocked API via MSW — Mock Service Worker).
Mock backend responses with MSW so tests don't depend on a live backend.
11. Suggested Build Order (Frontend)
Vite + TypeScript scaffold, Tailwind setup, routing skeleton
Axios client + interceptors + typed API layer stubs
Auth pages (Login/Register) + Redux auth slice + ProtectedRoute
Reusable UI components (components/ui/)
Listings browse page — grid, FilterPanel, Pagination, TanStack Query integration
Listing details page + image gallery + inquiry form
Landlord dashboard — create/edit listing form, image upload, my listings list
Tenant dashboard — favorites, sent inquiries
Landlord inquiries received view
AI search page + AISearchBar + results rendering
Reviews (optional, if time permits)
Error boundaries, loading/empty states polish, responsive QA
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
│   │   │   ├── useAIRecommend.ts
│   │   │   └── useReviews.ts
│   │   ├── mutations/
│   │   │   ├── useCreateListing.ts
│   │   │   ├── useUpdateListing.ts
│   │   │   ├── useDeleteListing.ts
│   │   │   ├── useToggleFavorite.ts
│   │   │   ├── useCreateInquiry.ts
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
│   │   │   └── Toast.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ProtectedRoute.tsx    # role-aware route guard
│   │   │   └── DashboardSidebar.tsx
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
│   │       └── AIResultsList.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── ListingsPage.tsx
│   │   ├── ListingDetailsPage.tsx
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
│   │       ├── LandlordDashboard.tsx
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
│   │   └── index.css                 # Tailwind directives + base styles
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
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── package.json
└── README.md
Notes on key files
api/interceptors.ts — mirrors the backend's refresh-token flow: on a 401 response, it calls POST /auth/refresh once; if that also fails, it dispatches authSlice's logout() action and redirects to /login. Keeps this logic in one place instead of scattered try/catch per component.
components/layout/ProtectedRoute.tsx — wraps tenant/landlord route groups, checks authSlice.role against an allowedRoles prop, redirects to /login or a 403 page otherwise.
hooks/queries/ vs hooks/mutations/ — split so it's obvious at a glance which hooks just read (cached, auto-refetch) vs which ones write and need to invalidate related query keys afterward (e.g. useCreateListing invalidates ['listings']).
schemas/ — kept deliberately parallel to the backend's Zod schemas so form validation feels identical to what the API will enforce, minimizing round-trip validation-error surprises.
components/listings/FilterPanel.tsx paired with utils/queryParams.ts — filters are synced to the URL (?minPrice=&maxPrice=&bedrooms=) so a search is shareable/bookmarkable and survives a page refresh.
tests/mocks/ — MSW handlers let integration tests run without a live backend, matching the response shapes your actual API returns ({ success, data } / { success, error }).
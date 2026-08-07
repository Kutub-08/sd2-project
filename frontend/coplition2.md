# Completion Tracker — frontend vs planning2.md

> Last updated: Aug 7, 2026 — after the **Reviews & Ratings feature** pass
> (comment/rating on listings: `ReviewSection` on the details page, edit/delete own review, any authenticated user can review).

| # | Build Step (from planning2.md §11) | Status | Notes |
|---|--------------------------------------|--------|-------|
| 1 | Vite + TS scaffold, Tailwind v4 + design tokens, routing skeleton | ✅ Done | Vite 8, React 19, TS 6, Tailwind v4, `@theme` ink/glass tokens in `index.css`, all routes in AppRouter.tsx |
| 2 | Axios client + interceptors + typed API layer stubs | ✅ Done | `axiosClient.ts`, `interceptors.ts`, 7 API modules (incl. `reviews.api.ts`) |
| 3 | Auth pages (Login/Register) + Redux auth slice + ProtectedRoute | ✅ Done | LoginForm + RegisterForm with react-hook-form + Zod, `authSlice.ts`, `ProtectedRoute.tsx` |
| 4 | Reusable UI components (`components/ui/`) + `styles/tokens.tsx` | ✅ Done | Button, Input, Select, Modal, Pagination, Skeleton, Badge, EmptyState, GlowDot, Toast; glass tokens + framer variants |
| 5 | Listings browse page — grid ⇄ map toggle, FilterPanel, Pagination, TanStack Query | ✅ Done | ListingsPage with Grid/Map toggle (OpenStreetMap embed), FilterPanel, Pagination, SortDropdown, useListings |
| 6 | Listing details page — hero gallery + lightbox + inquiry + similar flats | ✅ Done | ListingDetailsPage: hero gallery, ImageLightbox, stat cards, amenities, landlord card, similar flats, mobile inquiry bar |
| 7 | Landlord dashboard — create/edit form, image upload, stats + table with inline status | ✅ Done | LandlordDashboard (stat cards + table + inline status select), CreateListingPage, EditListingPage, ListingForm (react-dropzone) |
| 8 | Tenant dashboard — favorites, sent inquiries | ✅ Done | TenantDashboard, FavoritesPage, SentInquiriesPage |
| 9 | Landlord inquiries received view | ✅ Done | ReceivedInquiriesPage |
| 10 | New UI theme pass — Navbar/Footer/AppLayout, Home redesign | ✅ Done | Glass Navbar (scroll-aware), multi-column Footer, AppLayout ScrollProgress bar, Home = HeroSection + How It Works + Why To-Let + landlord CTA |
| 11 | AI search page + AISearchBar + "understood as" chips + results | ✅ Done | AISearchPage (animated layout), AIResultsList (parsed-filter chips, "AI matched" / "Keyword results" badge), useAIRecommend |
| 12 | Reviews (optional) | ✅ Done | `ReviewSection` + `ReviewForm` (create/edit/delete) + `RatingStars`; avg rating + count on detail; wired into ListingDetailsPage; any authenticated user can review (backend blocks self-review) |
| 13 | Error boundaries, loading/empty states polish, responsive QA, reduced-motion | ✅ Partial | ErrorBoundary + EmptyState + Skeleton built; reduced-motion respected in hero; full QA still pending |
| 14 | Tests (unit + integration with MSW) | ✅ Done | 6 files / **35 tests**: authSlice, Pagination, loginFlow, listingsBrowse, createListing, reviews (MSW handlers for auth/listings/favorites/inquiries/reviews) |
| 15 | Deployment config (env vars, Vercel setup) | ❌ Not started | Only `.env` with `VITE_API_BASE_URL`, no Vercel config |

## Missing from planned folder structure

| Path | Status |
|------|--------|
| `hooks/useAuth.ts` | ❌ (convenience wrapper not created) |
| `features/auth/authSlice.test.ts` | ❌ |
| `components/forms/ReviewForm.tsx` | ✅ (built at `components/reviews/ReviewForm.tsx` — reviews live under `components/reviews/`, off the planned `forms/` path) |
| `api/reviews.api.ts` | ✅ created |
| `hooks/queries/useReviews.ts` | ✅ created |
| `schemas/review.schema.ts` | ✅ created |
| `tests/` (entire directory) | ✅ exists — 6 test files, 35 tests |

## Extras (not in planning2.md)

### New UI/theme work (ink glassmorphism)
- `src/styles/tokens.tsx` — centralized glass class tokens + framer-motion variants
- `src/index.css` — Tailwind v4 `@theme` tokens (ink/ink-soft/ink-deep/teal/amberglow/paper/mist/line), Space Grotesk + Inter fonts, skyline `tolet-window` styles, `prefers-reduced-motion` handling
- `components/hero/HeroSection.tsx` — animated hero: parallax gradient blobs, count-up stats, area-suggestion autocomplete, area+budget search → /listings
- `components/hero/LightningBackground.tsx` — canvas lightning/stars/clouds backdrop
- `components/layout/AppLayout.tsx` — added `ScrollProgress` bar (framer-motion `useScroll`)
- `components/layout/DashboardLayout.tsx` — sidebar shell wrapping dashboards
- `components/ui/EmptyState.tsx`, `components/ui/GlowDot.tsx`, `components/ui/Toast.tsx`
- Redesigned: Navbar, Footer, Button, Badge, Input, Select, Modal, Pagination, Skeleton, FilterPanel, ListingCard, ListingGallery, SortDropdown

### New features
- **Grid ⇄ Map view** on ListingsPage (`MapView` with OpenStreetMap iframe + selected-listing marker)
- **LandlordDashboard table** — stat cards (Total/Available/Rented/Inactive), responsive table with inline status `<select>` (via `useUpdateListing`) and view/edit/delete row actions
- **AI search polish** — "Understood as" parsed-filter chips, "AI matched" vs "Keyword results" badges, `parsedFilters` rendering
- **Listing details polish** — image lightbox (keyboard nav), hero gallery, mobile sticky inquiry bar
- **Reviews & Ratings** — `components/reviews/` (`RatingStars`, `ReviewForm`, `ReviewSection`) placed on the listing details page; average rating + count header, comment list w/ read-only stars, create/edit/delete own review, sign-in prompt, form hidden for the listing's own landlord

### Other
- `hooks/mutations/useUpdateInquiryStatus.ts`
- `hooks/queries/useLandlordListings.ts`
- `assets/hero.png`, `assets/react.svg`, `assets/vite.svg`
- `App.css`
- `public/icons.svg`
- Deps added: `framer-motion`, `lucide-react`, `sonner`, `leaflet`/`react-leaflet`

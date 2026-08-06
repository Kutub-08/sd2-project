# Completion Tracker — frontend vs planning2.md

| # | Build Step (from planning2.md §11) | Status | Notes |
|---|--------------------------------------|--------|-------|
| 1 | Vite + TypeScript scaffold, Tailwind setup, routing skeleton | ✅ Done | Vite 8, React 19, TS 6, Tailwind v4, all routes in AppRouter.tsx |
| 2 | Axios client + interceptors + typed API layer stubs | ✅ Done | `axiosClient.ts`, `interceptors.ts`, 6 API modules (missing `reviews.api.ts`) |
| 3 | Auth pages (Login/Register) + Redux auth slice + ProtectedRoute | ✅ Done | LoginForm + RegisterForm with react-hook-form + Zod, `authSlice.ts`, `ProtectedRoute.tsx` |
| 4 | Reusable UI components (`components/ui/`) | ✅ Mostly | Button, Input, Select, Modal, Pagination, Skeleton, Badge — missing Toast |
| 5 | Listings browse page — grid, FilterPanel, Pagination, TanStack Query | ✅ Done | ListingsPage, ListingGrid, ListingCard, FilterPanel, Pagination, SortDropdown, useListings |
| 6 | Listing details page + image gallery + inquiry form | ✅ Done | ListingDetailsPage, ListingGallery, InquiryForm |
| 7 | Landlord dashboard — create/edit listing form, image upload, my listings | ✅ Done | LandlordDashboard, CreateListingPage, EditListingPage, ListingForm (with react-dropzone), useLandlordListings |
| 8 | Tenant dashboard — favorites, sent inquiries | ✅ Done | TenantDashboard, FavoritesPage, SentInquiriesPage |
| 9 | Landlord inquiries received view | ✅ Done | ReceivedInquiriesPage |
| 10 | AI search page + AISearchBar + results rendering | ✅ Done | AISearchPage, AISearchBar, AIResultsList, useAIRecommend |
| 11 | Reviews (optional) | ❌ Not started | No review component, API module, hook, or schema |
| 12 | Error boundaries, loading/empty states polish, responsive QA | ✅ Partial | ErrorBoundary exists; Skeleton components in ui/; empty state components not built |
| 13 | Tests (unit + integration with MSW) | ❌ Not started | No `tests/` dir, no MSW handlers, no test files |
| 14 | Deployment config (env vars, Vercel setup) | ❌ Not started | Only `.env` with `VITE_API_BASE_URL`, no Vercel config |

## Missing from planned folder structure

| Path | Status |
|------|--------|
| `components/ui/Toast.tsx` | ❌ (sonner installed but no wrapper) |
| `components/layout/Navbar.tsx` | ❌ |
| `components/layout/Footer.tsx` | ❌ |
| `components/layout/DashboardSidebar.tsx` | ❌ |
| `components/forms/ReviewForm.tsx` | ❌ |
| `api/reviews.api.ts` | ❌ |
| `hooks/queries/useReviews.ts` | ❌ |
| `schemas/inquiry.schema.ts` | ❌ (inlined in InquiryForm instead) |
| `schemas/review.schema.ts` | ❌ |
| `types/inquiry.types.ts` | ❌ |
| `types/favorite.types.ts` | ❌ |
| `utils/formatCurrency.ts` | ❌ |
| `utils/formatDate.ts` | ❌ |
| `features/auth/authSlice.test.ts` | ❌ |
| `tests/` (entire directory) | ❌ |

## Extras (not in planning2.md)

- `hooks/mutations/useUpdateInquiryStatus.ts`
- `hooks/queries/useLandlordListings.ts`
- `assets/hero.png`, `assets/react.svg`, `assets/vite.svg`
- `App.css`
- `public/icons.svg`

import { http, HttpResponse } from 'msw'
import type { Listing, ListingImage } from '../../src/types/listing.types'
import type { Favorite } from '../../src/types/favorite.types'
import type { Inquiry } from '../../src/types/inquiry.types'
import type { Review } from '../../src/types/review.types'

const BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api'

// ── Data ──

const mockListings: Listing[] = [
  {
    id: 'l1', title: 'Modern 2BR in Panchlaish', description: 'Spacious two-bedroom flat',
    price: 15000, sizeSqft: 1100, bedrooms: 2, bathrooms: 2,
    floorNumber: 3, area: 'Panchlaish', city: 'Chattogram', division: '',
    lat: 22.3569, lng: 91.7832, amenities: ['Gas', 'Electricity', 'Water'],
    status: 'AVAILABLE', landlordId: 'landlord1',
    landlord: { id: 'landlord1', name: 'Rahim Khan', email: 'rahim@test.com', phone: '01711' },
    images: [{ id: 'img1', listingId: 'l1', imageUrl: 'https://picsum.photos/seed/l1/800/600', isPrimary: true, orderIndex: 0, createdAt: new Date().toISOString() }],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: 'l2', title: 'Budget 1BR near IIUC', description: 'Affordable single bedroom for students',
    price: 8000, sizeSqft: 550, bedrooms: 1, bathrooms: 1,
    floorNumber: 2, area: 'Kumira', city: 'Chattogram', division: '',
    lat: 22.3852, lng: 91.8115, amenities: ['Electricity', 'Water'],
    status: 'AVAILABLE', landlordId: 'landlord1',
    landlord: { id: 'landlord1', name: 'Rahim Khan', email: 'rahim@test.com', phone: '01711' },
    images: [{ id: 'img2', listingId: 'l2', imageUrl: 'https://picsum.photos/seed/l2/800/600', isPrimary: true, orderIndex: 0, createdAt: new Date().toISOString() }],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: 'l3', title: 'Luxury 3BR in Khulshi', description: 'Premium three-bedroom apartment',
    price: 35000, sizeSqft: 1800, bedrooms: 3, bathrooms: 2,
    floorNumber: 5, area: 'Khulshi', city: 'Chattogram', division: '',
    lat: 22.3685, lng: 91.7983, amenities: ['Gas', 'Electricity', 'Water', 'Parking'],
    status: 'AVAILABLE', landlordId: 'landlord2',
    landlord: { id: 'landlord2', name: 'Karim Uddin', email: 'karim@test.com', phone: '01722' },
    images: [{ id: 'img3', listingId: 'l3', imageUrl: 'https://picsum.photos/seed/l3/800/600', isPrimary: true, orderIndex: 0, createdAt: new Date().toISOString() }],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: 'l4', title: 'Studio in GEC', description: 'Compact studio in the heart of the city',
    price: 12000, sizeSqft: 400, bedrooms: 1, bathrooms: 1,
    floorNumber: 6, area: 'Nasirabad', city: 'Chattogram', division: '',
    lat: 22.3601, lng: 91.7902, amenities: ['Electricity', 'Water', 'Lift'],
    status: 'RENTED', landlordId: 'landlord2',
    landlord: { id: 'landlord2', name: 'Karim Uddin', email: 'karim@test.com', phone: '01722' },
    images: [],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
]

let listingCounter = 4
let favoriteCounter = 0
let inquiryCounter = 0
let reviewCounter = 2

const favorites: Favorite[] = []
const inquiries: Inquiry[] = []

const mockReviews: Review[] = [
  {
    id: 'r1',
    listingId: 'l1',
    tenantId: 'tenant1',
    rating: 5,
    comment: 'Excellent flat, highly recommend!',
    createdAt: new Date().toISOString(),
    tenant: { id: 'tenant1', name: 'Test Tenant' },
  },
  {
    id: 'r2',
    listingId: 'l1',
    tenantId: 'tenant2',
    rating: 4,
    comment: 'Great location and value for money.',
    createdAt: new Date().toISOString(),
    tenant: { id: 'tenant2', name: 'Sadia Rahman' },
  },
]

const testUser = { id: 'tenant1', name: 'Test Tenant', email: 'tenant@test.com', role: 'TENANT' as const }
const testLandlord = { id: 'landlord1', name: 'Rahim Khan', email: 'rahim@test.com', role: 'LANDLORD' as const }
const testAccessToken = 'test-access-token'

// ── Handlers ──

export const handlers = [
  // ─── Auth ───

  http.post(`${BASE}/auth/register`, () =>
    HttpResponse.json({
      success: true,
      data: { user: testUser, accessToken: testAccessToken },
    }, { status: 201 }),
  ),

  http.post(`${BASE}/auth/login`, () =>
    HttpResponse.json({
      success: true,
      data: { user: testUser, accessToken: testAccessToken },
    }),
  ),

  http.post(`${BASE}/auth/refresh`, () =>
    HttpResponse.json({
      success: true,
      data: { user: testUser, accessToken: testAccessToken },
    }),
  ),

  http.get(`${BASE}/auth/me`, () =>
    HttpResponse.json({
      success: true,
      data: { ...testUser, phone: '01733333333', isVerified: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    }),
  ),

  http.post(`${BASE}/auth/logout`, () =>
    HttpResponse.json({ success: true, data: { message: 'Logged out' } }),
  ),

  // ─── Listings ───

  http.get(`${BASE}/listings`, ({ request }) => {
    const url = new URL(request.url)
    const area = url.searchParams.get('area')
    const minPrice = url.searchParams.get('minPrice')
    const maxPrice = url.searchParams.get('maxPrice')
    const bedrooms = url.searchParams.get('bedrooms')
    const status = url.searchParams.get('status')
    const sort = url.searchParams.get('sort') ?? 'newest'
    const page = Number(url.searchParams.get('page')) || 1
    const limit = Number(url.searchParams.get('limit')) || 12

    let filtered = [...mockListings]
    if (area) filtered = filtered.filter((l) => l.area.toLowerCase().includes(area.toLowerCase()))
    if (minPrice) filtered = filtered.filter((l) => l.price >= Number(minPrice))
    if (maxPrice) filtered = filtered.filter((l) => l.price <= Number(maxPrice))
    if (bedrooms) filtered = filtered.filter((l) => l.bedrooms >= Number(bedrooms))
    if (status) filtered = filtered.filter((l) => l.status === status)

    if (sort === 'price_asc') filtered.sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price)
    else if (sort === 'oldest') filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    else filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    const total = filtered.length
    const totalPages = Math.ceil(total / limit)
    const items = filtered.slice((page - 1) * limit, page * limit)

    return HttpResponse.json({
      success: true,
      data: { items, total, page, limit, totalPages },
    })
  }),

  http.get(`${BASE}/listings/:id`, ({ params }) => {
    const listing = mockListings.find((l) => l.id === params.id)
    if (!listing) return HttpResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Listing not found' } }, { status: 404 })
    return HttpResponse.json({ success: true, data: listing })
  }),

  http.post(`${BASE}/listings`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>
    listingCounter++
    const id = `l${listingCounter}`
    const listing: Listing = {
      id,
      title: body.title as string,
      description: body.description as string,
      price: body.price as number,
      sizeSqft: body.sizeSqft as number,
      bedrooms: body.bedrooms as number,
      bathrooms: body.bathrooms as number,
      floorNumber: (body.floorNumber as number) ?? 0,
      area: body.area as string,
      city: body.city as string,
      division: '',
      lat: body.latitude as number,
      lng: body.longitude as number,
      amenities: (body.amenities as string[]) ?? [],
      status: 'AVAILABLE',
      landlordId: 'landlord1',
      landlord: { id: 'landlord1', name: 'Rahim Khan', email: 'rahim@test.com', phone: '01711' },
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockListings.push(listing)
    return HttpResponse.json({ success: true, data: listing }, { status: 201 })
  }),

  http.put(`${BASE}/listings/:id`, async ({ params, request }) => {
    const body = (await request.json()) as Record<string, unknown>
    const idx = mockListings.findIndex((l) => l.id === params.id)
    if (idx === -1) return HttpResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Listing not found' } }, { status: 404 })
    mockListings[idx] = { ...mockListings[idx], ...(body as Partial<Listing>) }
    return HttpResponse.json({ success: true, data: mockListings[idx] })
  }),

  http.delete(`${BASE}/listings/:id`, ({ params }) => {
    const idx = mockListings.findIndex((l) => l.id === params.id)
    if (idx === -1) return HttpResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Listing not found' } }, { status: 404 })
    mockListings.splice(idx, 1)
    return HttpResponse.json({ success: true, data: { message: 'Listing deleted successfully' } })
  }),

  http.get(`${BASE}/listings/landlord/:landlordId`, ({ params }) => {
    const items = mockListings.filter((l) => l.landlordId === params.landlordId)
    return HttpResponse.json({ success: true, data: items })
  }),

  // ─── Favorites ───

  http.post(`${BASE}/favorites`, async ({ request }) => {
    const body = (await request.json()) as { listingId: string }
    const listing = mockListings.find((l) => l.id === body.listingId)
    if (!listing) return HttpResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Listing not found' } }, { status: 404 })

    const exists = favorites.find((f) => f.listingId === body.listingId)
    if (exists) return HttpResponse.json({ success: false, error: { code: 'ALREADY_FAVORITED', message: 'Already favorited' } }, { status: 409 })

    favoriteCounter++
    const fav: Favorite = {
      id: `fav${favoriteCounter}`,
      listingId: body.listingId,
      userId: 'tenant1',
      listing,
      createdAt: new Date().toISOString(),
    }
    favorites.push(fav)
    return HttpResponse.json({ success: true, data: fav }, { status: 201 })
  }),

  http.get(`${BASE}/favorites`, ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const limit = Number(url.searchParams.get('limit')) || 20
    const total = favorites.length
    const totalPages = Math.ceil(total / limit)
    const items = favorites.slice((page - 1) * limit, page * limit)
    return HttpResponse.json({ success: true, data: { items, total, page, limit, totalPages } })
  }),

  http.delete(`${BASE}/favorites/:id`, ({ params }) => {
    const idx = favorites.findIndex((f) => f.id === params.id)
    if (idx === -1) return HttpResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Favorite not found' } }, { status: 404 })
    favorites.splice(idx, 1)
    return HttpResponse.json({ success: true, data: { message: 'Favorite removed' } })
  }),

  // ─── Inquiries ───

  http.post(`${BASE}/inquiries`, async ({ request }) => {
    const body = (await request.json()) as { listingId: string; message: string }
    const listing = mockListings.find((l) => l.id === body.listingId)
    if (!listing) return HttpResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Listing not found' } }, { status: 404 })

    inquiryCounter++
    const inquiry: Inquiry = {
      id: `inq${inquiryCounter}`,
      listingId: body.listingId,
      tenantId: 'tenant1',
      message: body.message,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      listing: { id: listing.id, title: listing.title, price: listing.price, area: listing.area, city: listing.city },
      tenant: { id: 'tenant1', name: 'Test Tenant', email: 'tenant@test.com', phone: '01733' },
    }
    inquiries.push(inquiry)
    return HttpResponse.json({ success: true, data: inquiry }, { status: 201 })
  }),

  http.get(`${BASE}/inquiries/sent`, () => {
    const items = inquiries.filter((i) => i.tenantId === 'tenant1')
    return HttpResponse.json({ success: true, data: { items, total: items.length, page: 1, limit: 20, totalPages: 1 } })
  }),

  http.get(`${BASE}/inquiries/received`, () => {
    const items = inquiries.filter((i) => i.listing?.id.startsWith('l'))
    return HttpResponse.json({ success: true, data: { items, total: items.length, page: 1, limit: 20, totalPages: 1 } })
  }),

  http.patch(`${BASE}/inquiries/:id/status`, async ({ params, request }) => {
    const body = (await request.json()) as { status: string }
    const inquiry = inquiries.find((i) => i.id === params.id)
    if (!inquiry) return HttpResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Inquiry not found' } }, { status: 404 })
    inquiry.status = body.status as Inquiry['status']
    return HttpResponse.json({ success: true, data: inquiry })
  }),

  // ─── Reviews ───

  http.get(`${BASE}/reviews/listing/:listingId`, ({ params }) => {
    const items = mockReviews.filter((r) => r.listingId === params.listingId)
    return HttpResponse.json({ success: true, data: items })
  }),

  http.post(`${BASE}/reviews`, async ({ request }) => {
    const body = (await request.json()) as { listingId: string; rating: number; comment: string }
    reviewCounter++
    const review: Review = {
      id: `r${reviewCounter}`,
      listingId: body.listingId,
      tenantId: 'tenant1',
      rating: body.rating,
      comment: body.comment,
      createdAt: new Date().toISOString(),
      tenant: { id: 'tenant1', name: 'Test Tenant' },
    }
    mockReviews.push(review)
    return HttpResponse.json({ success: true, data: review }, { status: 201 })
  }),

  http.put(`${BASE}/reviews/:id`, async ({ params, request }) => {
    const body = (await request.json()) as { rating: number; comment: string }
    const review = mockReviews.find((r) => r.id === params.id)
    if (!review) return HttpResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Review not found' } }, { status: 404 })
    review.rating = body.rating
    review.comment = body.comment
    return HttpResponse.json({ success: true, data: review })
  }),

  http.delete(`${BASE}/reviews/:id`, ({ params }) => {
    const idx = mockReviews.findIndex((r) => r.id === params.id)
    if (idx === -1) return HttpResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Review not found' } }, { status: 404 })
    mockReviews.splice(idx, 1)
    return HttpResponse.json({ success: true, data: { message: 'Review deleted' } })
  }),

  http.post(`${BASE}/ai/recommend`, async ({ request }) => {
    const body = (await request.json()) as { query: string }
    const q = body.query.toLowerCase()
    const area = mockListings.find((l) => q.includes(l.area.toLowerCase()))?.area
    const results = area
      ? mockListings.filter((l) => l.area.toLowerCase() === area.toLowerCase() && l.status === 'AVAILABLE')
      : mockListings.filter((l) => l.status === 'AVAILABLE')
    return HttpResponse.json({
      success: true,
      data: {
        query: body.query,
        parsedFilters: area ? { area } : {},
        usedFallback: false,
        results,
        total: results.length,
      },
    })
  }),

  http.post(`${BASE}/ai/price`, async ({ request }) => {
    const body = (await request.json()) as { query: string }
    const q = body.query.toLowerCase()
    const area = mockListings.find((l) => q.includes(l.area.toLowerCase()))?.area ?? 'Panchlaish'
    const listings = mockListings.filter(
      (l) => l.area.toLowerCase() === area.toLowerCase() && l.status === 'AVAILABLE'
    )
    const prices = listings.map((l) => l.price)
    const cheapest = [...listings].sort((a, b) => a.price - b.price)
    const bestReviewed = [...listings].sort((a, b) => {
      const ratingOf = (id: string) => mockReviews.filter((r) => r.listingId === id).reduce((s, r) => s + r.rating, 0)
      return ratingOf(b.id) - ratingOf(a.id)
    })
    return HttpResponse.json({
      success: true,
      data: {
        query: body.query,
        area,
        summary: {
          count: listings.length,
          minPrice: prices.length ? Math.min(...prices) : null,
          avgPrice: prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : null,
          maxPrice: prices.length ? Math.max(...prices) : null,
        },
        cheapest,
        bestReviewed,
        insight: `Rents in ${area} currently range from ৳${Math.min(...prices)} to ৳${Math.max(...prices)} per month.`,
      },
    })
  }),
]

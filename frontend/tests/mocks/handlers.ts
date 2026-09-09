import { http, HttpResponse } from 'msw'
import type { Listing, ListingStatus } from '../../src/types/listing.types'
import type { Favorite } from '../../src/types/favorite.types'
import type { Inquiry } from '../../src/types/inquiry.types'
import type { Review } from '../../src/types/review.types'
import type { AdminUser } from '../../src/types/admin.types'
import type { UserRole } from '../../src/types/user.types'

const BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api'

// ── Data ──

const mockListings: Listing[] = [
  {
    id: 'l1', title: 'Modern 2BR in Panchlaish', description: 'Spacious two-bedroom flat',
    price: 15000, sizeSqft: 1100, bedrooms: 2, bathrooms: 2,
    floorNumber: 3, address: 'House 12, Road 5, Panchlaish', area: 'Panchlaish', city: 'Chattogram',
    latitude: 22.3569, longitude: 91.7832, amenities: ['Gas', 'Electricity', 'Water'],
    status: 'AVAILABLE', landlordId: 'landlord1',
    landlord: { id: 'landlord1', name: 'Rahim Khan', email: 'rahim@test.com', phone: '01711' },
    images: [{ id: 'img1', listingId: 'l1', imageUrl: 'https://picsum.photos/seed/l1/800/600', isPrimary: true, orderIndex: 0 }],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: 'l2', title: 'Budget 1BR near IIUC', description: 'Affordable single bedroom for students',
    price: 8000, sizeSqft: 550, bedrooms: 1, bathrooms: 1,
    floorNumber: 2, address: 'College Road, Kumira', area: 'Kumira', city: 'Chattogram',
    latitude: 22.3852, longitude: 91.8115, amenities: ['Electricity', 'Water'],
    status: 'AVAILABLE', landlordId: 'landlord1',
    landlord: { id: 'landlord1', name: 'Rahim Khan', email: 'rahim@test.com', phone: '01711' },
    images: [{ id: 'img2', listingId: 'l2', imageUrl: 'https://picsum.photos/seed/l2/800/600', isPrimary: true, orderIndex: 0 }],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: 'l3', title: 'Luxury 3BR in Khulshi', description: 'Premium three-bedroom apartment',
    price: 35000, sizeSqft: 1800, bedrooms: 3, bathrooms: 2,
    floorNumber: 5, address: 'Apt 3A, Khulshi Heights', area: 'Khulshi', city: 'Chattogram',
    latitude: 22.3685, longitude: 91.7983, amenities: ['Gas', 'Electricity', 'Water', 'Parking'],
    status: 'AVAILABLE', landlordId: 'landlord2',
    landlord: { id: 'landlord2', name: 'Karim Uddin', email: 'karim@test.com', phone: '01722' },
    images: [{ id: 'img3', listingId: 'l3', imageUrl: 'https://picsum.photos/seed/l3/800/600', isPrimary: true, orderIndex: 0 }],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: 'l4', title: 'Studio in GEC', description: 'Compact studio in the heart of the city',
    price: 12000, sizeSqft: 400, bedrooms: 1, bathrooms: 1,
    floorNumber: 6, address: 'Studio 7, GEC Circle', area: 'Nasirabad', city: 'Chattogram',
    latitude: 22.3601, longitude: 91.7902, amenities: ['Electricity', 'Water', 'Lift'],
    status: 'RENTED', landlordId: 'landlord2',
    landlord: { id: 'landlord2', name: 'Karim Uddin', email: 'karim@test.com', phone: '01722' },
    images: [],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
]

let listingCounter = 4
let favoriteCounter = 0
let inquiryCounter = 0

const favorites: Favorite[] = []
const inquiries: Inquiry[] = []

const mockReviews: Review[] = [
  {
    id: 'r1',
    listingId: 'l1',
    tenantId: 'tenant1',
    rating: 5,
    comment: 'Quiet block and the landlord keeps his word.',
    createdAt: new Date().toISOString(),
    tenant: { id: 'tenant1', name: 'Test Tenant' },
  },
  {
    id: 'r2',
    listingId: 'l1',
    tenantId: 'tenant2',
    rating: 4,
    comment: 'Good value. The monsoon rains leak a little.',
    createdAt: new Date().toISOString(),
    tenant: { id: 'tenant2', name: 'Farhana' },
  },
]

const testUser = { id: 'tenant1', name: 'Test Tenant', email: 'tenant@test.com', role: 'TENANT' as const }
const testAccessToken = 'test-access-token'

let currentUser = {
  ...testUser,
  phone: '01733333333',
  isVerified: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const iso = new Date().toISOString()

const mockUsers: AdminUser[] = [
  {
    id: 'tenant1', name: 'Test Tenant', email: 'tenant@test.com', phone: '01733333333',
    role: 'TENANT', isVerified: true, isBanned: false, createdAt: iso, updatedAt: iso,
  },
  {
    id: 'landlord1', name: 'Rahim Khan', email: 'rahim@test.com', phone: '01711',
    role: 'LANDLORD', isVerified: true, isBanned: false, createdAt: iso, updatedAt: iso,
  },
  {
    id: 'landlord2', name: 'Karim Uddin', email: 'karim@test.com', phone: '01722',
    role: 'LANDLORD', isVerified: true, isBanned: false, createdAt: iso, updatedAt: iso,
  },
  {
    id: 'admin1', name: 'Admin User', email: 'admin@test.com', phone: '01800',
    role: 'ADMIN', isVerified: true, isBanned: false, createdAt: iso, updatedAt: iso,
  },
]

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
      data: currentUser,
    }),
  ),

  http.post(`${BASE}/auth/logout`, () =>
    HttpResponse.json({ success: true, data: { message: 'Logged out' } }),
  ),

  http.post(`${BASE}/auth/forgot-password`, () =>
    HttpResponse.json({
      success: true,
      data: { message: 'If that email is registered, a reset link has been sent' },
    }),
  ),

  http.post(`${BASE}/auth/reset-password`, () =>
    HttpResponse.json({ success: true, data: { message: 'Password updated' } }),
  ),

  http.post(`${BASE}/auth/verify/request`, () =>
    HttpResponse.json({
      success: true,
      data: { message: 'Verification code sent' },
    }),
  ),

  http.post(`${BASE}/auth/verify`, () =>
    HttpResponse.json({
      success: true,
      data: { ...currentUser, isVerified: true },
    }),
  ),

  // ─── Users ───

  http.patch(`${BASE}/users/:id`, async ({ request }) => {
    const body = (await request.json()) as { name?: string; phone?: string }
    currentUser = { ...currentUser, ...body, updatedAt: new Date().toISOString() }
    return HttpResponse.json({ success: true, data: currentUser })
  }),

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
      address: body.address as string,
      area: body.area as string,
      city: body.city as string,
      latitude: body.latitude as number,
      longitude: body.longitude as number,
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
    const listing = mockListings.find((l) => l.id === body.listingId)
    if (!listing) return HttpResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Listing not found' } }, { status: 404 })

    const existing = mockReviews.find((r) => r.listingId === body.listingId && r.tenantId === testUser.id)
    if (existing) return HttpResponse.json({ success: false, error: { code: 'ALREADY_REVIEWED', message: 'You have already reviewed this listing' } }, { status: 409 })

    const review: Review = {
      id: `r${mockReviews.length + 1}`,
      listingId: body.listingId,
      tenantId: testUser.id,
      rating: body.rating,
      comment: body.comment,
      createdAt: new Date().toISOString(),
      tenant: { id: testUser.id, name: testUser.name },
    }
    mockReviews.push(review)
    return HttpResponse.json({ success: true, data: review }, { status: 201 })
  }),

  // ─── AI Search ───

  http.post(`${BASE}/ai/recommend`, async ({ request }) => {
    const body = (await request.json()) as { query: string; sort?: string; location?: { lat: number; lng: number } }
    const sort = body.sort ?? 'relevance'

    let results = [...mockListings.filter((l) => l.status === 'AVAILABLE')]
    if (sort === 'price_asc') results.sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') results.sort((a, b) => b.price - a.price)
    else if (sort === 'highest_rated') results.sort((a, b) => (b.price > a.price ? 1 : -1))
    else if (sort === 'most_reviewed') results.sort((a, b) => b.price - a.price)
    else if (sort === 'nearest' && body.location) {
      results.sort(
        (a, b) =>
          Math.abs(Number(a.latitude ?? 0) - body.location!.lat) +
          Math.abs(Number(a.longitude ?? 0) - body.location!.lng) -
          (Math.abs(Number(b.latitude ?? 0) - body.location!.lat) + Math.abs(Number(b.longitude ?? 0) - body.location!.lng)),
      )
    } else {
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    const parsedFilters: Record<string, unknown> = {}
    if (/khulshi/i.test(body.query)) parsedFilters.area = 'Khulshi'
    if (/under (\d+)/i.test(body.query)) parsedFilters.maxPrice = Number(body.query.match(/under (\d+)/i)?.[1])
    if (/(\d+)\s*bed/i.test(body.query)) parsedFilters.minBedrooms = Number(body.query.match(/(\d+)\s*bed/i)?.[1])

    return HttpResponse.json({
      success: true,
      data: {
        query: body.query,
        parsedFilters,
        usedFallback: false,
        sort,
        results,
        total: results.length,
      },
    })
  }),

  // ─── Admin ───

  http.get(`${BASE}/admin/users`, ({ request }) => {
    const url = new URL(request.url)
    const role = url.searchParams.get('role')
    const page = Number(url.searchParams.get('page')) || 1
    const limit = Number(url.searchParams.get('limit')) || 20

    let filtered = [...mockUsers]
    if (role) filtered = filtered.filter((u) => u.role === role)

    const total = filtered.length
    const totalPages = Math.ceil(total / limit)
    const items = filtered.slice((page - 1) * limit, page * limit)

    return HttpResponse.json({
      success: true,
      data: { items, total, page, limit, totalPages },
    })
  }),

  http.patch(`${BASE}/admin/users/:id/role`, async ({ params, request }) => {
    const body = (await request.json()) as { role: UserRole }
    const user = mockUsers.find((u) => u.id === params.id)
    if (!user) return HttpResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } }, { status: 404 })
    user.role = body.role
    user.updatedAt = new Date().toISOString()
    return HttpResponse.json({ success: true, data: user })
  }),

  http.patch(`${BASE}/admin/users/:id/ban`, async ({ params, request }) => {
    const body = (await request.json()) as { banned: boolean }
    const user = mockUsers.find((u) => u.id === params.id)
    if (!user) return HttpResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } }, { status: 404 })
    user.isBanned = body.banned
    user.updatedAt = new Date().toISOString()
    return HttpResponse.json({ success: true, data: user })
  }),

  http.get(`${BASE}/admin/listings`, ({ request }) => {
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    const page = Number(url.searchParams.get('page')) || 1
    const limit = Number(url.searchParams.get('limit')) || 20

    let filtered = [...mockListings]
    if (status) filtered = filtered.filter((l) => l.status === status)

    const total = filtered.length
    const totalPages = Math.ceil(total / limit)
    const items = filtered.slice((page - 1) * limit, page * limit)

    return HttpResponse.json({
      success: true,
      data: { items, total, page, limit, totalPages },
    })
  }),

  http.patch(`${BASE}/admin/listings/:id/status`, async ({ params, request }) => {
    const body = (await request.json()) as { status: ListingStatus }
    const listing = mockListings.find((l) => l.id === params.id)
    if (!listing) return HttpResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Listing not found' } }, { status: 404 })
    listing.status = body.status
    listing.updatedAt = new Date().toISOString()
    return HttpResponse.json({ success: true, data: listing })
  }),
]

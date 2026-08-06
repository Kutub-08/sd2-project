import "dotenv/config";
import { beforeAll, afterAll, beforeEach, it, expect, jest, describe } from "@jest/globals";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let request: any, app: any, prisma: any, clearDatabase: any, seedUsers: any, seedListings: any, setTokens: any, getAccessToken: any;

const mockGenerateContent = jest.fn<() => Promise<unknown>>();

jest.unstable_mockModule("@google/generative-ai", () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: mockGenerateContent,
    }),
  })),
}));

beforeAll(async () => {
  const mod = await import("./helpers.js");
  const supertest = await import("supertest");
  request = supertest.default;
  app = mod.app;
  prisma = mod.prisma;
  clearDatabase = mod.clearDatabase;
  seedUsers = mod.seedUsers;
  seedListings = mod.seedListings;
  setTokens = mod.setTokens;
  getAccessToken = mod.getAccessToken;
});

// ── Globals ──

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let users: any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let listings: any;

// ── Setup / Teardown ──

beforeAll(async () => {
  await clearDatabase();
  const sUsers = await seedUsers();
  const sListings = await seedListings(sUsers.landlord1.id, sUsers.landlord2.id);
  users = sUsers;
  listings = sListings;
});

afterAll(async () => {
  await clearDatabase();
  await prisma.$disconnect();
});

// ── Helper: login and store tokens ──

async function loginAs(email: string, password: string) {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email, password })
    .expect(200);

  const cookies = res.headers["set-cookie"];
  const refreshCookie = Array.isArray(cookies) ? cookies.join("; ") : cookies ?? "";
  setTokens(res.body.data.accessToken, refreshCookie);
  return res.body.data;
}

function authHeader() {
  return { Authorization: `Bearer ${getAccessToken()}` };
}

// ════════════════════════════════════════════
//  Auth
// ════════════════════════════════════════════

describe("Auth", () => {
  it("POST /api/auth/register — creates a new tenant", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "New Tenant", email: "newtenant@test.com", phone: "01755555555", password: "password123", role: "TENANT" })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe("newtenant@test.com");
    expect(res.body.data.user.role).toBe("TENANT");
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("POST /api/auth/register — rejects duplicate email", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Dup", email: "newtenant@test.com", phone: "01766666666", password: "password123", role: "TENANT" })
      .expect(409);

    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("EMAIL_TAKEN");
  });

  it("POST /api/auth/login — valid credentials", async () => {
    const payload = await loginAs("tenantA@test.com", "password123");
    expect(payload.user.email).toBe("tenantA@test.com");
    expect(payload.accessToken).toBeDefined();
  });

  it("POST /api/auth/login — invalid password returns 401", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "tenantA@test.com", password: "wrong" })
      .expect(401);

    expect(res.body.error.code).toBe("INVALID_CREDENTIALS");
  });

  it("POST /api/auth/refresh — issues new tokens", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "tenantA@test.com", password: "password123" })
      .expect(200);

    const cookies = loginRes.headers["set-cookie"];
    const cookie = Array.isArray(cookies) ? cookies.join("; ") : cookies ?? "";

    const res = await request(app)
      .post("/api/auth/refresh")
      .set("Cookie", cookie)
      .expect(200);

    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user.email).toBe("tenantA@test.com");
  });

  it("POST /api/auth/refresh — invalid cookie returns 401", async () => {
    const res = await request(app)
      .post("/api/auth/refresh")
      .set("Cookie", "refreshToken=invalid")
      .expect(401);

    expect(res.body.error.code).toBe("INVALID_REFRESH_TOKEN");
  });

  it("GET /api/auth/me — returns authenticated user", async () => {
    await loginAs("tenantA@test.com", "password123");

    const res = await request(app)
      .get("/api/auth/me")
      .set(authHeader())
      .expect(200);

    expect(res.body.data.email).toBe("tenantA@test.com");
  });

  it("GET /api/auth/me — no token returns 401", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .expect(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });
});

// ════════════════════════════════════════════
//  Listings — CRUD + isOwner
// ════════════════════════════════════════════

describe("Listings", () => {
  let createdListingId: string;

  it("POST /api/listings — landlord creates listing", async () => {
    await loginAs("landlordA@test.com", "password123");

    const res = await request(app)
      .post("/api/listings")
      .set(authHeader())
      .send({
        title: "New Test Listing",
        description: "A brand new listing for testing purposes",
        price: 20000,
        sizeSqft: 1200,
        bedrooms: 3,
        bathrooms: 2,
        address: "123 Test Street",
        area: "Test Area",
        city: "Test City",
        latitude: 22.35,
        longitude: 91.78,
        amenities: ["Gas", "Water"],
      })
      .expect(201);

    expect(res.body.data.title).toBe("New Test Listing");
    expect(res.body.data.landlordId).toBe(users.landlord1.id);
    createdListingId = res.body.data.id;
  });

  it("POST /api/listings — tenant cannot create (403)", async () => {
    await loginAs("tenantA@test.com", "password123");

    const res = await request(app)
      .post("/api/listings")
      .set(authHeader())
      .send({
        title: "Should Fail",
        description: "Tenant trying to create listing",
        price: 10000,
        sizeSqft: 500,
        bedrooms: 1,
        bathrooms: 1,
        address: "Somewhere",
        area: "Area",
        city: "City",
        latitude: 22,
        longitude: 91,
      })
      .expect(403);

    expect(res.body.error.code).toBe("FORBIDDEN");
  });

  it("POST /api/listings — validation error returns 400", async () => {
    await loginAs("landlordA@test.com", "password123");

    const res = await request(app)
      .post("/api/listings")
      .set(authHeader())
      .send({ title: "AB" })
      .expect(400);

    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("PUT /api/listings/:id — owner can update", async () => {
    await loginAs("landlordA@test.com", "password123");

    const res = await request(app)
      .put(`/api/listings/${createdListingId}`)
      .set(authHeader())
      .send({ title: "Updated Title", price: 22000 })
      .expect(200);

    expect(res.body.data.title).toBe("Updated Title");
    expect(Number(res.body.data.price)).toBe(22000);
  });

  it("PUT /api/listings/:id — landlord A cannot edit landlord B's listing (isOwner 403)", async () => {
    await loginAs("landlordA@test.com", "password123");

    const res = await request(app)
      .put(`/api/listings/${listings.l3.id}`)
      .set(authHeader())
      .send({ title: "Hacked" })
      .expect(403);

    expect(res.body.error.code).toBe("FORBIDDEN");
  });

  it("DELETE /api/listings/:id — owner can delete", async () => {
    await loginAs("landlordA@test.com", "password123");

    // create a temp listing to delete
    const createRes = await request(app)
      .post("/api/listings")
      .set(authHeader())
      .send({
        title: "Temp Listing",
        description: "Will be deleted shortly",
        price: 5000,
        sizeSqft: 300,
        bedrooms: 1,
        bathrooms: 1,
        address: "Temp Address",
        area: "Temp Area",
        city: "Temp City",
        latitude: 22,
        longitude: 91,
      })
      .expect(201);

    const res = await request(app)
      .delete(`/api/listings/${createRes.body.data.id}`)
      .set(authHeader())
      .expect(200);

    expect(res.body.data.message).toBe("Listing deleted successfully");
  });

  it("DELETE /api/listings/:id — non-owner cannot delete (403)", async () => {
    await loginAs("landlordA@test.com", "password123");

    const res = await request(app)
      .delete(`/api/listings/${listings.l3.id}`)
      .set(authHeader())
      .expect(403);

    expect(res.body.error.code).toBe("FORBIDDEN");
  });
});

// ════════════════════════════════════════════
//  Listings — Search / Filter / Pagination
// ════════════════════════════════════════════

describe("Listings — search/filter/pagination", () => {
  it("GET /api/listings — returns all listings with pagination", async () => {
    const res = await request(app)
      .get("/api/listings")
      .expect(200);

    expect(res.body.data.items.length).toBeGreaterThanOrEqual(4);
    expect(res.body.data.total).toBeGreaterThanOrEqual(4);
    expect(res.body.data.page).toBe(1);
    expect(res.body.data.totalPages).toBeGreaterThanOrEqual(1);
  });

  it("GET /api/listings — filters by price range", async () => {
    const res = await request(app)
      .get("/api/listings?minPrice=10000&maxPrice=20000")
      .expect(200);

    for (const item of res.body.data.items as Array<{ price: string }>) {
      const p = Number(item.price);
      expect(p).toBeGreaterThanOrEqual(10000);
      expect(p).toBeLessThanOrEqual(20000);
    }
  });

  it("GET /api/listings — filters by bedrooms", async () => {
    const res = await request(app)
      .get("/api/listings?bedrooms=2")
      .expect(200);

    for (const item of res.body.data.items as Array<{ bedrooms: number }>) {
      expect(item.bedrooms).toBe(2);
    }
  });

  it("GET /api/listings — filters by area (case-insensitive)", async () => {
    const res = await request(app)
      .get("/api/listings?area=panchlaish")
      .expect(200);

    expect(res.body.data.items.length).toBeGreaterThanOrEqual(1);
  });

  it("GET /api/listings — pagination limits results", async () => {
    const res = await request(app)
      .get("/api/listings?page=1&limit=2")
      .expect(200);

    expect(res.body.data.items.length).toBeLessThanOrEqual(2);
    expect(res.body.data.limit).toBe(2);
  });

  it("GET /api/listings — sorts by price ascending", async () => {
    const res = await request(app)
      .get("/api/listings?sort=price_asc")
      .expect(200);

    const prices = (res.body.data.items as Array<{ price: string }>).map((i) => Number(i.price));
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  it("GET /api/listings/:id — returns single listing", async () => {
    const res = await request(app)
      .get(`/api/listings/${listings.l1.id}`)
      .expect(200);

    expect(res.body.data.id).toBe(listings.l1.id);
    expect(res.body.data.title).toBe("Modern 2BR in Panchlaish");
  });

  it("GET /api/listings/landlord/:landlordId — returns landlord's listings", async () => {
    const res = await request(app)
      .get(`/api/listings/landlord/${users.landlord1.id}`)
      .expect(200);

    for (const item of res.body.data as Array<{ landlordId: string }>) {
      expect(item.landlordId).toBe(users.landlord1.id);
    }
  });

  it("GET /api/listings — filters by status (RENTED)", async () => {
    const res = await request(app)
      .get("/api/listings?status=RENTED")
      .expect(200);

    for (const item of res.body.data.items as Array<{ status: string }>) {
      expect(item.status).toBe("RENTED");
    }
  });
});

// ════════════════════════════════════════════
//  Favorites
// ════════════════════════════════════════════

describe("Favorites", () => {
  let favoriteId: string;

  it("POST /api/favorites — tenant favorites a listing", async () => {
    await loginAs("tenantA@test.com", "password123");

    const res = await request(app)
      .post("/api/favorites")
      .set(authHeader())
      .send({ listingId: listings.l1.id })
      .expect(201);

    expect(res.body.data.userId).toBe(users.tenant1.id);
    expect(res.body.data.listingId).toBe(listings.l1.id);
    favoriteId = res.body.data.id;
  });

  it("POST /api/favorites — duplicate returns 409", async () => {
    const res = await request(app)
      .post("/api/favorites")
      .set(authHeader())
      .send({ listingId: listings.l1.id })
      .expect(409);

    expect(res.body.error.code).toBe("ALREADY_FAVORITED");
  });

  it("POST /api/favorites — nonexistent listing returns 404", async () => {
    const res = await request(app)
      .post("/api/favorites")
      .set(authHeader())
      .send({ listingId: "00000000-0000-0000-0000-000000000000" })
      .expect(404);

    expect(res.body.error.code).toBe("NOT_FOUND");
  });

  it("GET /api/favorites — lists favorites", async () => {
    const res = await request(app)
      .get("/api/favorites")
      .set(authHeader())
      .expect(200);

    expect(res.body.data.items.length).toBeGreaterThanOrEqual(1);
  });

  it("DELETE /api/favorites/:id — removes favorite", async () => {
    const res = await request(app)
      .delete(`/api/favorites/${favoriteId}`)
      .set(authHeader())
      .expect(200);

    expect(res.body.data.message).toBe("Favorite removed successfully");
  });

  it("POST /api/favorites — landlord cannot favorite (403)", async () => {
    await loginAs("landlordA@test.com", "password123");

    const res = await request(app)
      .post("/api/favorites")
      .set(authHeader())
      .send({ listingId: listings.l1.id })
      .expect(403);

    expect(res.body.error.code).toBe("FORBIDDEN");
  });
});

// ════════════════════════════════════════════
//  Inquiries
// ════════════════════════════════════════════

describe("Inquiries", () => {
  let inquiryId: string;

  it("POST /api/inquiries — tenant creates inquiry", async () => {
    await loginAs("tenantA@test.com", "password123");

    const res = await request(app)
      .post("/api/inquiries")
      .set(authHeader())
      .send({ listingId: listings.l1.id, message: "I am very interested in this flat. Can I visit this weekend?" })
      .expect(201);

    expect(res.body.data.listingId).toBe(listings.l1.id);
    expect(res.body.data.tenantId).toBe(users.tenant1.id);
    inquiryId = res.body.data.id;
  });

  it("POST /api/inquiries — listing not found returns 404", async () => {
    const res = await request(app)
      .post("/api/inquiries")
      .set(authHeader())
      .send({ listingId: "00000000-0000-0000-0000-000000000000", message: "Is this place still available for rent?" })
      .expect(404);

    expect(res.body.error.code).toBe("NOT_FOUND");
  });

  it("POST /api/inquiries — validation error on short message", async () => {
    const res = await request(app)
      .post("/api/inquiries")
      .set(authHeader())
      .send({ listingId: listings.l1.id, message: "Hi" })
      .expect(400);

    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("GET /api/inquiries/sent — tenant sees sent inquiries", async () => {
    const res = await request(app)
      .get("/api/inquiries/sent")
      .set(authHeader())
      .expect(200);

    expect(res.body.data.items.length).toBeGreaterThanOrEqual(1);
  });

  it("GET /api/inquiries/received — landlord sees received inquiries", async () => {
    await loginAs("landlordA@test.com", "password123");

    const res = await request(app)
      .get("/api/inquiries/received")
      .set(authHeader())
      .expect(200);

    expect(res.body.data.items.length).toBeGreaterThanOrEqual(1);
  });

  it("PATCH /api/inquiries/:id/status — landlord updates status", async () => {
    const res = await request(app)
      .patch(`/api/inquiries/${inquiryId}/status`)
      .set(authHeader())
      .send({ status: "RESPONDED" })
      .expect(200);

    expect(res.body.data.status).toBe("RESPONDED");
  });

  it("POST /api/inquiries — daily limit reached (429)", async () => {
    await loginAs("tenantA@test.com", "password123");

    const msg = "Inquiry number X for daily limit testing purposes here";
    for (let i = 0; i < 4; i++) {
      await request(app)
        .post("/api/inquiries")
        .set(authHeader())
        .send({ listingId: listings.l1.id, message: `${msg} ${i}` })
        .expect(201);
    }

    const res = await request(app)
      .post("/api/inquiries")
      .set(authHeader())
      .send({ listingId: listings.l1.id, message: "This should exceed the daily limit for inquiries sent today" })
      .expect(429);

    expect(res.body.error.code).toBe("RATE_LIMITED");
  });
});

// ════════════════════════════════════════════
//  AI Recommend
// ════════════════════════════════════════════

describe("AI Recommend", () => {
  beforeEach(() => {
    mockGenerateContent.mockReset();
  });

  it("POST /api/ai/recommend — success path with parsed filters", async () => {
    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => '{"maxPrice": 15000, "minBedrooms": 2, "area": "Panchlaish"}',
      },
    } satisfies { response: { text: () => string } });

    const res = await request(app)
      .post("/api/ai/recommend")
      .send({ query: "2 bed flat under 15000 in Panchlaish" })
      .expect(200);

    expect(res.body.data.query).toBe("2 bed flat under 15000 in Panchlaish");
    expect(res.body.data.parsedFilters.maxPrice).toBe(15000);
    expect(res.body.data.parsedFilters.minBedrooms).toBe(2);
    expect(res.body.data.parsedFilters.area).toBe("Panchlaish");
    expect(res.body.data.usedFallback).toBe(false);
    expect(res.body.data.results.length).toBeGreaterThanOrEqual(1);
    expect(res.body.data.total).toBeGreaterThanOrEqual(1);
  });

  it("POST /api/ai/recommend — Gemini failure triggers fallback", async () => {
    mockGenerateContent.mockRejectedValue(new Error("Gemini API error"));

    const res = await request(app)
      .post("/api/ai/recommend")
      .send({ query: "affordable flat in Chattogram" })
      .expect(200);

    expect(res.body.data.usedFallback).toBe(true);
    expect(res.body.data.results.length).toBeGreaterThanOrEqual(1);
  });

  it("POST /api/ai/recommend — validation rejects short query", async () => {
    const res = await request(app)
      .post("/api/ai/recommend")
      .send({ query: "ab" })
      .expect(400);

    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });
});

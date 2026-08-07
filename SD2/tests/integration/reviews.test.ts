import "dotenv/config";
import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";

let request: any, app: any, prisma: any, clearDatabase: any, seedUsers: any, seedListings: any;
let users: any, listings: any, tokenA: string;

beforeAll(async () => {
  const mod = await import("../helpers.js");
  const supertest = await import("supertest");
  request = supertest.default;
  app = mod.app;
  prisma = mod.prisma;
  clearDatabase = mod.clearDatabase;
  seedUsers = mod.seedUsers;
  seedListings = mod.seedListings;

  await clearDatabase();
  users = await seedUsers();
  listings = await seedListings(users.landlord1.id, users.landlord2.id);

  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({ email: "tenantA@test.com", password: "password123" })
    .expect(200);
  tokenA = loginRes.body.data.accessToken;
});

afterAll(async () => {
  await clearDatabase();
  await prisma.$disconnect();
});

function auth() {
  return { Authorization: `Bearer ${tokenA}` };
}

function landlordAuth() {
  return request(app)
    .post("/api/auth/login")
    .send({ email: "landlordA@test.com", password: "password123" })
    .then((r: any) => r.body.data.accessToken);
}

describe("Reviews", () => {
  it("POST /api/reviews — tenant creates a review", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .set(auth())
      .send({ listingId: listings.l1.id, rating: 5, comment: "Excellent flat, highly recommend!" })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data.rating).toBe(5);
    expect(res.body.data.tenantId).toBe(users.tenant1.id);
    expect(res.body.data.listingId).toBe(listings.l1.id);
  });

  it("POST /api/reviews — rejects duplicate review (409)", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .set(auth())
      .send({ listingId: listings.l1.id, rating: 3, comment: "Trying to review again..." })
      .expect(409);

    expect(res.body.error.code).toBe("ALREADY_REVIEWED");
  });

  it("POST /api/reviews — rejects review for nonexistent listing (404)", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .set(auth())
      .send({ listingId: "00000000-0000-0000-0000-000000000000", rating: 4, comment: "This listing does not exist" })
      .expect(404);

    expect(res.body.error.code).toBe("NOT_FOUND");
  });

  it("POST /api/reviews — validates rating range (400)", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .set(auth())
      .send({ listingId: listings.l2.id, rating: 6, comment: "Rating out of range" })
      .expect(400);

    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("POST /api/reviews — validates comment length (400)", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .set(auth())
      .send({ listingId: listings.l2.id, rating: 4, comment: "AB" })
      .expect(400);

    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("POST /api/reviews — landlord cannot review own listing (403)", async () => {
    const lToken = await landlordAuth();

    const res = await request(app)
      .post("/api/reviews")
      .set({ Authorization: `Bearer ${lToken}` })
      .send({ listingId: listings.l2.id, rating: 4, comment: "Landlord trying to review own listing" })
      .expect(403);

    expect(res.body.error.code).toBe("CANNOT_REVIEW_OWN_LISTING");
  });

  it("GET /api/reviews/listing/:listingId — returns reviews for listing", async () => {
    const res = await request(app)
      .get(`/api/reviews/listing/${listings.l1.id}`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(res.body.data[0].tenant.name).toBe("Tenant A");
  });

  it("GET /api/reviews/listing/:listingId — 404 for nonexistent listing", async () => {
    const res = await request(app)
      .get("/api/reviews/listing/00000000-0000-0000-0000-000000000000")
      .expect(404);

    expect(res.body.error.code).toBe("NOT_FOUND");
  });

  it("GET /api/reviews/listing/:listingId — returns empty array for listing with no reviews", async () => {
    const res = await request(app)
      .get(`/api/reviews/listing/${listings.l3.id}`)
      .expect(200);

    expect(res.body.data).toEqual([]);
  });

  it("POST /api/reviews — landlord can review another landlord's listing (201)", async () => {
    const lToken = await landlordAuth();

    const res = await request(app)
      .post("/api/reviews")
      .set({ Authorization: `Bearer ${lToken}` })
      .send({ listingId: listings.l3.id, rating: 4, comment: "Great place to live nearby" })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data.rating).toBe(4);
    expect(res.body.data.tenantId).toBe(users.landlord1.id);
  });

  it("PUT /api/reviews/:id — owner updates own review (200)", async () => {
    const reviews = await request(app).get(`/api/reviews/listing/${listings.l1.id}`).expect(200);
    const myReview = reviews.body.data.find((r: any) => r.tenantId === users.tenant1.id);

    const res = await request(app)
      .put(`/api/reviews/${myReview.id}`)
      .set(auth())
      .send({ rating: 4, comment: "Updated my review after visiting" })
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.rating).toBe(4);
    expect(res.body.data.comment).toBe("Updated my review after visiting");
  });

  it("PUT /api/reviews/:id — cannot update someone else's review (403)", async () => {
    const reviews = await request(app).get(`/api/reviews/listing/${listings.l3.id}`).expect(200);
    const landlordReview = reviews.body.data.find((r: any) => r.tenantId === users.landlord1.id);

    const res = await request(app)
      .put(`/api/reviews/${landlordReview.id}`)
      .set(auth())
      .send({ rating: 1, comment: "Trying to hijack a review" })
      .expect(403);

    expect(res.body.error.code).toBe("FORBIDDEN");
  });

  it("PUT /api/reviews/:id — validates rating range (400)", async () => {
    const reviews = await request(app).get(`/api/reviews/listing/${listings.l1.id}`).expect(200);
    const myReview = reviews.body.data.find((r: any) => r.tenantId === users.tenant1.id);

    const res = await request(app)
      .put(`/api/reviews/${myReview.id}`)
      .set(auth())
      .send({ rating: 7, comment: "Out of range rating" })
      .expect(400);

    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("PUT /api/reviews/:id — requires authentication (401)", async () => {
    const res = await request(app)
      .put(`/api/reviews/00000000-0000-0000-0000-000000000000`)
      .send({ rating: 3, comment: "Not logged in" })
      .expect(401);

    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("DELETE /api/reviews/:id — nonexistent review (404)", async () => {
    const res = await request(app)
      .delete(`/api/reviews/00000000-0000-0000-0000-000000000000`)
      .set(auth())
      .expect(404);

    expect(res.body.error.code).toBe("NOT_FOUND");
  });

  it("DELETE /api/reviews/:id — owner deletes own review (200)", async () => {
    const reviews = await request(app).get(`/api/reviews/listing/${listings.l3.id}`).expect(200);
    const landlordReview = reviews.body.data.find((r: any) => r.tenantId === users.landlord1.id);

    const res = await request(app)
      .delete(`/api/reviews/${landlordReview.id}`)
      .set({ Authorization: `Bearer ${await landlordAuth()}` })
      .expect(200);

    expect(res.body.success).toBe(true);

    const after = await request(app).get(`/api/reviews/listing/${listings.l3.id}`).expect(200);
    expect(after.body.data).toEqual([]);
  });
});

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
}, 30000);

afterAll(async () => {
  await clearDatabase();
  await prisma.$disconnect();
});

function auth() {
  return { Authorization: `Bearer ${tokenA}` };
}

function loginAs(email: string, password: string) {
  return request(app)
    .post("/api/auth/login")
    .send({ email, password })
    .then((r: any) => r.body.data.accessToken);
}

describe("Users", () => {
  it("GET /api/users/:id — returns public profile", async () => {
    const res = await request(app)
      .get(`/api/users/${users.tenant1.id}`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe("tenantA@test.com");
    expect(res.body.data.name).toBe("Tenant A");
    expect(res.body.data).not.toHaveProperty("passwordHash");
  });

  it("GET /api/users/:id — 404 for nonexistent user", async () => {
    const res = await request(app)
      .get("/api/users/00000000-0000-0000-0000-000000000000")
      .expect(404);

    expect(res.body.error.code).toBe("NOT_FOUND");
  });

  it("PATCH /api/users/:id — updates own profile (name)", async () => {
    const res = await request(app)
      .patch(`/api/users/${users.tenant1.id}`)
      .set(auth())
      .send({ name: "Tenant A Updated" })
      .expect(200);

    expect(res.body.data.name).toBe("Tenant A Updated");
  });

  it("PATCH /api/users/:id — 401 without auth", async () => {
    const res = await request(app)
      .patch(`/api/users/${users.tenant1.id}`)
      .send({ name: "No Auth" })
      .expect(401);

    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("PATCH /api/users/:id — 403 when editing another user (isSelf)", async () => {
    const otherToken = await loginAs("tenantB@test.com", "password123");

    const res = await request(app)
      .patch(`/api/users/${users.tenant1.id}`)
      .set({ Authorization: `Bearer ${otherToken}` })
      .send({ name: "Hacked" })
      .expect(403);

    expect(res.body.error.code).toBe("FORBIDDEN");
  });

  it("PATCH /api/users/:id — 403 when UUID doesn't match authenticated user (isSelf)", async () => {
    const res = await request(app)
      .patch(`/api/users/00000000-0000-0000-0000-000000000000`)
      .set(auth())
      .send({ name: "Ghost" })
      .expect(403);

    expect(res.body.error.code).toBe("FORBIDDEN");
  });

  it("GET /api/users/:id/listings — returns landlord listings", async () => {
    const res = await request(app)
      .get(`/api/users/${users.landlord1.id}/listings`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    for (const listing of res.body.data as Array<{ landlordId: string }>) {
      expect(listing.landlordId).toBe(users.landlord1.id);
    }
  });

  it("GET /api/users/:id/listings — 400 for non-landlord user", async () => {
    const res = await request(app)
      .get(`/api/users/${users.tenant1.id}/listings`)
      .expect(400);

    expect(res.body.error.code).toBe("BAD_REQUEST");
  });

  it("GET /api/users/:id/listings — 404 for nonexistent user", async () => {
    const res = await request(app)
      .get("/api/users/00000000-0000-0000-0000-000000000000/listings")
      .expect(404);

    expect(res.body.error.code).toBe("NOT_FOUND");
  });
});

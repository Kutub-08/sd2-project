import "dotenv/config";
import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";

let request: any, app: any, prisma: any, clearDatabase: any, seedUsers: any;

beforeAll(async () => {
  const mod = await import("../helpers.js");
  const supertest = await import("supertest");
  request = supertest.default;
  app = mod.app;
  prisma = mod.prisma;
  clearDatabase = mod.clearDatabase;
  seedUsers = mod.seedUsers;

  await clearDatabase();
  await seedUsers();
});

afterAll(async () => {
  await clearDatabase();
  await prisma.$disconnect();
});

async function loginAs(email: string, password: string) {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email, password });
  return res.body.data.accessToken;
}

describe("Middleware — 404 / notFound", () => {
  it("GET /api/nonexistent — returns 404", async () => {
    const res = await request(app)
      .get("/api/nonexistent")
      .expect(404);

    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("NOT_FOUND");
    expect(res.body.error.message).toBe("Route not found");
  });

  it("POST /api/nonexistent-route — returns 404", async () => {
    const res = await request(app)
      .post("/api/nonexistent-route")
      .send({})
      .expect(404);

    expect(res.body.error.code).toBe("NOT_FOUND");
  });
});

describe("Middleware — errorHandler (unhandled errors)", () => {
  it("GET /api/listings?invalidSort=crash — gracefully handled", async () => {
    const res = await request(app)
      .get("/api/listings?sort=INVALID_SORT_VALUE")
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBeDefined();
  });
});

describe("Middleware — auth / isSelf", () => {
  it("PATCH /api/users/:id without token returns 401", async () => {
    const res = await request(app)
      .patch("/api/users/00000000-0000-0000-0000-000000000000")
      .send({ name: "No Auth" })
      .expect(401);

    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("GET /api/auth/me with malformed token returns 401", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set({ Authorization: "Bearer obviously-invalid-token" })
      .expect(401);

    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("Expired token returns 401 on protected route", async () => {
    const expiredToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJhIiwiZXhwIjoxNTE2MjM5MDIyfQ.2oGP5mW5HZdTKBXCNAgCV2vUL4JXXQFgnJzOoFvtRZk";

    const res = await request(app)
      .get("/api/auth/me")
      .set({ Authorization: `Bearer ${expiredToken}` })
      .expect(401);

    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("Listings endpoint — unauthenticated access returns 401", async () => {
    const res = await request(app)
      .post("/api/listings")
      .send({ title: "No Auth Test" })
      .expect(401);

    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });
});

describe("Middleware — auth (edge cases)", () => {
  it("POST /api/inquiries without auth returns 401", async () => {
    const res = await request(app)
      .post("/api/inquiries")
      .send({ listingId: "00000000-0000-0000-0000-000000000000", message: "No auth" })
      .expect(401);

    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("DELETE /api/favorites/:id without auth returns 401", async () => {
    const res = await request(app)
      .delete("/api/favorites/00000000-0000-0000-0000-000000000000")
      .expect(401);

    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });
});

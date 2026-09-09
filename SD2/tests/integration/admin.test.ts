import "dotenv/config";
import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";

let request: any, app: any, prisma: any, clearDatabase: any, seedUsers: any, seedListings: any;
let users: any, listings: any, admin: any;

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

  const bcrypt = await import("bcryptjs");
  const password = await bcrypt.hash("password123", 10);
  admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@test.com",
      phone: "01799999999",
      passwordHash: password,
      role: "ADMIN",
      isVerified: true,
    },
  });
}, 30000);

afterAll(async () => {
  await clearDatabase();
  await prisma.$disconnect();
});

async function loginAs(email: string, password: string) {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email, password })
    .expect(200);
  return res.body.data.accessToken;
}

function auth(token: string) {
  return { Authorization: `Bearer ${token}` };
}

describe("Admin — authorization", () => {
  it("GET /api/admin/users — 401 without token", async () => {
    const res = await request(app)
      .get("/api/admin/users")
      .expect(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("GET /api/admin/users — 403 for tenant", async () => {
    const tenantToken = await loginAs("tenantA@test.com", "password123");
    const res = await request(app)
      .get("/api/admin/users")
      .set(auth(tenantToken))
      .expect(403);
    expect(res.body.error.code).toBe("FORBIDDEN");
  });

  it("GET /api/admin/users — 403 for landlord", async () => {
    const landlordToken = await loginAs("landlordA@test.com", "password123");
    const res = await request(app)
      .get("/api/admin/users")
      .set(auth(landlordToken))
      .expect(403);
    expect(res.body.error.code).toBe("FORBIDDEN");
  });
});

describe("Admin — user management", () => {
  let adminToken: string;

  beforeAll(async () => {
    adminToken = await loginAs("admin@test.com", "password123");
  });

  it("GET /api/admin/users — admin lists users without password_hash", async () => {
    const res = await request(app)
      .get("/api/admin/users")
      .set(auth(adminToken))
      .expect(200);

    expect(res.body.data.items.length).toBeGreaterThanOrEqual(5);
    expect(res.body.data.items[0]).not.toHaveProperty("passwordHash");
    expect(res.body.data.items.map((u: any) => u.email)).toContain("tenantA@test.com");
  });

  it("GET /api/admin/users?role=TENANT — filters by role", async () => {
    const res = await request(app)
      .get("/api/admin/users?role=TENANT")
      .set(auth(adminToken))
      .expect(200);

    expect(res.body.data.items.length).toBeGreaterThanOrEqual(2);
    for (const u of res.body.data.items as Array<{ role: string }>) {
      expect(u.role).toBe("TENANT");
    }
  });

  it("PATCH /api/admin/users/:id/role — admin changes a tenant to landlord", async () => {
    const res = await request(app)
      .patch(`/api/admin/users/${users.tenant2.id}/role`)
      .set(auth(adminToken))
      .send({ role: "LANDLORD" })
      .expect(200);

    expect(res.body.data.role).toBe("LANDLORD");
    expect(res.body.data.id).toBe(users.tenant2.id);
  });

  it("PATCH /api/admin/users/:id/role — cannot modify own role (400)", async () => {
    const res = await request(app)
      .patch(`/api/admin/users/${admin.id}/role`)
      .set(auth(adminToken))
      .send({ role: "TENANT" })
      .expect(400);

    expect(res.body.error.code).toBe("BAD_REQUEST");
  });

  it("PATCH /api/admin/users/:id/role — 404 for nonexistent user", async () => {
    const res = await request(app)
      .patch("/api/admin/users/00000000-0000-0000-0000-000000000000/role")
      .set(auth(adminToken))
      .send({ role: "TENANT" })
      .expect(404);

    expect(res.body.error.code).toBe("NOT_FOUND");
  });
});

describe("Admin — ban enforcement", () => {
  let adminToken: string;

  beforeAll(async () => {
    adminToken = await loginAs("admin@test.com", "password123");
  });

  it("PATCH /api/admin/users/:id/ban — bans a tenant", async () => {
    const res = await request(app)
      .patch(`/api/admin/users/${users.tenant1.id}/ban`)
      .set(auth(adminToken))
      .send({ banned: true })
      .expect(200);

    expect(res.body.data.isBanned).toBe(true);
  });

  it("Banned tenant login is rejected (403)", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "tenantA@test.com", password: "password123" })
      .expect(403);

    expect(res.body.error.code).toBe("FORBIDDEN");
  });

  it("Banned tenant's existing token is rejected on protected route (403)", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "tenantB@test.com", password: "password123" })
      .expect(200);
    const existingToken = loginRes.body.data.accessToken;

    await request(app)
      .patch(`/api/admin/users/${users.tenant2.id}/ban`)
      .set(auth(adminToken))
      .send({ banned: true })
      .expect(200);

    const res = await request(app)
      .get("/api/auth/me")
      .set(auth(existingToken))
      .expect(403);
    expect(res.body.error.code).toBe("FORBIDDEN");
  });

  it("PATCH /api/admin/users/:id/ban — cannot ban self (400)", async () => {
    const res = await request(app)
      .patch(`/api/admin/users/${admin.id}/ban`)
      .set(auth(adminToken))
      .send({ banned: true })
      .expect(400);

    expect(res.body.error.code).toBe("BAD_REQUEST");
  });

  it("PATCH /api/admin/users/:id/ban — unban restores access", async () => {
    await request(app)
      .patch(`/api/admin/users/${users.tenant2.id}/ban`)
      .set(auth(adminToken))
      .send({ banned: false })
      .expect(200);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "tenantB@test.com", password: "password123" })
      .expect(200);

    expect(res.body.data.accessToken).toBeDefined();
  });
});

describe("Admin — listing moderation", () => {
  let adminToken: string;

  beforeAll(async () => {
    adminToken = await loginAs("admin@test.com", "password123");
  });

  it("GET /api/admin/listings — admin sees all listings incl. RENTED", async () => {
    const res = await request(app)
      .get("/api/admin/listings")
      .set(auth(adminToken))
      .expect(200);

    expect(res.body.data.items.length).toBeGreaterThanOrEqual(4);
    const statuses = (res.body.data.items as Array<{ status: string }>).map((l) => l.status);
    expect(statuses).toContain("RENTED");
  });

  it("PATCH /api/admin/listings/:id/status — takedown to INACTIVE", async () => {
    const res = await request(app)
      .patch(`/api/admin/listings/${listings.l1.id}/status`)
      .set(auth(adminToken))
      .send({ status: "INACTIVE" })
      .expect(200);

    expect(res.body.data.status).toBe("INACTIVE");
  });

  it("PATCH /api/admin/listings/:id/status — reinstate to AVAILABLE", async () => {
    const res = await request(app)
      .patch(`/api/admin/listings/${listings.l1.id}/status`)
      .set(auth(adminToken))
      .send({ status: "AVAILABLE" })
      .expect(200);

    expect(res.body.data.status).toBe("AVAILABLE");
  });

  it("PATCH /api/admin/listings/:id/status — 404 for nonexistent listing", async () => {
    const res = await request(app)
      .patch("/api/admin/listings/00000000-0000-0000-0000-000000000000/status")
      .set(auth(adminToken))
      .send({ status: "INACTIVE" })
      .expect(404);

    expect(res.body.error.code).toBe("NOT_FOUND");
  });

  it("PATCH /api/admin/listings/:id/status — tenant cannot moderate (403)", async () => {
    const tenantToken = await loginAs("tenantB@test.com", "password123");
    const res = await request(app)
      .patch(`/api/admin/listings/${listings.l2.id}/status`)
      .set(auth(tenantToken))
      .send({ status: "INACTIVE" })
      .expect(403);

    expect(res.body.error.code).toBe("FORBIDDEN");
  });
});
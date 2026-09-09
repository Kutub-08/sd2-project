import "dotenv/config";
import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";
import { hashToken } from "../../src/utils/hash.js";

let request: any, app: any, prisma: any, clearDatabase: any;

beforeAll(async () => {
  const mod = await import("../helpers.js");
  const supertest = await import("supertest");
  request = supertest.default;
  app = mod.app;
  prisma = mod.prisma;
  clearDatabase = mod.clearDatabase;

  await clearDatabase();
}, 30000);

afterAll(async () => {
  await clearDatabase();
  await prisma.$disconnect();
}, 30000);

async function registerLandlord(email: string) {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Unverified Landlord",
      email,
      phone: "01766666666",
      password: "password123",
      role: "LANDLORD",
    })
    .expect(201);
  return res.body.data.accessToken as string;
}

function auth(token: string) {
  return { Authorization: `Bearer ${token}` };
}

async function insertCode(userId: string, code: string, opts: { expired?: boolean } = {}) {
  return prisma.verificationCode.create({
    data: {
      userId,
      codeHash: hashToken(code),
      expiresAt: opts.expired
        ? new Date(Date.now() - 60 * 1000)
        : new Date(Date.now() + 10 * 60 * 1000),
    },
  });
}

describe("Email OTP verification", () => {
  let landlordId: string;
  let landlordToken: string;

  it("register creates an unverified LANDLORD", async () => {
    landlordToken = await registerLandlord("otp-landlord@test.com");
    const me = await request(app)
      .get("/api/auth/me")
      .set(auth(landlordToken))
      .expect(200);
    landlordId = me.body.data.id;
    expect(me.body.data.role).toBe("LANDLORD");
    expect(me.body.data.isVerified).toBe(false);
  });

  it("POST /api/listings — unverified landlord cannot publish (403)", async () => {
    const res = await request(app)
      .post("/api/listings")
      .set(auth(landlordToken))
      .send({
        title: "Blocked Listing",
        description: "This should be blocked until email is verified",
        price: 10000,
        sizeSqft: 600,
        bedrooms: 1,
        bathrooms: 1,
        address: "1 Test Street",
        area: "Test Area",
        city: "Test City",
        latitude: 22.35,
        longitude: 91.78,
      })
      .expect(403);

    expect(res.body.error.code).toBe("EMAIL_NOT_VERIFIED");
  });

  it("POST /api/auth/verify/request — sends a code and stores a record", async () => {
    const res = await request(app)
      .post("/api/auth/verify/request")
      .set(auth(landlordToken))
      .expect(200);

    expect(res.body.success).toBe(true);
    const records = await prisma.verificationCode.findMany({ where: { userId: landlordId, usedAt: null } });
    expect(records.length).toBe(1);
  });

  it("POST /api/auth/verify — wrong code returns 400", async () => {
    const res = await request(app)
      .post("/api/auth/verify")
      .set(auth(landlordToken))
      .send({ code: "000000" })
      .expect(400);

    expect(res.body.error.code).toBe("INVALID_OTP");
  });

  it("POST /api/auth/verify — expired code returns 400", async () => {
    await insertCode(landlordId, "111111", { expired: true });

    const res = await request(app)
      .post("/api/auth/verify")
      .set(auth(landlordToken))
      .send({ code: "111111" })
      .expect(400);

    expect(res.body.error.code).toBe("EXPIRED_OTP");
  });

  it("POST /api/auth/verify — valid code verifies email, then listing can be published", async () => {
    await insertCode(landlordId, "654321");

    const res = await request(app)
      .post("/api/auth/verify")
      .set(auth(landlordToken))
      .send({ code: "654321" })
      .expect(200);

    expect(res.body.data.isVerified).toBe(true);

    const created = await request(app)
      .post("/api/listings")
      .set(auth(landlordToken))
      .send({
        title: "Verified Listing",
        description: "Now that email is verified, publishing works",
        price: 12000,
        sizeSqft: 700,
        bedrooms: 2,
        bathrooms: 1,
        address: "2 Test Street",
        area: "Test Area",
        city: "Test City",
        latitude: 22.36,
        longitude: 91.79,
      })
      .expect(201);

    expect(created.body.data.title).toBe("Verified Listing");
  });

  it("POST /api/auth/verify/request — already verified returns 400", async () => {
    const res = await request(app)
      .post("/api/auth/verify/request")
      .set(auth(landlordToken))
      .expect(400);

    expect(res.body.error.code).toBe("ALREADY_VERIFIED");
  });

  it("POST /api/auth/verify — non-numeric code rejected by validation (400)", async () => {
    const res = await request(app)
      .post("/api/auth/verify")
      .set(auth(landlordToken))
      .send({ code: "abcdef" })
      .expect(400);

    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });
});
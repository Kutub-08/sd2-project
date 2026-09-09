import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcryptjs";
import app from "../src/app.js";

export { app };

export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: `${process.env.DATABASE_URL}` }),
});

let _accessToken = "";
let _refreshTokenCookie = "";

export function setTokens(access: string, cookie: string) {
  _accessToken = access;
  _refreshTokenCookie = cookie;
}

export function getAccessToken() {
  return _accessToken;
}

export function getRefreshTokenCookie() {
  return _refreshTokenCookie;
}

export async function clearDatabase() {
  await prisma.review.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.listingImage.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.verificationCode.deleteMany();
  await prisma.aiSearchLog.deleteMany();
  await prisma.user.deleteMany();
}

export async function seedUsers() {
  const password = await bcrypt.hash("password123", 10);

  const landlord1 = await prisma.user.create({
    data: { name: "Landlord A", email: "landlordA@test.com", phone: "01711111111", passwordHash: password, role: "LANDLORD", isVerified: true },
  });
  const landlord2 = await prisma.user.create({
    data: { name: "Landlord B", email: "landlordB@test.com", phone: "01722222222", passwordHash: password, role: "LANDLORD", isVerified: true },
  });
  const tenant1 = await prisma.user.create({
    data: { name: "Tenant A", email: "tenantA@test.com", phone: "01733333333", passwordHash: password, role: "TENANT", isVerified: true },
  });
  const tenant2 = await prisma.user.create({
    data: { name: "Tenant B", email: "tenantB@test.com", phone: "01744444444", passwordHash: password, role: "TENANT", isVerified: true },
  });

  return { landlord1, landlord2, tenant1, tenant2 };
}

export async function seedListings(landlord1Id: string, landlord2Id: string) {
  const l1 = await prisma.listing.create({
    data: {
      landlordId: landlord1Id,
      title: "Modern 2BR in Panchlaish",
      description: "Spacious two-bedroom flat near schools and markets",
      price: 15000,
      sizeSqft: 1100,
      bedrooms: 2,
      bathrooms: 2,
      address: "12, Road 5, Panchlaish",
      area: "Panchlaish",
      city: "Chattogram",
      latitude: 22.3569,
      longitude: 91.7832,
      amenities: ["Gas", "Electricity", "Water"],
      status: "AVAILABLE",
    },
  });

  const l2 = await prisma.listing.create({
    data: {
      landlordId: landlord1Id,
      title: "Budget 1BR near IIUC",
      description: "Affordable single bedroom for students near IIUC campus",
      price: 8000,
      sizeSqft: 550,
      bedrooms: 1,
      bathrooms: 1,
      address: "IIUC Road, Kumira",
      area: "Kumira",
      city: "Chattogram",
      latitude: 22.3852,
      longitude: 91.8115,
      amenities: ["Electricity", "Water"],
      status: "AVAILABLE",
    },
  });

  const l3 = await prisma.listing.create({
    data: {
      landlordId: landlord2Id,
      title: "Luxury 3BR in Khulshi",
      description: "Premium three-bedroom apartment on Khulshi hillside",
      price: 35000,
      sizeSqft: 1800,
      bedrooms: 3,
      bathrooms: 2,
      address: "8, Road 12, Khulshi",
      area: "Khulshi",
      city: "Chattogram",
      latitude: 22.3685,
      longitude: 91.7983,
      amenities: ["Gas", "Electricity", "Water", "Parking", "Lift", "Generator"],
      status: "AVAILABLE",
    },
  });

  const l4 = await prisma.listing.create({
    data: {
      landlordId: landlord2Id,
      title: "Studio in GEC",
      description: "Compact studio flat in the heart of the city",
      price: 12000,
      sizeSqft: 400,
      bedrooms: 1,
      bathrooms: 1,
      address: "GEC Circle",
      area: "Nasirabad",
      city: "Chattogram",
      latitude: 22.3601,
      longitude: 91.7902,
      amenities: ["Electricity", "Water", "Lift"],
      status: "RENTED",
    },
  });

  return { l1, l2, l3, l4 };
}

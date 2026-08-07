import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";

const reviewInclude = {
  tenant: {
    select: { id: true, name: true },
  },
};

export async function create(tenantId: string, listingId: string, rating: number, comment: string) {
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { id: true, landlordId: true },
  });
  if (!listing) throw new AppError(404, "NOT_FOUND", "Listing not found");
  if (listing.landlordId === tenantId) {
    throw new AppError(403, "CANNOT_REVIEW_OWN_LISTING", "You cannot review your own listing");
  }

  const existing = await prisma.review.findFirst({
    where: { tenantId, listingId },
  });
  if (existing) {
    throw new AppError(409, "ALREADY_REVIEWED", "You have already reviewed this listing");
  }

  return prisma.review.create({
    data: { tenantId, listingId, rating, comment },
    include: reviewInclude,
  });
}

async function findOwnedReview(reviewId: string, userId: string) {
  const review = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!review) throw new AppError(404, "NOT_FOUND", "Review not found");
  if (review.tenantId !== userId) {
    throw new AppError(403, "FORBIDDEN", "You can only modify your own reviews");
  }
  return review;
}

export async function update(reviewId: string, userId: string, rating: number, comment: string) {
  await findOwnedReview(reviewId, userId);
  return prisma.review.update({
    where: { id: reviewId },
    data: { rating, comment },
    include: reviewInclude,
  });
}

export async function remove(reviewId: string, userId: string) {
  await findOwnedReview(reviewId, userId);
  return prisma.review.delete({ where: { id: reviewId } });
}

export async function findByListing(listingId: string) {
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { id: true },
  });
  if (!listing) throw new AppError(404, "NOT_FOUND", "Listing not found");

  return prisma.review.findMany({
    where: { listingId },
    include: reviewInclude,
    orderBy: { createdAt: "desc" },
  });
}

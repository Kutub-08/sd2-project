import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
const reviewInclude = {
    tenant: {
        select: { id: true, name: true },
    },
};
export async function create(tenantId, listingId, rating, comment) {
    const listing = await prisma.listing.findUnique({
        where: { id: listingId },
        select: { id: true },
    });
    if (!listing)
        throw new AppError(404, "NOT_FOUND", "Listing not found");
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
export async function findByListing(listingId) {
    const listing = await prisma.listing.findUnique({
        where: { id: listingId },
        select: { id: true },
    });
    if (!listing)
        throw new AppError(404, "NOT_FOUND", "Listing not found");
    return prisma.review.findMany({
        where: { listingId },
        include: reviewInclude,
        orderBy: { createdAt: "desc" },
    });
}
//# sourceMappingURL=review.service.js.map
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { buildWhereClause, buildOrderBy } from "./listing.filters.js";
const listingInclude = {
    landlord: {
        select: { id: true, name: true, email: true, phone: true },
    },
    images: { orderBy: { orderIndex: "asc" } },
};
export async function create(landlordId, data) {
    return prisma.listing.create({
        data: { ...data, landlordId },
        include: listingInclude,
    });
}
export async function findAll(query) {
    const where = buildWhereClause(query);
    const orderBy = buildOrderBy(query.sort);
    const [items, total] = await Promise.all([
        prisma.listing.findMany({
            where,
            orderBy,
            skip: (query.page - 1) * query.limit,
            take: query.limit,
            include: listingInclude,
        }),
        prisma.listing.count({ where }),
    ]);
    return {
        items,
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
    };
}
export async function findById(id) {
    const listing = await prisma.listing.findUnique({
        where: { id },
        include: listingInclude,
    });
    if (!listing)
        throw new AppError(404, "NOT_FOUND", "Listing not found");
    return listing;
}
export async function update(id, userId, data) {
    const listing = await prisma.listing.findUnique({ where: { id } });
    if (!listing)
        throw new AppError(404, "NOT_FOUND", "Listing not found");
    if (listing.landlordId !== userId) {
        throw new AppError(403, "FORBIDDEN", "You can only edit your own listings");
    }
    return prisma.listing.update({
        where: { id },
        data,
        include: listingInclude,
    });
}
export async function remove(id, userId) {
    const listing = await prisma.listing.findUnique({ where: { id } });
    if (!listing)
        throw new AppError(404, "NOT_FOUND", "Listing not found");
    if (listing.landlordId !== userId) {
        throw new AppError(403, "FORBIDDEN", "You can only delete your own listings");
    }
    await prisma.listing.delete({ where: { id } });
}
export async function updateStatus(id, userId, status) {
    const listing = await prisma.listing.findUnique({ where: { id } });
    if (!listing)
        throw new AppError(404, "NOT_FOUND", "Listing not found");
    if (listing.landlordId !== userId) {
        throw new AppError(403, "FORBIDDEN", "You can only update your own listings");
    }
    return prisma.listing.update({
        where: { id },
        data: { status },
        include: listingInclude,
    });
}
export async function findByLandlord(landlordId) {
    return prisma.listing.findMany({
        where: { landlordId },
        include: listingInclude,
        orderBy: { createdAt: "desc" },
    });
}
//# sourceMappingURL=listing.service.js.map
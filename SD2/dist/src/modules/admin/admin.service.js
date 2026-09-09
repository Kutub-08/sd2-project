import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { getSkipTake, getPaginationMeta } from "../../utils/pagination.js";
import { buildWhereClause, buildOrderBy } from "../listings/listing.filters.js";
const adminUserSelect = {
    id: true,
    name: true,
    email: true,
    phone: true,
    role: true,
    isVerified: true,
    isBanned: true,
    createdAt: true,
    updatedAt: true,
};
const listingInclude = {
    landlord: { select: { id: true, name: true, email: true, phone: true } },
    images: { orderBy: { orderIndex: "asc" } },
};
export async function listUsers(query) {
    const where = query.role ? { role: query.role } : {};
    const [items, total] = await Promise.all([
        prisma.user.findMany({
            where,
            select: adminUserSelect,
            orderBy: { createdAt: "desc" },
            ...getSkipTake(query.page, query.limit),
        }),
        prisma.user.count({ where }),
    ]);
    return {
        items,
        ...getPaginationMeta(total, query.page, query.limit),
    };
}
export async function updateUserRole(userId, actorId, role) {
    if (userId === actorId) {
        throw new AppError(400, "BAD_REQUEST", "Admins cannot modify their own role");
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new AppError(404, "NOT_FOUND", "User not found");
    return prisma.user.update({
        where: { id: userId },
        data: { role },
        select: adminUserSelect,
    });
}
export async function updateUserBan(userId, actorId, banned) {
    if (userId === actorId) {
        throw new AppError(400, "BAD_REQUEST", "Admins cannot ban themselves");
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new AppError(404, "NOT_FOUND", "User not found");
    return prisma.user.update({
        where: { id: userId },
        data: { isBanned: banned },
        select: adminUserSelect,
    });
}
export async function listListings(query) {
    const where = buildWhereClause(query);
    const orderBy = buildOrderBy(query.sort);
    const [items, total] = await Promise.all([
        prisma.listing.findMany({
            where,
            orderBy,
            ...getSkipTake(query.page, query.limit),
            include: listingInclude,
        }),
        prisma.listing.count({ where }),
    ]);
    return {
        items,
        ...getPaginationMeta(total, query.page, query.limit),
    };
}
export async function updateListingStatus(listingId, status) {
    const listing = await prisma.listing.findUnique({ where: { id: listingId } });
    if (!listing)
        throw new AppError(404, "NOT_FOUND", "Listing not found");
    return prisma.listing.update({
        where: { id: listingId },
        data: { status },
        include: listingInclude,
    });
}
//# sourceMappingURL=admin.service.js.map
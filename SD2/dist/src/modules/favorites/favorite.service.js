import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { getSkipTake, getPaginationMeta } from "../../utils/pagination.js";
const favoriteInclude = {
    listing: {
        include: {
            landlord: {
                select: { id: true, name: true, email: true, phone: true },
            },
        },
    },
};
export async function create(userId, listingId) {
    const listing = await prisma.listing.findUnique({ where: { id: listingId } });
    if (!listing)
        throw new AppError(404, "NOT_FOUND", "Listing not found");
    try {
        return await prisma.favorite.create({
            data: { userId, listingId },
            include: favoriteInclude,
        });
    }
    catch (err) {
        if (err instanceof Error && "code" in err && err.code === "P2002") {
            throw new AppError(409, "ALREADY_FAVORITED", "Listing is already in your favorites");
        }
        throw err;
    }
}
export async function findAll(userId, page, limit) {
    const where = { userId };
    const [items, total] = await Promise.all([
        prisma.favorite.findMany({
            where,
            include: favoriteInclude,
            orderBy: { createdAt: "desc" },
            ...getSkipTake(page, limit),
        }),
        prisma.favorite.count({ where }),
    ]);
    return {
        items,
        ...getPaginationMeta(total, page, limit),
    };
}
export async function remove(userId, id) {
    const favorite = await prisma.favorite.findUnique({ where: { id } });
    if (!favorite)
        throw new AppError(404, "NOT_FOUND", "Favorite not found");
    if (favorite.userId !== userId) {
        throw new AppError(403, "FORBIDDEN", "You can only remove your own favorites");
    }
    await prisma.favorite.delete({ where: { id } });
}
//# sourceMappingURL=favorite.service.js.map
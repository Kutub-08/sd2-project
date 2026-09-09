const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;
function toPositiveInt(value, fallback) {
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : fallback;
}
export function getPagination(page, limit, opts = {}) {
    const { defaultLimit = DEFAULT_LIMIT, maxLimit = MAX_LIMIT } = opts;
    const parsedPage = typeof page === "string" ? Number(page) : page;
    const parsedLimit = typeof limit === "string" ? Number(limit) : limit;
    const resolvedLimit = Math.min(toPositiveInt(parsedLimit, defaultLimit), maxLimit);
    return {
        page: toPositiveInt(parsedPage, 1),
        limit: resolvedLimit,
    };
}
export function getSkipTake(page, limit) {
    return { skip: (page - 1) * limit, take: limit };
}
export function getPaginationMeta(total, page, limit) {
    return { total, page, limit, totalPages: Math.ceil(total / limit) };
}
//# sourceMappingURL=pagination.js.map
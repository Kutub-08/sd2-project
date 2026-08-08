import Groq from "groq-sdk";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { buildWhereClause } from "../listings/listing.filters.js";
import { fallbackSearch } from "./fallbackSearch.js";
import { EXTRACT_FILTERS_PROMPT } from "./prompts.js";
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "",
    timeout: 8000,
});
const listingInclude = {
    landlord: { select: { id: true, name: true, email: true, phone: true } },
    images: { orderBy: { orderIndex: "asc" } },
};
const AI_CACHE_TTL_MS = 5 * 60 * 1000;
const parseCache = new Map();
function clampFilters(filters) {
    return {
        minPrice: filters.minPrice !== undefined
            ? Math.max(0, Math.min(9_999_999, filters.minPrice))
            : undefined,
        maxPrice: filters.maxPrice !== undefined
            ? Math.max(0, Math.min(9_999_999, filters.maxPrice))
            : undefined,
        minBedrooms: filters.minBedrooms !== undefined
            ? Math.max(0, Math.min(50, filters.minBedrooms))
            : undefined,
        area: filters.area ? filters.area.trim() : undefined,
        amenities: filters.amenities ? filters.amenities.slice(0, 20) : undefined,
    };
}
async function callAI(query) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
        const completion = await groq.chat.completions.create({
            model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: EXTRACT_FILTERS_PROMPT },
                { role: "user", content: `Query: "${query}"` },
            ],
            temperature: 0,
            response_format: { type: "json_object" },
        }, { signal: controller.signal });
        const text = completion.choices[0]?.message?.content ?? "";
        const cleaned = text.replace(/```json\s*/g, "").replace(/```\s*/g, "");
        if (!cleaned.trim())
            return null;
        return clampFilters(JSON.parse(cleaned));
    }
    catch {
        return null;
    }
    finally {
        clearTimeout(timeout);
    }
}
async function getParsedFilters(query, userId) {
    const key = `${userId ?? "anon"}|${query}`;
    const hit = parseCache.get(key);
    if (hit && Date.now() - hit.parsedAt < AI_CACHE_TTL_MS) {
        return hit.filters;
    }
    const filters = await callAI(query);
    if (filters) {
        parseCache.set(key, { filters, parsedAt: Date.now() });
    }
    else {
        parseCache.delete(key);
    }
    return filters;
}
function isFilterSet(filters) {
    return (filters.minPrice !== undefined ||
        filters.maxPrice !== undefined ||
        filters.minBedrooms !== undefined ||
        !!filters.area ||
        (filters.amenities !== undefined && filters.amenities.length > 0));
}
async function logSearch(query, parsedFilters, userId) {
    try {
        await prisma.aiSearchLog.create({
            data: {
                userId: userId ?? null,
                queryText: query,
                parsedFilters: JSON.parse(JSON.stringify(parsedFilters ?? {})),
            },
        });
    }
    catch {
    }
}
function haversine(aLat, aLng, bLat, bLng) {
    const R = 6371;
    const dLat = ((bLat - aLat) * Math.PI) / 180;
    const dLng = ((bLng - aLng) * Math.PI) / 180;
    const s = Math.sin(dLat / 2) ** 2 +
        Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}
function scoreRelevance(listing, filters) {
    let score = 0;
    if (filters.area) {
        const listingArea = listing.area?.trim().toLowerCase();
        const target = filters.area.trim().toLowerCase();
        if (listingArea === target)
            score += 3;
        else if (listingArea && listingArea.includes(target))
            score += 2;
    }
    if (filters.maxPrice !== undefined && Number(listing.price) <= filters.maxPrice)
        score += 2;
    if (filters.minPrice !== undefined && Number(listing.price) >= filters.minPrice)
        score += 1;
    if (filters.minBedrooms !== undefined && listing.bedrooms >= filters.minBedrooms)
        score += 1;
    if (filters.amenities && filters.amenities.length > 0) {
        const overlap = listing.amenities.filter((a) => filters.amenities.some((f) => a.toLowerCase().includes(f.toLowerCase()))).length;
        if (overlap > 0)
            score += Math.min(overlap, 3);
    }
    return score;
}
function sortByNearest(listings, location) {
    return [...listings].sort((a, b) => {
        const da = haversine(location.lat, location.lng, Number(a.latitude), Number(a.longitude));
        const db = haversine(location.lat, location.lng, Number(b.latitude), Number(b.longitude));
        return da - db;
    });
}
function sortByRelevance(listings, filters) {
    return [...listings].sort((a, b) => {
        const sa = scoreRelevance(a, filters);
        const sb = scoreRelevance(b, filters);
        if (sa !== sb)
            return sb - sa;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}
function averageRating(listing) {
    if (!listing.reviews || listing.reviews.length === 0)
        return -1;
    const sum = listing.reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / listing.reviews.length;
}
function sortByRating(listings) {
    return [...listings].sort((a, b) => {
        const ra = averageRating(a);
        const rb = averageRating(b);
        if (ra !== rb)
            return rb - ra;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}
function sortByReviewCount(listings) {
    return [...listings].sort((a, b) => {
        const ca = a.reviews?.length ?? 0;
        const cb = b.reviews?.length ?? 0;
        if (ca !== cb)
            return cb - ca;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}
export async function recommend(query, userId, sort = "relevance", location) {
    const filters = await getParsedFilters(query, userId);
    const isEmpty = !filters || !isFilterSet(filters);
    if (isEmpty) {
        const fallbackItems = await fallbackSearch(query);
        const result = {
            query,
            parsedFilters: filters ?? {},
            usedFallback: true,
            sort,
            results: fallbackItems,
            total: fallbackItems.length,
        };
        await logSearch(query, result.parsedFilters, userId);
        return result;
    }
    const where = buildWhereClause({
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        bedrooms: filters.minBedrooms,
        area: filters.area,
        sort: "newest",
        status: "AVAILABLE",
    });
    if (filters.amenities && filters.amenities.length > 0) {
        where.amenities = { hasSome: filters.amenities };
    }
    if (sort === "nearest" && !location) {
        throw new AppError(400, "VALIDATION_ERROR", "Location is required for nearest-first sorting");
    }
    try {
        const prismaSortable = sort === "price_asc" || sort === "price_desc";
        const orderBy = prismaSortable
            ? sort === "price_asc"
                ? { price: "asc" }
                : { price: "desc" }
            : { createdAt: "desc" };
        const includeForSort = sort === "highest_rated" || sort === "most_reviewed" || sort === "relevance" || sort === "nearest"
            ? { ...listingInclude, reviews: { select: { rating: true } } }
            : listingInclude;
        if (prismaSortable) {
            const [items, total] = await Promise.all([
                prisma.listing.findMany({
                    where,
                    include: listingInclude,
                    orderBy,
                    take: 20,
                }),
                prisma.listing.count({ where }),
            ]);
            const result = {
                query,
                parsedFilters: filters,
                usedFallback: false,
                sort,
                results: items,
                total,
            };
            await logSearch(query, result.parsedFilters, userId);
            return result;
        }
        const [pool, total] = await Promise.all([
            prisma.listing.findMany({
                where,
                include: includeForSort,
                orderBy,
            }),
            prisma.listing.count({ where }),
        ]);
        const ranked = pool;
        let sorted;
        if (sort === "nearest") {
            sorted = sortByNearest(ranked, location);
        }
        else if (sort === "highest_rated") {
            sorted = sortByRating(ranked);
        }
        else if (sort === "most_reviewed") {
            sorted = sortByReviewCount(ranked);
        }
        else {
            sorted = sortByRelevance(ranked, filters);
        }
        const result = {
            query,
            parsedFilters: filters,
            usedFallback: false,
            sort,
            results: sorted.slice(0, 20),
            total,
        };
        await logSearch(query, result.parsedFilters, userId);
        return result;
    }
    catch {
        const fallbackItems = await fallbackSearch(query);
        const result = {
            query,
            parsedFilters: filters,
            usedFallback: true,
            sort,
            results: fallbackItems,
            total: fallbackItems.length,
        };
        await logSearch(query, result.parsedFilters, userId);
        return result;
    }
}
export async function findSimilar(listingId) {
    const listing = await prisma.listing.findUnique({ where: { id: listingId } });
    if (!listing)
        throw new AppError(404, "NOT_FOUND", "Listing not found");
    const priceRange = Number(listing.price) * 0.3;
    return prisma.listing.findMany({
        where: {
            id: { not: listingId },
            status: "AVAILABLE",
            price: {
                gte: Number(listing.price) - priceRange,
                lte: Number(listing.price) + priceRange,
            },
            area: { contains: listing.area, mode: "insensitive" },
            bedrooms: {
                gte: Math.max(0, listing.bedrooms - 1),
                lte: listing.bedrooms + 1,
            },
        },
        include: listingInclude,
        orderBy: { createdAt: "desc" },
        take: 10,
    });
}
//# sourceMappingURL=ai.service.js.map
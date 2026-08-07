import Groq from "groq-sdk";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { buildWhereClause } from "../listings/listing.filters.js";
import { fallbackSearch } from "./fallbackSearch.js";
import { EXTRACT_AREA_PROMPT, EXTRACT_FILTERS_PROMPT } from "./prompts.js";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const listingInclude = {
    landlord: { select: { id: true, name: true, email: true, phone: true } },
    images: { orderBy: { orderIndex: "asc" } },
};
function clampFilters(filters) {
    return {
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
async function callAI(prompt, json = true) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
        const completion = await groq.chat.completions.create({
            model: GROQ_MODEL,
            messages: [{ role: "user", content: prompt }],
            temperature: json ? 0 : 0.5,
            ...(json ? { response_format: { type: "json_object" } } : {}),
        }, { signal: controller.signal });
        return completion.choices[0]?.message.content?.trim() ?? null;
    }
    catch {
        return null;
    }
    finally {
        clearTimeout(timeout);
    }
}
async function callAIJSON(query) {
    const text = await callAI(`${EXTRACT_FILTERS_PROMPT}\n\nQuery: "${query}"`);
    if (!text)
        return null;
    const cleaned = text.replace(/```json\s*/g, "").replace(/```\s*/g, "");
    try {
        return clampFilters(JSON.parse(cleaned));
    }
    catch {
        return null;
    }
}
async function callAreaAI(query) {
    const text = await callAI(`${EXTRACT_AREA_PROMPT}\n\nQuery: "${query}"`);
    if (!text)
        return null;
    const cleaned = text.replace(/```json\s*/g, "").replace(/```\s*/g, "");
    try {
        const parsed = JSON.parse(cleaned);
        if (!parsed.area || !parsed.area.trim())
            return null;
        return {
            area: parsed.area.trim(),
            maxPrice: parsed.maxPrice !== undefined
                ? Math.max(0, Math.min(9_999_999, parsed.maxPrice))
                : undefined,
        };
    }
    catch {
        return null;
    }
}
export async function recommend(query) {
    const filters = await callAIJSON(query);
    const isEmpty = !filters ||
        (filters.maxPrice === undefined &&
            filters.minBedrooms === undefined &&
            !filters.area &&
            (!filters.amenities || filters.amenities.length === 0));
    if (!filters || isEmpty) {
        const fallbackItems = await fallbackSearch(query);
        return {
            query,
            parsedFilters: {},
            usedFallback: true,
            results: fallbackItems,
            total: fallbackItems.length,
        };
    }
    const where = buildWhereClause({
        maxPrice: filters.maxPrice,
        bedrooms: filters.minBedrooms,
        area: filters.area,
        sort: "newest",
        status: "AVAILABLE",
    });
    if (filters.amenities && filters.amenities.length > 0) {
        where.amenities = { hasSome: filters.amenities };
    }
    let items;
    let total;
    try {
        [items, total] = await Promise.all([
            prisma.listing.findMany({
                where,
                include: listingInclude,
                orderBy: { createdAt: "desc" },
                take: 20,
            }),
            prisma.listing.count({ where }),
        ]);
    }
    catch {
        const fallbackItems = await fallbackSearch(query);
        return {
            query,
            parsedFilters: filters,
            usedFallback: true,
            results: fallbackItems,
            total: fallbackItems.length,
        };
    }
    if (items.length === 0) {
        const fallbackItems = await fallbackSearch(query);
        return {
            query,
            parsedFilters: filters,
            usedFallback: true,
            results: fallbackItems,
            total: fallbackItems.length,
        };
    }
    return { query, parsedFilters: filters, usedFallback: false, results: items, total };
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
const priceListingInclude = {
    landlord: { select: { id: true, name: true, email: true, phone: true } },
    images: { orderBy: { orderIndex: "asc" } },
    reviews: { select: { rating: true } },
};
function avgRating(listing) {
    const reviews = listing.reviews ?? [];
    if (reviews.length === 0)
        return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
}
const PRICE_SUMMARY_PROMPT = `You are a real-estate analyst for Chattogram's flat-rental market.
Given a JSON summary of currently available listings in an area, write 2-3 short sentences (plain text, no markdown)
about the current rent situation: overall range, what a typical flat costs, and how the cheapest and best-reviewed
listings compare. Do not invent numbers outside the summary.`;
const STOPWORDS = new Set([
    "the", "a", "an", "flat", "flats", "rent", "rental", "rented", "price",
    "for", "in", "with", "of", "near", "around", "any", "new", "good",
    "under", "below", "upto", "max", "budget", "less", "cheap", "available",
    "affordable", "best", "review", "reviews", "and", "or", "show", "me", "what",
]);
export async function areaPrice(query) {
    const parsed = await callAreaAI(query);
    let where = { status: "AVAILABLE" };
    const fallbackTerms = query
        .toLowerCase()
        .split(/[^a-z0-9]+/i)
        .filter((w) => w.length > 2 && !STOPWORDS.has(w));
    const areaName = parsed?.area?.trim() || fallbackTerms[0];
    if (areaName) {
        where.OR = [
            { area: { contains: areaName, mode: "insensitive" } },
            { city: { contains: areaName, mode: "insensitive" } },
            { address: { contains: areaName, mode: "insensitive" } },
        ];
    }
    if (parsed?.maxPrice !== undefined) {
        where.price = { lte: parsed.maxPrice };
    }
    const listings = (await prisma.listing.findMany({
        where,
        include: priceListingInclude,
        orderBy: { price: "asc" },
        take: 100,
    }));
    if (listings.length === 0) {
        return {
            query,
            area: areaName ?? "",
            summary: { count: 0, minPrice: null, avgPrice: null, maxPrice: null },
            cheapest: [],
            bestReviewed: [],
            insight: "",
        };
    }
    const prices = listings.map((l) => Number(l.price)).filter((n) => Number.isFinite(n));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const summary = { count: listings.length, minPrice, avgPrice, maxPrice };
    const cheapest = listings.slice(0, 10);
    const bestReviewed = [...listings]
        .sort((a, b) => avgRating(b) - avgRating(a))
        .slice(0, 10);
    let insight = "";
    const text = await callAI(`${PRICE_SUMMARY_PROMPT}\n\nSummary: ${JSON.stringify(summary)}`, false);
    if (text)
        insight = text.trim();
    return { query, area: areaName ?? "", summary, cheapest, bestReviewed, insight };
}
//# sourceMappingURL=ai.service.js.map
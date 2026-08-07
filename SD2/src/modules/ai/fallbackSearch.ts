import { prisma } from "../../lib/prisma.js";

const listingInclude = {
  landlord: { select: { id: true, name: true, email: true, phone: true } },
  images: { orderBy: { orderIndex: "asc" as const } },
};

const STOPWORDS = new Set([
  "the", "a", "an", "flat", "flats", "rent", "rental", "rented", "price",
  "for", "in", "with", "of", "near", "around", "any", "new", "good",
  "under", "below", "upto", "max", "budget", "less", "cheap", "available",
  "bed", "beds", "bedroom", "bedrooms", "bath", "bathroom", "bathrooms",
  "bhk", "br", "sqft", "taka", "tk", "bdt", "please", "need", "want", "looking", "home",
]);

function parsePrice(query: string): { amount: number; budget: boolean } | undefined {
  const budget = /\b(?:under|below|up to|upto|max|less than|within|budget|cheap)\b/i.test(query);

  const sufMatch = query.match(/[৳]\s*(\d[\d,.]*)|(\d[\d,.]*)\s*(?:k|taka|tk|thousand)\b/i);
  if (sufMatch) {
    const amountStr = sufMatch[1] ?? sufMatch[2];
    let amount = Number(amountStr.replace(/,/g, ""));
    if (/k\b|thousand/i.test(sufMatch[0])) amount *= 1000;
    if (Number.isFinite(amount) && amount > 0) return { amount, budget };
  }

  const bare = [...query.matchAll(/\d[\d,.]*/g)]
    .map((m) => Number(m[0].replace(/,/g, "")))
    .find((n) => n >= 1000);
  if (bare !== undefined) return { amount: bare, budget };

  return undefined;
}

export async function fallbackSearch(query: string) {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2 && !/\d/.test(w) && !STOPWORDS.has(w));

  const priceInfo = parsePrice(query);

  const bedMatch = query.match(/(\d+)\s*(?:bhk|bed|br|room|bedroom)\b/i);
  const bedrooms = bedMatch ? Number(bedMatch[1]) : undefined;

  const where: Record<string, unknown> = { status: "AVAILABLE" };
  const ands: Record<string, unknown>[] = [];

  if (words.length > 0) {
    ands.push({
      OR: words.flatMap((word) => [
        { area: { contains: word, mode: "insensitive" } },
        { city: { contains: word, mode: "insensitive" } },
        { address: { contains: word, mode: "insensitive" } },
        { title: { contains: word, mode: "insensitive" } },
        { description: { contains: word, mode: "insensitive" } },
      ]),
    });
  }

  // A bedroom count may live in the structured field OR the title (e.g. "2bhk").
  if (bedrooms) {
    ands.push({
      OR: [
        { bedrooms },
        { title: { contains: String(bedrooms), mode: "insensitive" } },
      ],
    });
  }

  if (ands.length > 0) where.AND = ands;

  if (priceInfo) {
    where.price = priceInfo.budget ? { lte: priceInfo.amount } : { equals: priceInfo.amount };
  }

  return prisma.listing.findMany({
    where,
    include: listingInclude,
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}

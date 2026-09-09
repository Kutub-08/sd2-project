export interface PaginationQuery {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

function toPositiveInt(value: number | undefined, fallback: number): number {
  return Number.isFinite(value) && (value as number) > 0 ? Math.floor(value as number) : fallback;
}

export function getPagination(
  page?: string | number | null,
  limit?: string | number | null,
  opts: { defaultLimit?: number; maxLimit?: number } = {},
): PaginationQuery {
  const { defaultLimit = DEFAULT_LIMIT, maxLimit = MAX_LIMIT } = opts;

  const parsedPage = typeof page === "string" ? Number(page) : page;
  const parsedLimit = typeof limit === "string" ? Number(limit) : limit;

  const resolvedLimit = Math.min(
    toPositiveInt(parsedLimit as number | undefined, defaultLimit),
    maxLimit,
  );

  return {
    page: toPositiveInt(parsedPage as number | undefined, 1),
    limit: resolvedLimit,
  };
}

export function getSkipTake(page: number, limit: number): { skip: number; take: number } {
  return { skip: (page - 1) * limit, take: limit };
}

export function getPaginationMeta(total: number, page: number, limit: number): PaginationMeta {
  return { total, page, limit, totalPages: Math.ceil(total / limit) };
}
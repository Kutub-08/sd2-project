import { z } from "zod";

const ratingField = z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5");
const commentField = z.string().min(5, "Comment must be at least 5 characters").max(1000, "Comment too long");

export const createReviewSchema = z.object({
  listingId: z.string().uuid("Invalid listing ID"),
  rating: ratingField,
  comment: commentField,
});

export const updateReviewSchema = z.object({
  rating: ratingField,
  comment: commentField,
});

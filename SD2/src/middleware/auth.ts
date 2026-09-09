import { type Request, type Response, type NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";
import { prisma } from "../lib/prisma.js";

export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    throw new AppError(401, "UNAUTHORIZED", "Missing or invalid token");
  }
  const token = header.split(" ")[1];

  let payload: { userId: string; role: string };
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new AppError(401, "UNAUTHORIZED", "Invalid or expired token");
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, role: true, isBanned: true, isVerified: true },
  });
  if (!user) {
    throw new AppError(401, "UNAUTHORIZED", "Invalid or expired token");
  }
  if (user.isBanned) {
    throw new AppError(403, "FORBIDDEN", "This account has been banned");
  }

  req.user = {
    id: user.id,
    role: user.role as "TENANT" | "LANDLORD" | "ADMIN",
    isVerified: user.isVerified,
  };
  next();
}

export function authorize(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError(403, "FORBIDDEN", "Insufficient permissions");
    }
    next();
  };
}

export function requireVerified(req: Request, _res: Response, next: NextFunction) {
  if (!req.user?.isVerified) {
    throw new AppError(
      403,
      "EMAIL_NOT_VERIFIED",
      "Please verify your email before doing this",
    );
  }
  next();
}
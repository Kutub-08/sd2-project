import "dotenv/config";
import { describe, it, expect, jest } from "@jest/globals";
import jwt from "jsonwebtoken";
import { generateAccessToken, verifyAccessToken } from "../../src/utils/jwt.js";
import { success, fail } from "../../src/utils/apiResponse.js";
import { param } from "../../src/utils/param.js";
import { AppError } from "../../src/utils/AppError.js";
import { hashPassword, comparePassword, hashToken } from "../../src/utils/hash.js";
import { getPagination, getSkipTake, getPaginationMeta } from "../../src/utils/pagination.js";
import { sendPasswordResetEmail } from "../../src/config/mailer.js";

describe("jwt", () => {
  const payload = { userId: "user-1", role: "TENANT" };

  it("generateAccessToken creates a valid JWT", () => {
    const token = generateAccessToken(payload);
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3);
  });

  it("verifyAccessToken decodes a valid token", () => {
    const token = generateAccessToken(payload);
    const decoded = verifyAccessToken(token);
    expect(decoded.userId).toBe("user-1");
    expect(decoded.role).toBe("TENANT");
  });

  it("verifyAccessToken throws on malformed token", () => {
    expect(() => verifyAccessToken("not-a-token")).toThrow();
  });

  it("verifyAccessToken throws on expired token", () => {
    const expired = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "0s" });
    expect(() => verifyAccessToken(expired)).toThrow("jwt expired");
  });

  it("verifyAccessToken throws on wrong secret", () => {
    const token = jwt.sign(payload, "wrong-secret");
    expect(() => verifyAccessToken(token)).toThrow("invalid signature");
  });
});

describe("apiResponse", () => {
  it("success sends JSON with success:true", () => {
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    success({ status } as never, { foo: "bar" }, 201);
    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith({ success: true, data: { foo: "bar" } });
  });

  it("success defaults to 200", () => {
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    success({ status } as never, "ok");
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ success: true, data: "ok" });
  });

  it("fail sends JSON with success:false and error object", () => {
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    fail({ status } as never, "Bad request", 400, "BAD_REQUEST");
    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      success: false,
      error: { code: "BAD_REQUEST", message: "Bad request" },
    });
  });

  it("fail uses defaults when only message is provided", () => {
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    fail({ status } as never, "Something went wrong");
    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      success: false,
      error: { code: "BAD_REQUEST", message: "Something went wrong" },
    });
  });
});

describe("param", () => {
  it("returns string param value", () => {
    const req = { params: { id: "abc-123" } } as never;
    expect(param(req, "id")).toBe("abc-123");
  });

  it("returns first element when param is an array", () => {
    const req = { params: { id: ["first", "second"] } } as never;
    expect(param(req, "id")).toBe("first");
  });

  it("returns undefined for missing param", () => {
    const req = { params: {} } as never;
    expect(param(req, "missing")).toBeUndefined();
  });
});

describe("AppError", () => {
  it("creates an error with statusCode and code", () => {
    const err = new AppError(404, "NOT_FOUND", "User not found");
    expect(err).toBeInstanceOf(Error);
    expect(err.statusCode).toBe(404);
    expect(err.code).toBe("NOT_FOUND");
    expect(err.message).toBe("User not found");
  });

  it("is identifiable via instanceof", () => {
    const err = new AppError(403, "FORBIDDEN", "Access denied");
    expect(err instanceof AppError).toBe(true);
    expect(err instanceof Error).toBe(true);
  });
});

describe("hash", () => {
  it("hashPassword produces a hash string", async () => {
    const hash = await hashPassword("myPassword");
    expect(typeof hash).toBe("string");
    expect(hash.length).toBeGreaterThan(20);
  });

  it("comparePassword returns true for matching password", async () => {
    const hash = await hashPassword("myPassword");
    const match = await comparePassword("myPassword", hash);
    expect(match).toBe(true);
  });

  it("comparePassword returns false for wrong password", async () => {
    const hash = await hashPassword("myPassword");
    const match = await comparePassword("wrong", hash);
    expect(match).toBe(false);
  });

  it("hashToken produces a consistent SHA-256 hex string", () => {
    const result = hashToken("token123");
    expect(typeof result).toBe("string");
    expect(result.length).toBe(64);
  });

  it("hashToken is deterministic", () => {
    const a = hashToken("same-token");
    const b = hashToken("same-token");
    expect(a).toBe(b);
  });
});

describe("pagination", () => {
  it("getPagination defaults to page 1 and limit 20", () => {
    expect(getPagination()).toEqual({ page: 1, limit: 20 });
  });

  it("getPagination parses string values", () => {
    expect(getPagination("3", "15")).toEqual({ page: 3, limit: 15 });
  });

  it("getPagination clamps limit to maxLimit (100)", () => {
    expect(getPagination("1", "500")).toEqual({ page: 1, limit: 100 });
  });

  it("getPagination floors non-integer values", () => {
    expect(getPagination("2.9", "7.8")).toEqual({ page: 2, limit: 7 });
  });

  it("getPagination falls back to defaults for invalid input", () => {
    expect(getPagination("abc", "-5")).toEqual({ page: 1, limit: 20 });
    expect(getPagination("0", "0")).toEqual({ page: 1, limit: 20 });
    expect(getPagination(null, undefined)).toEqual({ page: 1, limit: 20 });
  });

  it("getPagination supports custom defaults", () => {
    expect(getPagination(undefined, undefined, { defaultLimit: 10, maxLimit: 50 })).toEqual({
      page: 1,
      limit: 10,
    });
    expect(getPagination(1, 1000, { maxLimit: 50 })).toEqual({ page: 1, limit: 50 });
  });

  it("getSkipTake computes offset and take", () => {
    expect(getSkipTake(1, 20)).toEqual({ skip: 0, take: 20 });
    expect(getSkipTake(3, 10)).toEqual({ skip: 20, take: 10 });
  });

  it("getPaginationMeta builds page metadata", () => {
    expect(getPaginationMeta(57, 3, 20)).toEqual({ total: 57, page: 3, limit: 20, totalPages: 3 });
    expect(getPaginationMeta(0, 1, 20)).toEqual({ total: 0, page: 1, limit: 20, totalPages: 0 });
  });
});

describe("mailer", () => {
  it("sendPasswordResetEmail falls back (returns false) when SMTP is not configured", async () => {
    const result = await sendPasswordResetEmail(
      "test@example.com",
      "http://localhost:3000/reset-password?token=abc",
    );
    expect(result).toBe(false);
  });
});

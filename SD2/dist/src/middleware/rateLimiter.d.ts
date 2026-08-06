import { type Request, type Response, type NextFunction } from "express";
declare function noop(_req: Request, _res: Response, next: NextFunction): void;
export declare const globalLimiter: typeof noop;
export declare const authLimiter: typeof noop;
export declare const inquiryLimiter: typeof noop;
export declare const aiLimiter: typeof noop;
export {};
//# sourceMappingURL=rateLimiter.d.ts.map
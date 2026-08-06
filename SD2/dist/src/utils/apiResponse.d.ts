import { type Response } from "express";
export declare function success<T>(res: Response, data: T, statusCode?: number): void;
export declare function fail(res: Response, message: string, statusCode?: number, code?: string): void;
//# sourceMappingURL=apiResponse.d.ts.map
import { type Request, type Response, type NextFunction } from "express";
export declare function authenticate(req: Request, _res: Response, next: NextFunction): void;
export declare function authorize(...roles: string[]): (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map
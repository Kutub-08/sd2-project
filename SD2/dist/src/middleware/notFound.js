import { AppError } from "../utils/AppError.js";
export function notFound(_req, _res, next) {
    next(new AppError(404, "NOT_FOUND", "Route not found"));
}
//# sourceMappingURL=notFound.js.map
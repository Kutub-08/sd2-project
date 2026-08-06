import { verifyAccessToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";
export function authenticate(req, _res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        throw new AppError(401, "UNAUTHORIZED", "Missing or invalid token");
    }
    const token = header.split(" ")[1];
    try {
        const payload = verifyAccessToken(token);
        req.user = { id: payload.userId, role: payload.role };
        next();
    }
    catch {
        throw new AppError(401, "UNAUTHORIZED", "Invalid or expired token");
    }
}
export function authorize(...roles) {
    return (req, _res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new AppError(403, "FORBIDDEN", "Insufficient permissions");
        }
        next();
    };
}
//# sourceMappingURL=auth.js.map
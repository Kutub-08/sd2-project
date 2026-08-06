import { ZodError } from "zod";
import { AppError } from "../utils/AppError.js";
export function validate(schema, source = "body") {
    return (req, _res, next) => {
        try {
            const parsed = schema.parse(req[source]);
            if (source === "query" || source === "params") {
                Object.assign(req[source], parsed);
            }
            else {
                req[source] = parsed;
            }
            next();
        }
        catch (err) {
            if (err instanceof ZodError) {
                const messages = err.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ");
                throw new AppError(400, "VALIDATION_ERROR", messages);
            }
            next(err);
        }
    };
}
//# sourceMappingURL=validate.js.map
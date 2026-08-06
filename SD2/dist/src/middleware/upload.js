import multer from "multer";
import { AppError } from "../utils/AppError.js";
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const storage = multer.memoryStorage();
const fileFilter = (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new AppError(400, "INVALID_FILE_TYPE", "Only JPEG, PNG, GIF, and WebP images are allowed"));
    }
};
export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: MAX_FILE_SIZE },
});
//# sourceMappingURL=upload.js.map
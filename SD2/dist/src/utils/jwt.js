import jwt from "jsonwebtoken";
export function generateAccessToken(payload) {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret)
        throw new Error("ACCESS_TOKEN_SECRET is not set");
    return jwt.sign(payload, secret, { expiresIn: "15m" });
}
export function verifyAccessToken(token) {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret)
        throw new Error("ACCESS_TOKEN_SECRET is not set");
    return jwt.verify(token, secret);
}
//# sourceMappingURL=jwt.js.map
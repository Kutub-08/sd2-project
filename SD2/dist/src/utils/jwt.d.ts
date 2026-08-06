interface TokenPayload {
    userId: string;
    role: string;
}
export declare function generateAccessToken(payload: TokenPayload): string;
export declare function verifyAccessToken(token: string): TokenPayload;
export {};
//# sourceMappingURL=jwt.d.ts.map
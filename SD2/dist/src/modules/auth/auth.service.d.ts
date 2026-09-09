import type { AuthPayload } from "./auth.types.js";
export declare function register(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "TENANT" | "LANDLORD";
}): Promise<{
    payload: {
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            role: "TENANT" | "LANDLORD" | "ADMIN";
            isVerified: boolean;
            createdAt: Date;
        };
        accessToken: string;
    };
    rawRefreshToken: string;
}>;
export declare function login(email: string, password: string): Promise<{
    payload: AuthPayload;
    rawRefreshToken: string;
}>;
export declare function refresh(rawToken: string): Promise<{
    payload: AuthPayload;
    rawRefreshToken: string;
}>;
export declare function logout(rawToken: string): Promise<void>;
export declare function forgotPassword(email: string): Promise<{
    message: string;
}>;
export declare function resetPassword(token: string, newPassword: string): Promise<{
    message: string;
}>;
export declare function requestVerification(userId: string): Promise<{
    message: string;
}>;
export declare function verifyEmail(userId: string, code: string): Promise<AuthPayload["user"]>;
export declare function getMe(userId: string): Promise<{
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "TENANT" | "LANDLORD" | "ADMIN";
    isVerified: boolean;
    createdAt: Date;
}>;
//# sourceMappingURL=auth.service.d.ts.map
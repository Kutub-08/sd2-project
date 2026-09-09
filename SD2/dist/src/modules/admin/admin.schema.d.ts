import { z } from "zod";
export declare const adminUserQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    role: z.ZodOptional<z.ZodEnum<{
        TENANT: "TENANT";
        LANDLORD: "LANDLORD";
        ADMIN: "ADMIN";
    }>>;
}, z.core.$strip>;
export declare const updateUserRoleSchema: z.ZodObject<{
    role: z.ZodEnum<{
        TENANT: "TENANT";
        LANDLORD: "LANDLORD";
        ADMIN: "ADMIN";
    }>;
}, z.core.$strip>;
export declare const updateUserBanSchema: z.ZodObject<{
    banned: z.ZodBoolean;
}, z.core.$strip>;
//# sourceMappingURL=admin.schema.d.ts.map
import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
export type AiSearchLog = Prisma.AiSearchLogModel;
export type Favorite = Prisma.FavoriteModel;
export type Inquiry = Prisma.InquiryModel;
export type Listing = Prisma.ListingModel;
export type ListingImage = Prisma.ListingImageModel;
export type PasswordResetToken = Prisma.PasswordResetTokenModel;
export type RefreshToken = Prisma.RefreshTokenModel;
export type Review = Prisma.ReviewModel;
export type User = Prisma.UserModel;
export type VerificationCode = Prisma.VerificationCodeModel;
//# sourceMappingURL=client.d.ts.map
import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    phone: string | null;
    passwordHash: string | null;
    role: $Enums.UserRole | null;
    isVerified: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    phone: string | null;
    passwordHash: string | null;
    role: $Enums.UserRole | null;
    isVerified: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    phone: number;
    passwordHash: number;
    role: number;
    isVerified: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    phone?: true;
    passwordHash?: true;
    role?: true;
    isVerified?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    phone?: true;
    passwordHash?: true;
    role?: true;
    isVerified?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    phone?: true;
    passwordHash?: true;
    role?: true;
    isVerified?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role: $Enums.UserRole;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.UuidFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    phone?: Prisma.StringFilter<"User"> | string;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    isVerified?: Prisma.BoolFilter<"User"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    listings?: Prisma.ListingListRelationFilter;
    refreshTokens?: Prisma.RefreshTokenListRelationFilter;
    favorites?: Prisma.FavoriteListRelationFilter;
    inquiries?: Prisma.InquiryListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
    aiSearchLogs?: Prisma.AiSearchLogListRelationFilter;
    passwordResetTokens?: Prisma.PasswordResetTokenListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    listings?: Prisma.ListingOrderByRelationAggregateInput;
    refreshTokens?: Prisma.RefreshTokenOrderByRelationAggregateInput;
    favorites?: Prisma.FavoriteOrderByRelationAggregateInput;
    inquiries?: Prisma.InquiryOrderByRelationAggregateInput;
    reviews?: Prisma.ReviewOrderByRelationAggregateInput;
    aiSearchLogs?: Prisma.AiSearchLogOrderByRelationAggregateInput;
    passwordResetTokens?: Prisma.PasswordResetTokenOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    name?: Prisma.StringFilter<"User"> | string;
    phone?: Prisma.StringFilter<"User"> | string;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    isVerified?: Prisma.BoolFilter<"User"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    listings?: Prisma.ListingListRelationFilter;
    refreshTokens?: Prisma.RefreshTokenListRelationFilter;
    favorites?: Prisma.FavoriteListRelationFilter;
    inquiries?: Prisma.InquiryListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
    aiSearchLogs?: Prisma.AiSearchLogListRelationFilter;
    passwordResetTokens?: Prisma.PasswordResetTokenListRelationFilter;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    phone?: Prisma.StringWithAggregatesFilter<"User"> | string;
    passwordHash?: Prisma.StringWithAggregatesFilter<"User"> | string;
    role?: Prisma.EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole;
    isVerified?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingCreateNestedManyWithoutLandlordInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    favorites?: Prisma.FavoriteCreateNestedManyWithoutUserInput;
    inquiries?: Prisma.InquiryCreateNestedManyWithoutTenantInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutTenantInput;
    aiSearchLogs?: Prisma.AiSearchLogCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingUncheckedCreateNestedManyWithoutLandlordInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    favorites?: Prisma.FavoriteUncheckedCreateNestedManyWithoutUserInput;
    inquiries?: Prisma.InquiryUncheckedCreateNestedManyWithoutTenantInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutTenantInput;
    aiSearchLogs?: Prisma.AiSearchLogUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUpdateManyWithoutLandlordNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    favorites?: Prisma.FavoriteUpdateManyWithoutUserNestedInput;
    inquiries?: Prisma.InquiryUpdateManyWithoutTenantNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutTenantNestedInput;
    aiSearchLogs?: Prisma.AiSearchLogUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUncheckedUpdateManyWithoutLandlordNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    favorites?: Prisma.FavoriteUncheckedUpdateManyWithoutUserNestedInput;
    inquiries?: Prisma.InquiryUncheckedUpdateManyWithoutTenantNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutTenantNestedInput;
    aiSearchLogs?: Prisma.AiSearchLogUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserCreateNestedOneWithoutAiSearchLogsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAiSearchLogsInput, Prisma.UserUncheckedCreateWithoutAiSearchLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAiSearchLogsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutAiSearchLogsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAiSearchLogsInput, Prisma.UserUncheckedCreateWithoutAiSearchLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAiSearchLogsInput;
    upsert?: Prisma.UserUpsertWithoutAiSearchLogsInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAiSearchLogsInput, Prisma.UserUpdateWithoutAiSearchLogsInput>, Prisma.UserUncheckedUpdateWithoutAiSearchLogsInput>;
};
export type UserCreateNestedOneWithoutFavoritesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutFavoritesInput, Prisma.UserUncheckedCreateWithoutFavoritesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutFavoritesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutFavoritesInput, Prisma.UserUncheckedCreateWithoutFavoritesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutFavoritesInput;
    upsert?: Prisma.UserUpsertWithoutFavoritesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutFavoritesInput, Prisma.UserUpdateWithoutFavoritesInput>, Prisma.UserUncheckedUpdateWithoutFavoritesInput>;
};
export type UserCreateNestedOneWithoutInquiriesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutInquiriesInput, Prisma.UserUncheckedCreateWithoutInquiriesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutInquiriesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutInquiriesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutInquiriesInput, Prisma.UserUncheckedCreateWithoutInquiriesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutInquiriesInput;
    upsert?: Prisma.UserUpsertWithoutInquiriesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutInquiriesInput, Prisma.UserUpdateWithoutInquiriesInput>, Prisma.UserUncheckedUpdateWithoutInquiriesInput>;
};
export type UserCreateNestedOneWithoutListingsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutListingsInput, Prisma.UserUncheckedCreateWithoutListingsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutListingsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutListingsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutListingsInput, Prisma.UserUncheckedCreateWithoutListingsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutListingsInput;
    upsert?: Prisma.UserUpsertWithoutListingsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutListingsInput, Prisma.UserUpdateWithoutListingsInput>, Prisma.UserUncheckedUpdateWithoutListingsInput>;
};
export type UserCreateNestedOneWithoutPasswordResetTokensInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPasswordResetTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPasswordResetTokensInput;
    upsert?: Prisma.UserUpsertWithoutPasswordResetTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPasswordResetTokensInput, Prisma.UserUpdateWithoutPasswordResetTokensInput>, Prisma.UserUncheckedUpdateWithoutPasswordResetTokensInput>;
};
export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRefreshTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRefreshTokensInput;
    upsert?: Prisma.UserUpsertWithoutRefreshTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutRefreshTokensInput, Prisma.UserUpdateWithoutRefreshTokensInput>, Prisma.UserUncheckedUpdateWithoutRefreshTokensInput>;
};
export type UserCreateNestedOneWithoutReviewsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReviewsInput, Prisma.UserUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReviewsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReviewsInput, Prisma.UserUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReviewsInput;
    upsert?: Prisma.UserUpsertWithoutReviewsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutReviewsInput, Prisma.UserUpdateWithoutReviewsInput>, Prisma.UserUncheckedUpdateWithoutReviewsInput>;
};
export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole;
};
export type UserCreateWithoutAiSearchLogsInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingCreateNestedManyWithoutLandlordInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    favorites?: Prisma.FavoriteCreateNestedManyWithoutUserInput;
    inquiries?: Prisma.InquiryCreateNestedManyWithoutTenantInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutTenantInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutAiSearchLogsInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingUncheckedCreateNestedManyWithoutLandlordInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    favorites?: Prisma.FavoriteUncheckedCreateNestedManyWithoutUserInput;
    inquiries?: Prisma.InquiryUncheckedCreateNestedManyWithoutTenantInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutTenantInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutAiSearchLogsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAiSearchLogsInput, Prisma.UserUncheckedCreateWithoutAiSearchLogsInput>;
};
export type UserUpsertWithoutAiSearchLogsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAiSearchLogsInput, Prisma.UserUncheckedUpdateWithoutAiSearchLogsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAiSearchLogsInput, Prisma.UserUncheckedCreateWithoutAiSearchLogsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAiSearchLogsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAiSearchLogsInput, Prisma.UserUncheckedUpdateWithoutAiSearchLogsInput>;
};
export type UserUpdateWithoutAiSearchLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUpdateManyWithoutLandlordNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    favorites?: Prisma.FavoriteUpdateManyWithoutUserNestedInput;
    inquiries?: Prisma.InquiryUpdateManyWithoutTenantNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutTenantNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutAiSearchLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUncheckedUpdateManyWithoutLandlordNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    favorites?: Prisma.FavoriteUncheckedUpdateManyWithoutUserNestedInput;
    inquiries?: Prisma.InquiryUncheckedUpdateManyWithoutTenantNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutTenantNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutFavoritesInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingCreateNestedManyWithoutLandlordInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    inquiries?: Prisma.InquiryCreateNestedManyWithoutTenantInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutTenantInput;
    aiSearchLogs?: Prisma.AiSearchLogCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutFavoritesInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingUncheckedCreateNestedManyWithoutLandlordInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    inquiries?: Prisma.InquiryUncheckedCreateNestedManyWithoutTenantInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutTenantInput;
    aiSearchLogs?: Prisma.AiSearchLogUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutFavoritesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutFavoritesInput, Prisma.UserUncheckedCreateWithoutFavoritesInput>;
};
export type UserUpsertWithoutFavoritesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutFavoritesInput, Prisma.UserUncheckedUpdateWithoutFavoritesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutFavoritesInput, Prisma.UserUncheckedCreateWithoutFavoritesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutFavoritesInput, Prisma.UserUncheckedUpdateWithoutFavoritesInput>;
};
export type UserUpdateWithoutFavoritesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUpdateManyWithoutLandlordNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    inquiries?: Prisma.InquiryUpdateManyWithoutTenantNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutTenantNestedInput;
    aiSearchLogs?: Prisma.AiSearchLogUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutFavoritesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUncheckedUpdateManyWithoutLandlordNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    inquiries?: Prisma.InquiryUncheckedUpdateManyWithoutTenantNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutTenantNestedInput;
    aiSearchLogs?: Prisma.AiSearchLogUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutInquiriesInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingCreateNestedManyWithoutLandlordInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    favorites?: Prisma.FavoriteCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutTenantInput;
    aiSearchLogs?: Prisma.AiSearchLogCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutInquiriesInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingUncheckedCreateNestedManyWithoutLandlordInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    favorites?: Prisma.FavoriteUncheckedCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutTenantInput;
    aiSearchLogs?: Prisma.AiSearchLogUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutInquiriesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutInquiriesInput, Prisma.UserUncheckedCreateWithoutInquiriesInput>;
};
export type UserUpsertWithoutInquiriesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutInquiriesInput, Prisma.UserUncheckedUpdateWithoutInquiriesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutInquiriesInput, Prisma.UserUncheckedCreateWithoutInquiriesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutInquiriesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutInquiriesInput, Prisma.UserUncheckedUpdateWithoutInquiriesInput>;
};
export type UserUpdateWithoutInquiriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUpdateManyWithoutLandlordNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    favorites?: Prisma.FavoriteUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutTenantNestedInput;
    aiSearchLogs?: Prisma.AiSearchLogUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutInquiriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUncheckedUpdateManyWithoutLandlordNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    favorites?: Prisma.FavoriteUncheckedUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutTenantNestedInput;
    aiSearchLogs?: Prisma.AiSearchLogUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutListingsInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    favorites?: Prisma.FavoriteCreateNestedManyWithoutUserInput;
    inquiries?: Prisma.InquiryCreateNestedManyWithoutTenantInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutTenantInput;
    aiSearchLogs?: Prisma.AiSearchLogCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutListingsInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    favorites?: Prisma.FavoriteUncheckedCreateNestedManyWithoutUserInput;
    inquiries?: Prisma.InquiryUncheckedCreateNestedManyWithoutTenantInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutTenantInput;
    aiSearchLogs?: Prisma.AiSearchLogUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutListingsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutListingsInput, Prisma.UserUncheckedCreateWithoutListingsInput>;
};
export type UserUpsertWithoutListingsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutListingsInput, Prisma.UserUncheckedUpdateWithoutListingsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutListingsInput, Prisma.UserUncheckedCreateWithoutListingsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutListingsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutListingsInput, Prisma.UserUncheckedUpdateWithoutListingsInput>;
};
export type UserUpdateWithoutListingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    favorites?: Prisma.FavoriteUpdateManyWithoutUserNestedInput;
    inquiries?: Prisma.InquiryUpdateManyWithoutTenantNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutTenantNestedInput;
    aiSearchLogs?: Prisma.AiSearchLogUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutListingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    favorites?: Prisma.FavoriteUncheckedUpdateManyWithoutUserNestedInput;
    inquiries?: Prisma.InquiryUncheckedUpdateManyWithoutTenantNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutTenantNestedInput;
    aiSearchLogs?: Prisma.AiSearchLogUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutPasswordResetTokensInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingCreateNestedManyWithoutLandlordInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    favorites?: Prisma.FavoriteCreateNestedManyWithoutUserInput;
    inquiries?: Prisma.InquiryCreateNestedManyWithoutTenantInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutTenantInput;
    aiSearchLogs?: Prisma.AiSearchLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutPasswordResetTokensInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingUncheckedCreateNestedManyWithoutLandlordInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    favorites?: Prisma.FavoriteUncheckedCreateNestedManyWithoutUserInput;
    inquiries?: Prisma.InquiryUncheckedCreateNestedManyWithoutTenantInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutTenantInput;
    aiSearchLogs?: Prisma.AiSearchLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutPasswordResetTokensInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>;
};
export type UserUpsertWithoutPasswordResetTokensInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPasswordResetTokensInput, Prisma.UserUncheckedUpdateWithoutPasswordResetTokensInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPasswordResetTokensInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPasswordResetTokensInput, Prisma.UserUncheckedUpdateWithoutPasswordResetTokensInput>;
};
export type UserUpdateWithoutPasswordResetTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUpdateManyWithoutLandlordNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    favorites?: Prisma.FavoriteUpdateManyWithoutUserNestedInput;
    inquiries?: Prisma.InquiryUpdateManyWithoutTenantNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutTenantNestedInput;
    aiSearchLogs?: Prisma.AiSearchLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutPasswordResetTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUncheckedUpdateManyWithoutLandlordNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    favorites?: Prisma.FavoriteUncheckedUpdateManyWithoutUserNestedInput;
    inquiries?: Prisma.InquiryUncheckedUpdateManyWithoutTenantNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutTenantNestedInput;
    aiSearchLogs?: Prisma.AiSearchLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutRefreshTokensInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingCreateNestedManyWithoutLandlordInput;
    favorites?: Prisma.FavoriteCreateNestedManyWithoutUserInput;
    inquiries?: Prisma.InquiryCreateNestedManyWithoutTenantInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutTenantInput;
    aiSearchLogs?: Prisma.AiSearchLogCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingUncheckedCreateNestedManyWithoutLandlordInput;
    favorites?: Prisma.FavoriteUncheckedCreateNestedManyWithoutUserInput;
    inquiries?: Prisma.InquiryUncheckedCreateNestedManyWithoutTenantInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutTenantInput;
    aiSearchLogs?: Prisma.AiSearchLogUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>;
};
export type UserUpsertWithoutRefreshTokensInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutRefreshTokensInput, Prisma.UserUncheckedUpdateWithoutRefreshTokensInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutRefreshTokensInput, Prisma.UserUncheckedUpdateWithoutRefreshTokensInput>;
};
export type UserUpdateWithoutRefreshTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUpdateManyWithoutLandlordNestedInput;
    favorites?: Prisma.FavoriteUpdateManyWithoutUserNestedInput;
    inquiries?: Prisma.InquiryUpdateManyWithoutTenantNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutTenantNestedInput;
    aiSearchLogs?: Prisma.AiSearchLogUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUncheckedUpdateManyWithoutLandlordNestedInput;
    favorites?: Prisma.FavoriteUncheckedUpdateManyWithoutUserNestedInput;
    inquiries?: Prisma.InquiryUncheckedUpdateManyWithoutTenantNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutTenantNestedInput;
    aiSearchLogs?: Prisma.AiSearchLogUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutReviewsInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingCreateNestedManyWithoutLandlordInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    favorites?: Prisma.FavoriteCreateNestedManyWithoutUserInput;
    inquiries?: Prisma.InquiryCreateNestedManyWithoutTenantInput;
    aiSearchLogs?: Prisma.AiSearchLogCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutReviewsInput = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingUncheckedCreateNestedManyWithoutLandlordInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    favorites?: Prisma.FavoriteUncheckedCreateNestedManyWithoutUserInput;
    inquiries?: Prisma.InquiryUncheckedCreateNestedManyWithoutTenantInput;
    aiSearchLogs?: Prisma.AiSearchLogUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutReviewsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutReviewsInput, Prisma.UserUncheckedCreateWithoutReviewsInput>;
};
export type UserUpsertWithoutReviewsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutReviewsInput, Prisma.UserUncheckedUpdateWithoutReviewsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutReviewsInput, Prisma.UserUncheckedCreateWithoutReviewsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutReviewsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutReviewsInput, Prisma.UserUncheckedUpdateWithoutReviewsInput>;
};
export type UserUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUpdateManyWithoutLandlordNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    favorites?: Prisma.FavoriteUpdateManyWithoutUserNestedInput;
    inquiries?: Prisma.InquiryUpdateManyWithoutTenantNestedInput;
    aiSearchLogs?: Prisma.AiSearchLogUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUncheckedUpdateManyWithoutLandlordNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    favorites?: Prisma.FavoriteUncheckedUpdateManyWithoutUserNestedInput;
    inquiries?: Prisma.InquiryUncheckedUpdateManyWithoutTenantNestedInput;
    aiSearchLogs?: Prisma.AiSearchLogUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCountOutputType = {
    listings: number;
    refreshTokens: number;
    favorites: number;
    inquiries: number;
    reviews: number;
    aiSearchLogs: number;
    passwordResetTokens: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    listings?: boolean | UserCountOutputTypeCountListingsArgs;
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs;
    favorites?: boolean | UserCountOutputTypeCountFavoritesArgs;
    inquiries?: boolean | UserCountOutputTypeCountInquiriesArgs;
    reviews?: boolean | UserCountOutputTypeCountReviewsArgs;
    aiSearchLogs?: boolean | UserCountOutputTypeCountAiSearchLogsArgs;
    passwordResetTokens?: boolean | UserCountOutputTypeCountPasswordResetTokensArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountListingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ListingWhereInput;
};
export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefreshTokenWhereInput;
};
export type UserCountOutputTypeCountFavoritesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FavoriteWhereInput;
};
export type UserCountOutputTypeCountInquiriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InquiryWhereInput;
};
export type UserCountOutputTypeCountReviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
};
export type UserCountOutputTypeCountAiSearchLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AiSearchLogWhereInput;
};
export type UserCountOutputTypeCountPasswordResetTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PasswordResetTokenWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    isVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    listings?: boolean | Prisma.User$listingsArgs<ExtArgs>;
    refreshTokens?: boolean | Prisma.User$refreshTokensArgs<ExtArgs>;
    favorites?: boolean | Prisma.User$favoritesArgs<ExtArgs>;
    inquiries?: boolean | Prisma.User$inquiriesArgs<ExtArgs>;
    reviews?: boolean | Prisma.User$reviewsArgs<ExtArgs>;
    aiSearchLogs?: boolean | Prisma.User$aiSearchLogsArgs<ExtArgs>;
    passwordResetTokens?: boolean | Prisma.User$passwordResetTokensArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    isVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    isVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    isVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "email" | "phone" | "passwordHash" | "role" | "isVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    listings?: boolean | Prisma.User$listingsArgs<ExtArgs>;
    refreshTokens?: boolean | Prisma.User$refreshTokensArgs<ExtArgs>;
    favorites?: boolean | Prisma.User$favoritesArgs<ExtArgs>;
    inquiries?: boolean | Prisma.User$inquiriesArgs<ExtArgs>;
    reviews?: boolean | Prisma.User$reviewsArgs<ExtArgs>;
    aiSearchLogs?: boolean | Prisma.User$aiSearchLogsArgs<ExtArgs>;
    passwordResetTokens?: boolean | Prisma.User$passwordResetTokensArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        listings: Prisma.$ListingPayload<ExtArgs>[];
        refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[];
        favorites: Prisma.$FavoritePayload<ExtArgs>[];
        inquiries: Prisma.$InquiryPayload<ExtArgs>[];
        reviews: Prisma.$ReviewPayload<ExtArgs>[];
        aiSearchLogs: Prisma.$AiSearchLogPayload<ExtArgs>[];
        passwordResetTokens: Prisma.$PasswordResetTokenPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        email: string;
        phone: string;
        passwordHash: string;
        role: $Enums.UserRole;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    listings<T extends Prisma.User$listingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    refreshTokens<T extends Prisma.User$refreshTokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    favorites<T extends Prisma.User$favoritesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    inquiries<T extends Prisma.User$inquiriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$inquiriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reviews<T extends Prisma.User$reviewsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    aiSearchLogs<T extends Prisma.User$aiSearchLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$aiSearchLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AiSearchLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    passwordResetTokens<T extends Prisma.User$passwordResetTokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$passwordResetTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly phone: Prisma.FieldRef<"User", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'UserRole'>;
    readonly isVerified: Prisma.FieldRef<"User", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$listingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListingSelect<ExtArgs> | null;
    omit?: Prisma.ListingOmit<ExtArgs> | null;
    include?: Prisma.ListingInclude<ExtArgs> | null;
    where?: Prisma.ListingWhereInput;
    orderBy?: Prisma.ListingOrderByWithRelationInput | Prisma.ListingOrderByWithRelationInput[];
    cursor?: Prisma.ListingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ListingScalarFieldEnum | Prisma.ListingScalarFieldEnum[];
};
export type User$refreshTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
    where?: Prisma.RefreshTokenWhereInput;
    orderBy?: Prisma.RefreshTokenOrderByWithRelationInput | Prisma.RefreshTokenOrderByWithRelationInput[];
    cursor?: Prisma.RefreshTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefreshTokenScalarFieldEnum | Prisma.RefreshTokenScalarFieldEnum[];
};
export type User$favoritesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FavoriteSelect<ExtArgs> | null;
    omit?: Prisma.FavoriteOmit<ExtArgs> | null;
    include?: Prisma.FavoriteInclude<ExtArgs> | null;
    where?: Prisma.FavoriteWhereInput;
    orderBy?: Prisma.FavoriteOrderByWithRelationInput | Prisma.FavoriteOrderByWithRelationInput[];
    cursor?: Prisma.FavoriteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FavoriteScalarFieldEnum | Prisma.FavoriteScalarFieldEnum[];
};
export type User$inquiriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InquirySelect<ExtArgs> | null;
    omit?: Prisma.InquiryOmit<ExtArgs> | null;
    include?: Prisma.InquiryInclude<ExtArgs> | null;
    where?: Prisma.InquiryWhereInput;
    orderBy?: Prisma.InquiryOrderByWithRelationInput | Prisma.InquiryOrderByWithRelationInput[];
    cursor?: Prisma.InquiryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InquiryScalarFieldEnum | Prisma.InquiryScalarFieldEnum[];
};
export type User$reviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type User$aiSearchLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSearchLogSelect<ExtArgs> | null;
    omit?: Prisma.AiSearchLogOmit<ExtArgs> | null;
    include?: Prisma.AiSearchLogInclude<ExtArgs> | null;
    where?: Prisma.AiSearchLogWhereInput;
    orderBy?: Prisma.AiSearchLogOrderByWithRelationInput | Prisma.AiSearchLogOrderByWithRelationInput[];
    cursor?: Prisma.AiSearchLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AiSearchLogScalarFieldEnum | Prisma.AiSearchLogScalarFieldEnum[];
};
export type User$passwordResetTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PasswordResetTokenSelect<ExtArgs> | null;
    omit?: Prisma.PasswordResetTokenOmit<ExtArgs> | null;
    include?: Prisma.PasswordResetTokenInclude<ExtArgs> | null;
    where?: Prisma.PasswordResetTokenWhereInput;
    orderBy?: Prisma.PasswordResetTokenOrderByWithRelationInput | Prisma.PasswordResetTokenOrderByWithRelationInput[];
    cursor?: Prisma.PasswordResetTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PasswordResetTokenScalarFieldEnum | Prisma.PasswordResetTokenScalarFieldEnum[];
};
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
//# sourceMappingURL=User.d.ts.map
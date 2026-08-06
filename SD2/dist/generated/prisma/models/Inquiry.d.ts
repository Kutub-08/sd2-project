import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type InquiryModel = runtime.Types.Result.DefaultSelection<Prisma.$InquiryPayload>;
export type AggregateInquiry = {
    _count: InquiryCountAggregateOutputType | null;
    _min: InquiryMinAggregateOutputType | null;
    _max: InquiryMaxAggregateOutputType | null;
};
export type InquiryMinAggregateOutputType = {
    id: string | null;
    listingId: string | null;
    tenantId: string | null;
    message: string | null;
    status: $Enums.InquiryStatus | null;
    createdAt: Date | null;
};
export type InquiryMaxAggregateOutputType = {
    id: string | null;
    listingId: string | null;
    tenantId: string | null;
    message: string | null;
    status: $Enums.InquiryStatus | null;
    createdAt: Date | null;
};
export type InquiryCountAggregateOutputType = {
    id: number;
    listingId: number;
    tenantId: number;
    message: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type InquiryMinAggregateInputType = {
    id?: true;
    listingId?: true;
    tenantId?: true;
    message?: true;
    status?: true;
    createdAt?: true;
};
export type InquiryMaxAggregateInputType = {
    id?: true;
    listingId?: true;
    tenantId?: true;
    message?: true;
    status?: true;
    createdAt?: true;
};
export type InquiryCountAggregateInputType = {
    id?: true;
    listingId?: true;
    tenantId?: true;
    message?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type InquiryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InquiryWhereInput;
    orderBy?: Prisma.InquiryOrderByWithRelationInput | Prisma.InquiryOrderByWithRelationInput[];
    cursor?: Prisma.InquiryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InquiryCountAggregateInputType;
    _min?: InquiryMinAggregateInputType;
    _max?: InquiryMaxAggregateInputType;
};
export type GetInquiryAggregateType<T extends InquiryAggregateArgs> = {
    [P in keyof T & keyof AggregateInquiry]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInquiry[P]> : Prisma.GetScalarType<T[P], AggregateInquiry[P]>;
};
export type InquiryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InquiryWhereInput;
    orderBy?: Prisma.InquiryOrderByWithAggregationInput | Prisma.InquiryOrderByWithAggregationInput[];
    by: Prisma.InquiryScalarFieldEnum[] | Prisma.InquiryScalarFieldEnum;
    having?: Prisma.InquiryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InquiryCountAggregateInputType | true;
    _min?: InquiryMinAggregateInputType;
    _max?: InquiryMaxAggregateInputType;
};
export type InquiryGroupByOutputType = {
    id: string;
    listingId: string;
    tenantId: string;
    message: string;
    status: $Enums.InquiryStatus;
    createdAt: Date;
    _count: InquiryCountAggregateOutputType | null;
    _min: InquiryMinAggregateOutputType | null;
    _max: InquiryMaxAggregateOutputType | null;
};
export type GetInquiryGroupByPayload<T extends InquiryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InquiryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InquiryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InquiryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InquiryGroupByOutputType[P]>;
}>>;
export type InquiryWhereInput = {
    AND?: Prisma.InquiryWhereInput | Prisma.InquiryWhereInput[];
    OR?: Prisma.InquiryWhereInput[];
    NOT?: Prisma.InquiryWhereInput | Prisma.InquiryWhereInput[];
    id?: Prisma.UuidFilter<"Inquiry"> | string;
    listingId?: Prisma.UuidFilter<"Inquiry"> | string;
    tenantId?: Prisma.UuidFilter<"Inquiry"> | string;
    message?: Prisma.StringFilter<"Inquiry"> | string;
    status?: Prisma.EnumInquiryStatusFilter<"Inquiry"> | $Enums.InquiryStatus;
    createdAt?: Prisma.DateTimeFilter<"Inquiry"> | Date | string;
    listing?: Prisma.XOR<Prisma.ListingScalarRelationFilter, Prisma.ListingWhereInput>;
    tenant?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type InquiryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    listingId?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    listing?: Prisma.ListingOrderByWithRelationInput;
    tenant?: Prisma.UserOrderByWithRelationInput;
};
export type InquiryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.InquiryWhereInput | Prisma.InquiryWhereInput[];
    OR?: Prisma.InquiryWhereInput[];
    NOT?: Prisma.InquiryWhereInput | Prisma.InquiryWhereInput[];
    listingId?: Prisma.UuidFilter<"Inquiry"> | string;
    tenantId?: Prisma.UuidFilter<"Inquiry"> | string;
    message?: Prisma.StringFilter<"Inquiry"> | string;
    status?: Prisma.EnumInquiryStatusFilter<"Inquiry"> | $Enums.InquiryStatus;
    createdAt?: Prisma.DateTimeFilter<"Inquiry"> | Date | string;
    listing?: Prisma.XOR<Prisma.ListingScalarRelationFilter, Prisma.ListingWhereInput>;
    tenant?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type InquiryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    listingId?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.InquiryCountOrderByAggregateInput;
    _max?: Prisma.InquiryMaxOrderByAggregateInput;
    _min?: Prisma.InquiryMinOrderByAggregateInput;
};
export type InquiryScalarWhereWithAggregatesInput = {
    AND?: Prisma.InquiryScalarWhereWithAggregatesInput | Prisma.InquiryScalarWhereWithAggregatesInput[];
    OR?: Prisma.InquiryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InquiryScalarWhereWithAggregatesInput | Prisma.InquiryScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Inquiry"> | string;
    listingId?: Prisma.UuidWithAggregatesFilter<"Inquiry"> | string;
    tenantId?: Prisma.UuidWithAggregatesFilter<"Inquiry"> | string;
    message?: Prisma.StringWithAggregatesFilter<"Inquiry"> | string;
    status?: Prisma.EnumInquiryStatusWithAggregatesFilter<"Inquiry"> | $Enums.InquiryStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Inquiry"> | Date | string;
};
export type InquiryCreateInput = {
    id?: string;
    message: string;
    status?: $Enums.InquiryStatus;
    createdAt?: Date | string;
    listing: Prisma.ListingCreateNestedOneWithoutInquiriesInput;
    tenant: Prisma.UserCreateNestedOneWithoutInquiriesInput;
};
export type InquiryUncheckedCreateInput = {
    id?: string;
    listingId: string;
    tenantId: string;
    message: string;
    status?: $Enums.InquiryStatus;
    createdAt?: Date | string;
};
export type InquiryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listing?: Prisma.ListingUpdateOneRequiredWithoutInquiriesNestedInput;
    tenant?: Prisma.UserUpdateOneRequiredWithoutInquiriesNestedInput;
};
export type InquiryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    listingId?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InquiryCreateManyInput = {
    id?: string;
    listingId: string;
    tenantId: string;
    message: string;
    status?: $Enums.InquiryStatus;
    createdAt?: Date | string;
};
export type InquiryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InquiryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    listingId?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InquiryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    listingId?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InquiryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    listingId?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InquiryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    listingId?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InquiryListRelationFilter = {
    every?: Prisma.InquiryWhereInput;
    some?: Prisma.InquiryWhereInput;
    none?: Prisma.InquiryWhereInput;
};
export type InquiryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EnumInquiryStatusFieldUpdateOperationsInput = {
    set?: $Enums.InquiryStatus;
};
export type InquiryCreateNestedManyWithoutListingInput = {
    create?: Prisma.XOR<Prisma.InquiryCreateWithoutListingInput, Prisma.InquiryUncheckedCreateWithoutListingInput> | Prisma.InquiryCreateWithoutListingInput[] | Prisma.InquiryUncheckedCreateWithoutListingInput[];
    connectOrCreate?: Prisma.InquiryCreateOrConnectWithoutListingInput | Prisma.InquiryCreateOrConnectWithoutListingInput[];
    createMany?: Prisma.InquiryCreateManyListingInputEnvelope;
    connect?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
};
export type InquiryUncheckedCreateNestedManyWithoutListingInput = {
    create?: Prisma.XOR<Prisma.InquiryCreateWithoutListingInput, Prisma.InquiryUncheckedCreateWithoutListingInput> | Prisma.InquiryCreateWithoutListingInput[] | Prisma.InquiryUncheckedCreateWithoutListingInput[];
    connectOrCreate?: Prisma.InquiryCreateOrConnectWithoutListingInput | Prisma.InquiryCreateOrConnectWithoutListingInput[];
    createMany?: Prisma.InquiryCreateManyListingInputEnvelope;
    connect?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
};
export type InquiryUpdateManyWithoutListingNestedInput = {
    create?: Prisma.XOR<Prisma.InquiryCreateWithoutListingInput, Prisma.InquiryUncheckedCreateWithoutListingInput> | Prisma.InquiryCreateWithoutListingInput[] | Prisma.InquiryUncheckedCreateWithoutListingInput[];
    connectOrCreate?: Prisma.InquiryCreateOrConnectWithoutListingInput | Prisma.InquiryCreateOrConnectWithoutListingInput[];
    upsert?: Prisma.InquiryUpsertWithWhereUniqueWithoutListingInput | Prisma.InquiryUpsertWithWhereUniqueWithoutListingInput[];
    createMany?: Prisma.InquiryCreateManyListingInputEnvelope;
    set?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    disconnect?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    delete?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    connect?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    update?: Prisma.InquiryUpdateWithWhereUniqueWithoutListingInput | Prisma.InquiryUpdateWithWhereUniqueWithoutListingInput[];
    updateMany?: Prisma.InquiryUpdateManyWithWhereWithoutListingInput | Prisma.InquiryUpdateManyWithWhereWithoutListingInput[];
    deleteMany?: Prisma.InquiryScalarWhereInput | Prisma.InquiryScalarWhereInput[];
};
export type InquiryUncheckedUpdateManyWithoutListingNestedInput = {
    create?: Prisma.XOR<Prisma.InquiryCreateWithoutListingInput, Prisma.InquiryUncheckedCreateWithoutListingInput> | Prisma.InquiryCreateWithoutListingInput[] | Prisma.InquiryUncheckedCreateWithoutListingInput[];
    connectOrCreate?: Prisma.InquiryCreateOrConnectWithoutListingInput | Prisma.InquiryCreateOrConnectWithoutListingInput[];
    upsert?: Prisma.InquiryUpsertWithWhereUniqueWithoutListingInput | Prisma.InquiryUpsertWithWhereUniqueWithoutListingInput[];
    createMany?: Prisma.InquiryCreateManyListingInputEnvelope;
    set?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    disconnect?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    delete?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    connect?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    update?: Prisma.InquiryUpdateWithWhereUniqueWithoutListingInput | Prisma.InquiryUpdateWithWhereUniqueWithoutListingInput[];
    updateMany?: Prisma.InquiryUpdateManyWithWhereWithoutListingInput | Prisma.InquiryUpdateManyWithWhereWithoutListingInput[];
    deleteMany?: Prisma.InquiryScalarWhereInput | Prisma.InquiryScalarWhereInput[];
};
export type InquiryCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.InquiryCreateWithoutTenantInput, Prisma.InquiryUncheckedCreateWithoutTenantInput> | Prisma.InquiryCreateWithoutTenantInput[] | Prisma.InquiryUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.InquiryCreateOrConnectWithoutTenantInput | Prisma.InquiryCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.InquiryCreateManyTenantInputEnvelope;
    connect?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
};
export type InquiryUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.InquiryCreateWithoutTenantInput, Prisma.InquiryUncheckedCreateWithoutTenantInput> | Prisma.InquiryCreateWithoutTenantInput[] | Prisma.InquiryUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.InquiryCreateOrConnectWithoutTenantInput | Prisma.InquiryCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.InquiryCreateManyTenantInputEnvelope;
    connect?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
};
export type InquiryUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.InquiryCreateWithoutTenantInput, Prisma.InquiryUncheckedCreateWithoutTenantInput> | Prisma.InquiryCreateWithoutTenantInput[] | Prisma.InquiryUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.InquiryCreateOrConnectWithoutTenantInput | Prisma.InquiryCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.InquiryUpsertWithWhereUniqueWithoutTenantInput | Prisma.InquiryUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.InquiryCreateManyTenantInputEnvelope;
    set?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    disconnect?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    delete?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    connect?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    update?: Prisma.InquiryUpdateWithWhereUniqueWithoutTenantInput | Prisma.InquiryUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.InquiryUpdateManyWithWhereWithoutTenantInput | Prisma.InquiryUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.InquiryScalarWhereInput | Prisma.InquiryScalarWhereInput[];
};
export type InquiryUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.InquiryCreateWithoutTenantInput, Prisma.InquiryUncheckedCreateWithoutTenantInput> | Prisma.InquiryCreateWithoutTenantInput[] | Prisma.InquiryUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.InquiryCreateOrConnectWithoutTenantInput | Prisma.InquiryCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.InquiryUpsertWithWhereUniqueWithoutTenantInput | Prisma.InquiryUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.InquiryCreateManyTenantInputEnvelope;
    set?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    disconnect?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    delete?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    connect?: Prisma.InquiryWhereUniqueInput | Prisma.InquiryWhereUniqueInput[];
    update?: Prisma.InquiryUpdateWithWhereUniqueWithoutTenantInput | Prisma.InquiryUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.InquiryUpdateManyWithWhereWithoutTenantInput | Prisma.InquiryUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.InquiryScalarWhereInput | Prisma.InquiryScalarWhereInput[];
};
export type InquiryCreateWithoutListingInput = {
    id?: string;
    message: string;
    status?: $Enums.InquiryStatus;
    createdAt?: Date | string;
    tenant: Prisma.UserCreateNestedOneWithoutInquiriesInput;
};
export type InquiryUncheckedCreateWithoutListingInput = {
    id?: string;
    tenantId: string;
    message: string;
    status?: $Enums.InquiryStatus;
    createdAt?: Date | string;
};
export type InquiryCreateOrConnectWithoutListingInput = {
    where: Prisma.InquiryWhereUniqueInput;
    create: Prisma.XOR<Prisma.InquiryCreateWithoutListingInput, Prisma.InquiryUncheckedCreateWithoutListingInput>;
};
export type InquiryCreateManyListingInputEnvelope = {
    data: Prisma.InquiryCreateManyListingInput | Prisma.InquiryCreateManyListingInput[];
    skipDuplicates?: boolean;
};
export type InquiryUpsertWithWhereUniqueWithoutListingInput = {
    where: Prisma.InquiryWhereUniqueInput;
    update: Prisma.XOR<Prisma.InquiryUpdateWithoutListingInput, Prisma.InquiryUncheckedUpdateWithoutListingInput>;
    create: Prisma.XOR<Prisma.InquiryCreateWithoutListingInput, Prisma.InquiryUncheckedCreateWithoutListingInput>;
};
export type InquiryUpdateWithWhereUniqueWithoutListingInput = {
    where: Prisma.InquiryWhereUniqueInput;
    data: Prisma.XOR<Prisma.InquiryUpdateWithoutListingInput, Prisma.InquiryUncheckedUpdateWithoutListingInput>;
};
export type InquiryUpdateManyWithWhereWithoutListingInput = {
    where: Prisma.InquiryScalarWhereInput;
    data: Prisma.XOR<Prisma.InquiryUpdateManyMutationInput, Prisma.InquiryUncheckedUpdateManyWithoutListingInput>;
};
export type InquiryScalarWhereInput = {
    AND?: Prisma.InquiryScalarWhereInput | Prisma.InquiryScalarWhereInput[];
    OR?: Prisma.InquiryScalarWhereInput[];
    NOT?: Prisma.InquiryScalarWhereInput | Prisma.InquiryScalarWhereInput[];
    id?: Prisma.UuidFilter<"Inquiry"> | string;
    listingId?: Prisma.UuidFilter<"Inquiry"> | string;
    tenantId?: Prisma.UuidFilter<"Inquiry"> | string;
    message?: Prisma.StringFilter<"Inquiry"> | string;
    status?: Prisma.EnumInquiryStatusFilter<"Inquiry"> | $Enums.InquiryStatus;
    createdAt?: Prisma.DateTimeFilter<"Inquiry"> | Date | string;
};
export type InquiryCreateWithoutTenantInput = {
    id?: string;
    message: string;
    status?: $Enums.InquiryStatus;
    createdAt?: Date | string;
    listing: Prisma.ListingCreateNestedOneWithoutInquiriesInput;
};
export type InquiryUncheckedCreateWithoutTenantInput = {
    id?: string;
    listingId: string;
    message: string;
    status?: $Enums.InquiryStatus;
    createdAt?: Date | string;
};
export type InquiryCreateOrConnectWithoutTenantInput = {
    where: Prisma.InquiryWhereUniqueInput;
    create: Prisma.XOR<Prisma.InquiryCreateWithoutTenantInput, Prisma.InquiryUncheckedCreateWithoutTenantInput>;
};
export type InquiryCreateManyTenantInputEnvelope = {
    data: Prisma.InquiryCreateManyTenantInput | Prisma.InquiryCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type InquiryUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.InquiryWhereUniqueInput;
    update: Prisma.XOR<Prisma.InquiryUpdateWithoutTenantInput, Prisma.InquiryUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.InquiryCreateWithoutTenantInput, Prisma.InquiryUncheckedCreateWithoutTenantInput>;
};
export type InquiryUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.InquiryWhereUniqueInput;
    data: Prisma.XOR<Prisma.InquiryUpdateWithoutTenantInput, Prisma.InquiryUncheckedUpdateWithoutTenantInput>;
};
export type InquiryUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.InquiryScalarWhereInput;
    data: Prisma.XOR<Prisma.InquiryUpdateManyMutationInput, Prisma.InquiryUncheckedUpdateManyWithoutTenantInput>;
};
export type InquiryCreateManyListingInput = {
    id?: string;
    tenantId: string;
    message: string;
    status?: $Enums.InquiryStatus;
    createdAt?: Date | string;
};
export type InquiryUpdateWithoutListingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.UserUpdateOneRequiredWithoutInquiriesNestedInput;
};
export type InquiryUncheckedUpdateWithoutListingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InquiryUncheckedUpdateManyWithoutListingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InquiryCreateManyTenantInput = {
    id?: string;
    listingId: string;
    message: string;
    status?: $Enums.InquiryStatus;
    createdAt?: Date | string;
};
export type InquiryUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listing?: Prisma.ListingUpdateOneRequiredWithoutInquiriesNestedInput;
};
export type InquiryUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    listingId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InquiryUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    listingId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InquirySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    listingId?: boolean;
    tenantId?: boolean;
    message?: boolean;
    status?: boolean;
    createdAt?: boolean;
    listing?: boolean | Prisma.ListingDefaultArgs<ExtArgs>;
    tenant?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inquiry"]>;
export type InquirySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    listingId?: boolean;
    tenantId?: boolean;
    message?: boolean;
    status?: boolean;
    createdAt?: boolean;
    listing?: boolean | Prisma.ListingDefaultArgs<ExtArgs>;
    tenant?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inquiry"]>;
export type InquirySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    listingId?: boolean;
    tenantId?: boolean;
    message?: boolean;
    status?: boolean;
    createdAt?: boolean;
    listing?: boolean | Prisma.ListingDefaultArgs<ExtArgs>;
    tenant?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inquiry"]>;
export type InquirySelectScalar = {
    id?: boolean;
    listingId?: boolean;
    tenantId?: boolean;
    message?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type InquiryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "listingId" | "tenantId" | "message" | "status" | "createdAt", ExtArgs["result"]["inquiry"]>;
export type InquiryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    listing?: boolean | Prisma.ListingDefaultArgs<ExtArgs>;
    tenant?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type InquiryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    listing?: boolean | Prisma.ListingDefaultArgs<ExtArgs>;
    tenant?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type InquiryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    listing?: boolean | Prisma.ListingDefaultArgs<ExtArgs>;
    tenant?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $InquiryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Inquiry";
    objects: {
        listing: Prisma.$ListingPayload<ExtArgs>;
        tenant: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        listingId: string;
        tenantId: string;
        message: string;
        status: $Enums.InquiryStatus;
        createdAt: Date;
    }, ExtArgs["result"]["inquiry"]>;
    composites: {};
};
export type InquiryGetPayload<S extends boolean | null | undefined | InquiryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InquiryPayload, S>;
export type InquiryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InquiryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InquiryCountAggregateInputType | true;
};
export interface InquiryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Inquiry'];
        meta: {
            name: 'Inquiry';
        };
    };
    findUnique<T extends InquiryFindUniqueArgs>(args: Prisma.SelectSubset<T, InquiryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InquiryClient<runtime.Types.Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InquiryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InquiryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InquiryClient<runtime.Types.Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InquiryFindFirstArgs>(args?: Prisma.SelectSubset<T, InquiryFindFirstArgs<ExtArgs>>): Prisma.Prisma__InquiryClient<runtime.Types.Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InquiryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InquiryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InquiryClient<runtime.Types.Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InquiryFindManyArgs>(args?: Prisma.SelectSubset<T, InquiryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InquiryCreateArgs>(args: Prisma.SelectSubset<T, InquiryCreateArgs<ExtArgs>>): Prisma.Prisma__InquiryClient<runtime.Types.Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InquiryCreateManyArgs>(args?: Prisma.SelectSubset<T, InquiryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InquiryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InquiryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InquiryDeleteArgs>(args: Prisma.SelectSubset<T, InquiryDeleteArgs<ExtArgs>>): Prisma.Prisma__InquiryClient<runtime.Types.Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InquiryUpdateArgs>(args: Prisma.SelectSubset<T, InquiryUpdateArgs<ExtArgs>>): Prisma.Prisma__InquiryClient<runtime.Types.Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InquiryDeleteManyArgs>(args?: Prisma.SelectSubset<T, InquiryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InquiryUpdateManyArgs>(args: Prisma.SelectSubset<T, InquiryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InquiryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InquiryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InquiryUpsertArgs>(args: Prisma.SelectSubset<T, InquiryUpsertArgs<ExtArgs>>): Prisma.Prisma__InquiryClient<runtime.Types.Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InquiryCountArgs>(args?: Prisma.Subset<T, InquiryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InquiryCountAggregateOutputType> : number>;
    aggregate<T extends InquiryAggregateArgs>(args: Prisma.Subset<T, InquiryAggregateArgs>): Prisma.PrismaPromise<GetInquiryAggregateType<T>>;
    groupBy<T extends InquiryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InquiryGroupByArgs['orderBy'];
    } : {
        orderBy?: InquiryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InquiryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInquiryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InquiryFieldRefs;
}
export interface Prisma__InquiryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    listing<T extends Prisma.ListingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ListingDefaultArgs<ExtArgs>>): Prisma.Prisma__ListingClient<runtime.Types.Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tenant<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InquiryFieldRefs {
    readonly id: Prisma.FieldRef<"Inquiry", 'String'>;
    readonly listingId: Prisma.FieldRef<"Inquiry", 'String'>;
    readonly tenantId: Prisma.FieldRef<"Inquiry", 'String'>;
    readonly message: Prisma.FieldRef<"Inquiry", 'String'>;
    readonly status: Prisma.FieldRef<"Inquiry", 'InquiryStatus'>;
    readonly createdAt: Prisma.FieldRef<"Inquiry", 'DateTime'>;
}
export type InquiryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InquirySelect<ExtArgs> | null;
    omit?: Prisma.InquiryOmit<ExtArgs> | null;
    include?: Prisma.InquiryInclude<ExtArgs> | null;
    where: Prisma.InquiryWhereUniqueInput;
};
export type InquiryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InquirySelect<ExtArgs> | null;
    omit?: Prisma.InquiryOmit<ExtArgs> | null;
    include?: Prisma.InquiryInclude<ExtArgs> | null;
    where: Prisma.InquiryWhereUniqueInput;
};
export type InquiryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InquiryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InquiryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InquiryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InquirySelect<ExtArgs> | null;
    omit?: Prisma.InquiryOmit<ExtArgs> | null;
    include?: Prisma.InquiryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InquiryCreateInput, Prisma.InquiryUncheckedCreateInput>;
};
export type InquiryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InquiryCreateManyInput | Prisma.InquiryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InquiryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InquirySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InquiryOmit<ExtArgs> | null;
    data: Prisma.InquiryCreateManyInput | Prisma.InquiryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InquiryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InquiryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InquirySelect<ExtArgs> | null;
    omit?: Prisma.InquiryOmit<ExtArgs> | null;
    include?: Prisma.InquiryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InquiryUpdateInput, Prisma.InquiryUncheckedUpdateInput>;
    where: Prisma.InquiryWhereUniqueInput;
};
export type InquiryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InquiryUpdateManyMutationInput, Prisma.InquiryUncheckedUpdateManyInput>;
    where?: Prisma.InquiryWhereInput;
    limit?: number;
};
export type InquiryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InquirySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InquiryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InquiryUpdateManyMutationInput, Prisma.InquiryUncheckedUpdateManyInput>;
    where?: Prisma.InquiryWhereInput;
    limit?: number;
    include?: Prisma.InquiryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InquiryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InquirySelect<ExtArgs> | null;
    omit?: Prisma.InquiryOmit<ExtArgs> | null;
    include?: Prisma.InquiryInclude<ExtArgs> | null;
    where: Prisma.InquiryWhereUniqueInput;
    create: Prisma.XOR<Prisma.InquiryCreateInput, Prisma.InquiryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InquiryUpdateInput, Prisma.InquiryUncheckedUpdateInput>;
};
export type InquiryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InquirySelect<ExtArgs> | null;
    omit?: Prisma.InquiryOmit<ExtArgs> | null;
    include?: Prisma.InquiryInclude<ExtArgs> | null;
    where: Prisma.InquiryWhereUniqueInput;
};
export type InquiryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InquiryWhereInput;
    limit?: number;
};
export type InquiryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InquirySelect<ExtArgs> | null;
    omit?: Prisma.InquiryOmit<ExtArgs> | null;
    include?: Prisma.InquiryInclude<ExtArgs> | null;
};
//# sourceMappingURL=Inquiry.d.ts.map
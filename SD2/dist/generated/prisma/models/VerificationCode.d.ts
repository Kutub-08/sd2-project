import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type VerificationCodeModel = runtime.Types.Result.DefaultSelection<Prisma.$VerificationCodePayload>;
export type AggregateVerificationCode = {
    _count: VerificationCodeCountAggregateOutputType | null;
    _avg: VerificationCodeAvgAggregateOutputType | null;
    _sum: VerificationCodeSumAggregateOutputType | null;
    _min: VerificationCodeMinAggregateOutputType | null;
    _max: VerificationCodeMaxAggregateOutputType | null;
};
export type VerificationCodeAvgAggregateOutputType = {
    attempts: number | null;
};
export type VerificationCodeSumAggregateOutputType = {
    attempts: number | null;
};
export type VerificationCodeMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    codeHash: string | null;
    expiresAt: Date | null;
    usedAt: Date | null;
    attempts: number | null;
    createdAt: Date | null;
};
export type VerificationCodeMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    codeHash: string | null;
    expiresAt: Date | null;
    usedAt: Date | null;
    attempts: number | null;
    createdAt: Date | null;
};
export type VerificationCodeCountAggregateOutputType = {
    id: number;
    userId: number;
    codeHash: number;
    expiresAt: number;
    usedAt: number;
    attempts: number;
    createdAt: number;
    _all: number;
};
export type VerificationCodeAvgAggregateInputType = {
    attempts?: true;
};
export type VerificationCodeSumAggregateInputType = {
    attempts?: true;
};
export type VerificationCodeMinAggregateInputType = {
    id?: true;
    userId?: true;
    codeHash?: true;
    expiresAt?: true;
    usedAt?: true;
    attempts?: true;
    createdAt?: true;
};
export type VerificationCodeMaxAggregateInputType = {
    id?: true;
    userId?: true;
    codeHash?: true;
    expiresAt?: true;
    usedAt?: true;
    attempts?: true;
    createdAt?: true;
};
export type VerificationCodeCountAggregateInputType = {
    id?: true;
    userId?: true;
    codeHash?: true;
    expiresAt?: true;
    usedAt?: true;
    attempts?: true;
    createdAt?: true;
    _all?: true;
};
export type VerificationCodeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VerificationCodeWhereInput;
    orderBy?: Prisma.VerificationCodeOrderByWithRelationInput | Prisma.VerificationCodeOrderByWithRelationInput[];
    cursor?: Prisma.VerificationCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VerificationCodeCountAggregateInputType;
    _avg?: VerificationCodeAvgAggregateInputType;
    _sum?: VerificationCodeSumAggregateInputType;
    _min?: VerificationCodeMinAggregateInputType;
    _max?: VerificationCodeMaxAggregateInputType;
};
export type GetVerificationCodeAggregateType<T extends VerificationCodeAggregateArgs> = {
    [P in keyof T & keyof AggregateVerificationCode]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVerificationCode[P]> : Prisma.GetScalarType<T[P], AggregateVerificationCode[P]>;
};
export type VerificationCodeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VerificationCodeWhereInput;
    orderBy?: Prisma.VerificationCodeOrderByWithAggregationInput | Prisma.VerificationCodeOrderByWithAggregationInput[];
    by: Prisma.VerificationCodeScalarFieldEnum[] | Prisma.VerificationCodeScalarFieldEnum;
    having?: Prisma.VerificationCodeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VerificationCodeCountAggregateInputType | true;
    _avg?: VerificationCodeAvgAggregateInputType;
    _sum?: VerificationCodeSumAggregateInputType;
    _min?: VerificationCodeMinAggregateInputType;
    _max?: VerificationCodeMaxAggregateInputType;
};
export type VerificationCodeGroupByOutputType = {
    id: string;
    userId: string;
    codeHash: string;
    expiresAt: Date;
    usedAt: Date | null;
    attempts: number;
    createdAt: Date;
    _count: VerificationCodeCountAggregateOutputType | null;
    _avg: VerificationCodeAvgAggregateOutputType | null;
    _sum: VerificationCodeSumAggregateOutputType | null;
    _min: VerificationCodeMinAggregateOutputType | null;
    _max: VerificationCodeMaxAggregateOutputType | null;
};
export type GetVerificationCodeGroupByPayload<T extends VerificationCodeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VerificationCodeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VerificationCodeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VerificationCodeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VerificationCodeGroupByOutputType[P]>;
}>>;
export type VerificationCodeWhereInput = {
    AND?: Prisma.VerificationCodeWhereInput | Prisma.VerificationCodeWhereInput[];
    OR?: Prisma.VerificationCodeWhereInput[];
    NOT?: Prisma.VerificationCodeWhereInput | Prisma.VerificationCodeWhereInput[];
    id?: Prisma.UuidFilter<"VerificationCode"> | string;
    userId?: Prisma.UuidFilter<"VerificationCode"> | string;
    codeHash?: Prisma.StringFilter<"VerificationCode"> | string;
    expiresAt?: Prisma.DateTimeFilter<"VerificationCode"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"VerificationCode"> | Date | string | null;
    attempts?: Prisma.IntFilter<"VerificationCode"> | number;
    createdAt?: Prisma.DateTimeFilter<"VerificationCode"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type VerificationCodeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type VerificationCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.VerificationCodeWhereInput | Prisma.VerificationCodeWhereInput[];
    OR?: Prisma.VerificationCodeWhereInput[];
    NOT?: Prisma.VerificationCodeWhereInput | Prisma.VerificationCodeWhereInput[];
    userId?: Prisma.UuidFilter<"VerificationCode"> | string;
    codeHash?: Prisma.StringFilter<"VerificationCode"> | string;
    expiresAt?: Prisma.DateTimeFilter<"VerificationCode"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"VerificationCode"> | Date | string | null;
    attempts?: Prisma.IntFilter<"VerificationCode"> | number;
    createdAt?: Prisma.DateTimeFilter<"VerificationCode"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type VerificationCodeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.VerificationCodeCountOrderByAggregateInput;
    _avg?: Prisma.VerificationCodeAvgOrderByAggregateInput;
    _max?: Prisma.VerificationCodeMaxOrderByAggregateInput;
    _min?: Prisma.VerificationCodeMinOrderByAggregateInput;
    _sum?: Prisma.VerificationCodeSumOrderByAggregateInput;
};
export type VerificationCodeScalarWhereWithAggregatesInput = {
    AND?: Prisma.VerificationCodeScalarWhereWithAggregatesInput | Prisma.VerificationCodeScalarWhereWithAggregatesInput[];
    OR?: Prisma.VerificationCodeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VerificationCodeScalarWhereWithAggregatesInput | Prisma.VerificationCodeScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"VerificationCode"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"VerificationCode"> | string;
    codeHash?: Prisma.StringWithAggregatesFilter<"VerificationCode"> | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"VerificationCode"> | Date | string;
    usedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"VerificationCode"> | Date | string | null;
    attempts?: Prisma.IntWithAggregatesFilter<"VerificationCode"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"VerificationCode"> | Date | string;
};
export type VerificationCodeCreateInput = {
    id?: string;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    attempts?: number;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutVerificationCodesInput;
};
export type VerificationCodeUncheckedCreateInput = {
    id?: string;
    userId: string;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    attempts?: number;
    createdAt?: Date | string;
};
export type VerificationCodeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutVerificationCodesNestedInput;
};
export type VerificationCodeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationCodeCreateManyInput = {
    id?: string;
    userId: string;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    attempts?: number;
    createdAt?: Date | string;
};
export type VerificationCodeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationCodeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationCodeListRelationFilter = {
    every?: Prisma.VerificationCodeWhereInput;
    some?: Prisma.VerificationCodeWhereInput;
    none?: Prisma.VerificationCodeWhereInput;
};
export type VerificationCodeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VerificationCodeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type VerificationCodeAvgOrderByAggregateInput = {
    attempts?: Prisma.SortOrder;
};
export type VerificationCodeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type VerificationCodeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type VerificationCodeSumOrderByAggregateInput = {
    attempts?: Prisma.SortOrder;
};
export type VerificationCodeCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.VerificationCodeCreateWithoutUserInput, Prisma.VerificationCodeUncheckedCreateWithoutUserInput> | Prisma.VerificationCodeCreateWithoutUserInput[] | Prisma.VerificationCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VerificationCodeCreateOrConnectWithoutUserInput | Prisma.VerificationCodeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.VerificationCodeCreateManyUserInputEnvelope;
    connect?: Prisma.VerificationCodeWhereUniqueInput | Prisma.VerificationCodeWhereUniqueInput[];
};
export type VerificationCodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.VerificationCodeCreateWithoutUserInput, Prisma.VerificationCodeUncheckedCreateWithoutUserInput> | Prisma.VerificationCodeCreateWithoutUserInput[] | Prisma.VerificationCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VerificationCodeCreateOrConnectWithoutUserInput | Prisma.VerificationCodeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.VerificationCodeCreateManyUserInputEnvelope;
    connect?: Prisma.VerificationCodeWhereUniqueInput | Prisma.VerificationCodeWhereUniqueInput[];
};
export type VerificationCodeUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.VerificationCodeCreateWithoutUserInput, Prisma.VerificationCodeUncheckedCreateWithoutUserInput> | Prisma.VerificationCodeCreateWithoutUserInput[] | Prisma.VerificationCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VerificationCodeCreateOrConnectWithoutUserInput | Prisma.VerificationCodeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.VerificationCodeUpsertWithWhereUniqueWithoutUserInput | Prisma.VerificationCodeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.VerificationCodeCreateManyUserInputEnvelope;
    set?: Prisma.VerificationCodeWhereUniqueInput | Prisma.VerificationCodeWhereUniqueInput[];
    disconnect?: Prisma.VerificationCodeWhereUniqueInput | Prisma.VerificationCodeWhereUniqueInput[];
    delete?: Prisma.VerificationCodeWhereUniqueInput | Prisma.VerificationCodeWhereUniqueInput[];
    connect?: Prisma.VerificationCodeWhereUniqueInput | Prisma.VerificationCodeWhereUniqueInput[];
    update?: Prisma.VerificationCodeUpdateWithWhereUniqueWithoutUserInput | Prisma.VerificationCodeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.VerificationCodeUpdateManyWithWhereWithoutUserInput | Prisma.VerificationCodeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.VerificationCodeScalarWhereInput | Prisma.VerificationCodeScalarWhereInput[];
};
export type VerificationCodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.VerificationCodeCreateWithoutUserInput, Prisma.VerificationCodeUncheckedCreateWithoutUserInput> | Prisma.VerificationCodeCreateWithoutUserInput[] | Prisma.VerificationCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VerificationCodeCreateOrConnectWithoutUserInput | Prisma.VerificationCodeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.VerificationCodeUpsertWithWhereUniqueWithoutUserInput | Prisma.VerificationCodeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.VerificationCodeCreateManyUserInputEnvelope;
    set?: Prisma.VerificationCodeWhereUniqueInput | Prisma.VerificationCodeWhereUniqueInput[];
    disconnect?: Prisma.VerificationCodeWhereUniqueInput | Prisma.VerificationCodeWhereUniqueInput[];
    delete?: Prisma.VerificationCodeWhereUniqueInput | Prisma.VerificationCodeWhereUniqueInput[];
    connect?: Prisma.VerificationCodeWhereUniqueInput | Prisma.VerificationCodeWhereUniqueInput[];
    update?: Prisma.VerificationCodeUpdateWithWhereUniqueWithoutUserInput | Prisma.VerificationCodeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.VerificationCodeUpdateManyWithWhereWithoutUserInput | Prisma.VerificationCodeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.VerificationCodeScalarWhereInput | Prisma.VerificationCodeScalarWhereInput[];
};
export type VerificationCodeCreateWithoutUserInput = {
    id?: string;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    attempts?: number;
    createdAt?: Date | string;
};
export type VerificationCodeUncheckedCreateWithoutUserInput = {
    id?: string;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    attempts?: number;
    createdAt?: Date | string;
};
export type VerificationCodeCreateOrConnectWithoutUserInput = {
    where: Prisma.VerificationCodeWhereUniqueInput;
    create: Prisma.XOR<Prisma.VerificationCodeCreateWithoutUserInput, Prisma.VerificationCodeUncheckedCreateWithoutUserInput>;
};
export type VerificationCodeCreateManyUserInputEnvelope = {
    data: Prisma.VerificationCodeCreateManyUserInput | Prisma.VerificationCodeCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type VerificationCodeUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.VerificationCodeWhereUniqueInput;
    update: Prisma.XOR<Prisma.VerificationCodeUpdateWithoutUserInput, Prisma.VerificationCodeUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.VerificationCodeCreateWithoutUserInput, Prisma.VerificationCodeUncheckedCreateWithoutUserInput>;
};
export type VerificationCodeUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.VerificationCodeWhereUniqueInput;
    data: Prisma.XOR<Prisma.VerificationCodeUpdateWithoutUserInput, Prisma.VerificationCodeUncheckedUpdateWithoutUserInput>;
};
export type VerificationCodeUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.VerificationCodeScalarWhereInput;
    data: Prisma.XOR<Prisma.VerificationCodeUpdateManyMutationInput, Prisma.VerificationCodeUncheckedUpdateManyWithoutUserInput>;
};
export type VerificationCodeScalarWhereInput = {
    AND?: Prisma.VerificationCodeScalarWhereInput | Prisma.VerificationCodeScalarWhereInput[];
    OR?: Prisma.VerificationCodeScalarWhereInput[];
    NOT?: Prisma.VerificationCodeScalarWhereInput | Prisma.VerificationCodeScalarWhereInput[];
    id?: Prisma.UuidFilter<"VerificationCode"> | string;
    userId?: Prisma.UuidFilter<"VerificationCode"> | string;
    codeHash?: Prisma.StringFilter<"VerificationCode"> | string;
    expiresAt?: Prisma.DateTimeFilter<"VerificationCode"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"VerificationCode"> | Date | string | null;
    attempts?: Prisma.IntFilter<"VerificationCode"> | number;
    createdAt?: Prisma.DateTimeFilter<"VerificationCode"> | Date | string;
};
export type VerificationCodeCreateManyUserInput = {
    id?: string;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    attempts?: number;
    createdAt?: Date | string;
};
export type VerificationCodeUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationCodeUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationCodeUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationCodeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    attempts?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["verificationCode"]>;
export type VerificationCodeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    attempts?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["verificationCode"]>;
export type VerificationCodeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    attempts?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["verificationCode"]>;
export type VerificationCodeSelectScalar = {
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    attempts?: boolean;
    createdAt?: boolean;
};
export type VerificationCodeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "codeHash" | "expiresAt" | "usedAt" | "attempts" | "createdAt", ExtArgs["result"]["verificationCode"]>;
export type VerificationCodeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type VerificationCodeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type VerificationCodeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $VerificationCodePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VerificationCode";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        codeHash: string;
        expiresAt: Date;
        usedAt: Date | null;
        attempts: number;
        createdAt: Date;
    }, ExtArgs["result"]["verificationCode"]>;
    composites: {};
};
export type VerificationCodeGetPayload<S extends boolean | null | undefined | VerificationCodeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload, S>;
export type VerificationCodeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VerificationCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VerificationCodeCountAggregateInputType | true;
};
export interface VerificationCodeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VerificationCode'];
        meta: {
            name: 'VerificationCode';
        };
    };
    findUnique<T extends VerificationCodeFindUniqueArgs>(args: Prisma.SelectSubset<T, VerificationCodeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VerificationCodeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VerificationCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VerificationCodeFindFirstArgs>(args?: Prisma.SelectSubset<T, VerificationCodeFindFirstArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VerificationCodeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VerificationCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VerificationCodeFindManyArgs>(args?: Prisma.SelectSubset<T, VerificationCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VerificationCodeCreateArgs>(args: Prisma.SelectSubset<T, VerificationCodeCreateArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VerificationCodeCreateManyArgs>(args?: Prisma.SelectSubset<T, VerificationCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends VerificationCodeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VerificationCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends VerificationCodeDeleteArgs>(args: Prisma.SelectSubset<T, VerificationCodeDeleteArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VerificationCodeUpdateArgs>(args: Prisma.SelectSubset<T, VerificationCodeUpdateArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VerificationCodeDeleteManyArgs>(args?: Prisma.SelectSubset<T, VerificationCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VerificationCodeUpdateManyArgs>(args: Prisma.SelectSubset<T, VerificationCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends VerificationCodeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VerificationCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends VerificationCodeUpsertArgs>(args: Prisma.SelectSubset<T, VerificationCodeUpsertArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VerificationCodeCountArgs>(args?: Prisma.Subset<T, VerificationCodeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VerificationCodeCountAggregateOutputType> : number>;
    aggregate<T extends VerificationCodeAggregateArgs>(args: Prisma.Subset<T, VerificationCodeAggregateArgs>): Prisma.PrismaPromise<GetVerificationCodeAggregateType<T>>;
    groupBy<T extends VerificationCodeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VerificationCodeGroupByArgs['orderBy'];
    } : {
        orderBy?: VerificationCodeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VerificationCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VerificationCodeFieldRefs;
}
export interface Prisma__VerificationCodeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VerificationCodeFieldRefs {
    readonly id: Prisma.FieldRef<"VerificationCode", 'String'>;
    readonly userId: Prisma.FieldRef<"VerificationCode", 'String'>;
    readonly codeHash: Prisma.FieldRef<"VerificationCode", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"VerificationCode", 'DateTime'>;
    readonly usedAt: Prisma.FieldRef<"VerificationCode", 'DateTime'>;
    readonly attempts: Prisma.FieldRef<"VerificationCode", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"VerificationCode", 'DateTime'>;
}
export type VerificationCodeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    include?: Prisma.VerificationCodeInclude<ExtArgs> | null;
    where: Prisma.VerificationCodeWhereUniqueInput;
};
export type VerificationCodeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    include?: Prisma.VerificationCodeInclude<ExtArgs> | null;
    where: Prisma.VerificationCodeWhereUniqueInput;
};
export type VerificationCodeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    include?: Prisma.VerificationCodeInclude<ExtArgs> | null;
    where?: Prisma.VerificationCodeWhereInput;
    orderBy?: Prisma.VerificationCodeOrderByWithRelationInput | Prisma.VerificationCodeOrderByWithRelationInput[];
    cursor?: Prisma.VerificationCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VerificationCodeScalarFieldEnum | Prisma.VerificationCodeScalarFieldEnum[];
};
export type VerificationCodeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    include?: Prisma.VerificationCodeInclude<ExtArgs> | null;
    where?: Prisma.VerificationCodeWhereInput;
    orderBy?: Prisma.VerificationCodeOrderByWithRelationInput | Prisma.VerificationCodeOrderByWithRelationInput[];
    cursor?: Prisma.VerificationCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VerificationCodeScalarFieldEnum | Prisma.VerificationCodeScalarFieldEnum[];
};
export type VerificationCodeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    include?: Prisma.VerificationCodeInclude<ExtArgs> | null;
    where?: Prisma.VerificationCodeWhereInput;
    orderBy?: Prisma.VerificationCodeOrderByWithRelationInput | Prisma.VerificationCodeOrderByWithRelationInput[];
    cursor?: Prisma.VerificationCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VerificationCodeScalarFieldEnum | Prisma.VerificationCodeScalarFieldEnum[];
};
export type VerificationCodeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    include?: Prisma.VerificationCodeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VerificationCodeCreateInput, Prisma.VerificationCodeUncheckedCreateInput>;
};
export type VerificationCodeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VerificationCodeCreateManyInput | Prisma.VerificationCodeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VerificationCodeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    data: Prisma.VerificationCodeCreateManyInput | Prisma.VerificationCodeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.VerificationCodeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type VerificationCodeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    include?: Prisma.VerificationCodeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VerificationCodeUpdateInput, Prisma.VerificationCodeUncheckedUpdateInput>;
    where: Prisma.VerificationCodeWhereUniqueInput;
};
export type VerificationCodeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VerificationCodeUpdateManyMutationInput, Prisma.VerificationCodeUncheckedUpdateManyInput>;
    where?: Prisma.VerificationCodeWhereInput;
    limit?: number;
};
export type VerificationCodeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VerificationCodeUpdateManyMutationInput, Prisma.VerificationCodeUncheckedUpdateManyInput>;
    where?: Prisma.VerificationCodeWhereInput;
    limit?: number;
    include?: Prisma.VerificationCodeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type VerificationCodeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    include?: Prisma.VerificationCodeInclude<ExtArgs> | null;
    where: Prisma.VerificationCodeWhereUniqueInput;
    create: Prisma.XOR<Prisma.VerificationCodeCreateInput, Prisma.VerificationCodeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VerificationCodeUpdateInput, Prisma.VerificationCodeUncheckedUpdateInput>;
};
export type VerificationCodeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    include?: Prisma.VerificationCodeInclude<ExtArgs> | null;
    where: Prisma.VerificationCodeWhereUniqueInput;
};
export type VerificationCodeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VerificationCodeWhereInput;
    limit?: number;
};
export type VerificationCodeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    include?: Prisma.VerificationCodeInclude<ExtArgs> | null;
};
//# sourceMappingURL=VerificationCode.d.ts.map
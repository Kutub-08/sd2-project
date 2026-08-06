import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type AiSearchLogModel = runtime.Types.Result.DefaultSelection<Prisma.$AiSearchLogPayload>;
export type AggregateAiSearchLog = {
    _count: AiSearchLogCountAggregateOutputType | null;
    _min: AiSearchLogMinAggregateOutputType | null;
    _max: AiSearchLogMaxAggregateOutputType | null;
};
export type AiSearchLogMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    queryText: string | null;
    createdAt: Date | null;
};
export type AiSearchLogMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    queryText: string | null;
    createdAt: Date | null;
};
export type AiSearchLogCountAggregateOutputType = {
    id: number;
    userId: number;
    queryText: number;
    parsedFilters: number;
    createdAt: number;
    _all: number;
};
export type AiSearchLogMinAggregateInputType = {
    id?: true;
    userId?: true;
    queryText?: true;
    createdAt?: true;
};
export type AiSearchLogMaxAggregateInputType = {
    id?: true;
    userId?: true;
    queryText?: true;
    createdAt?: true;
};
export type AiSearchLogCountAggregateInputType = {
    id?: true;
    userId?: true;
    queryText?: true;
    parsedFilters?: true;
    createdAt?: true;
    _all?: true;
};
export type AiSearchLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AiSearchLogWhereInput;
    orderBy?: Prisma.AiSearchLogOrderByWithRelationInput | Prisma.AiSearchLogOrderByWithRelationInput[];
    cursor?: Prisma.AiSearchLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AiSearchLogCountAggregateInputType;
    _min?: AiSearchLogMinAggregateInputType;
    _max?: AiSearchLogMaxAggregateInputType;
};
export type GetAiSearchLogAggregateType<T extends AiSearchLogAggregateArgs> = {
    [P in keyof T & keyof AggregateAiSearchLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAiSearchLog[P]> : Prisma.GetScalarType<T[P], AggregateAiSearchLog[P]>;
};
export type AiSearchLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AiSearchLogWhereInput;
    orderBy?: Prisma.AiSearchLogOrderByWithAggregationInput | Prisma.AiSearchLogOrderByWithAggregationInput[];
    by: Prisma.AiSearchLogScalarFieldEnum[] | Prisma.AiSearchLogScalarFieldEnum;
    having?: Prisma.AiSearchLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AiSearchLogCountAggregateInputType | true;
    _min?: AiSearchLogMinAggregateInputType;
    _max?: AiSearchLogMaxAggregateInputType;
};
export type AiSearchLogGroupByOutputType = {
    id: string;
    userId: string | null;
    queryText: string;
    parsedFilters: runtime.JsonValue;
    createdAt: Date;
    _count: AiSearchLogCountAggregateOutputType | null;
    _min: AiSearchLogMinAggregateOutputType | null;
    _max: AiSearchLogMaxAggregateOutputType | null;
};
export type GetAiSearchLogGroupByPayload<T extends AiSearchLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AiSearchLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AiSearchLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AiSearchLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AiSearchLogGroupByOutputType[P]>;
}>>;
export type AiSearchLogWhereInput = {
    AND?: Prisma.AiSearchLogWhereInput | Prisma.AiSearchLogWhereInput[];
    OR?: Prisma.AiSearchLogWhereInput[];
    NOT?: Prisma.AiSearchLogWhereInput | Prisma.AiSearchLogWhereInput[];
    id?: Prisma.UuidFilter<"AiSearchLog"> | string;
    userId?: Prisma.UuidNullableFilter<"AiSearchLog"> | string | null;
    queryText?: Prisma.StringFilter<"AiSearchLog"> | string;
    parsedFilters?: Prisma.JsonFilter<"AiSearchLog">;
    createdAt?: Prisma.DateTimeFilter<"AiSearchLog"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type AiSearchLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    queryText?: Prisma.SortOrder;
    parsedFilters?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type AiSearchLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AiSearchLogWhereInput | Prisma.AiSearchLogWhereInput[];
    OR?: Prisma.AiSearchLogWhereInput[];
    NOT?: Prisma.AiSearchLogWhereInput | Prisma.AiSearchLogWhereInput[];
    userId?: Prisma.UuidNullableFilter<"AiSearchLog"> | string | null;
    queryText?: Prisma.StringFilter<"AiSearchLog"> | string;
    parsedFilters?: Prisma.JsonFilter<"AiSearchLog">;
    createdAt?: Prisma.DateTimeFilter<"AiSearchLog"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type AiSearchLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    queryText?: Prisma.SortOrder;
    parsedFilters?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AiSearchLogCountOrderByAggregateInput;
    _max?: Prisma.AiSearchLogMaxOrderByAggregateInput;
    _min?: Prisma.AiSearchLogMinOrderByAggregateInput;
};
export type AiSearchLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.AiSearchLogScalarWhereWithAggregatesInput | Prisma.AiSearchLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.AiSearchLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AiSearchLogScalarWhereWithAggregatesInput | Prisma.AiSearchLogScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"AiSearchLog"> | string;
    userId?: Prisma.UuidNullableWithAggregatesFilter<"AiSearchLog"> | string | null;
    queryText?: Prisma.StringWithAggregatesFilter<"AiSearchLog"> | string;
    parsedFilters?: Prisma.JsonWithAggregatesFilter<"AiSearchLog">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AiSearchLog"> | Date | string;
};
export type AiSearchLogCreateInput = {
    id?: string;
    queryText: string;
    parsedFilters: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutAiSearchLogsInput;
};
export type AiSearchLogUncheckedCreateInput = {
    id?: string;
    userId?: string | null;
    queryText: string;
    parsedFilters: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AiSearchLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queryText?: Prisma.StringFieldUpdateOperationsInput | string;
    parsedFilters?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutAiSearchLogsNestedInput;
};
export type AiSearchLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    queryText?: Prisma.StringFieldUpdateOperationsInput | string;
    parsedFilters?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiSearchLogCreateManyInput = {
    id?: string;
    userId?: string | null;
    queryText: string;
    parsedFilters: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AiSearchLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queryText?: Prisma.StringFieldUpdateOperationsInput | string;
    parsedFilters?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiSearchLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    queryText?: Prisma.StringFieldUpdateOperationsInput | string;
    parsedFilters?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiSearchLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    queryText?: Prisma.SortOrder;
    parsedFilters?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AiSearchLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    queryText?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AiSearchLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    queryText?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AiSearchLogListRelationFilter = {
    every?: Prisma.AiSearchLogWhereInput;
    some?: Prisma.AiSearchLogWhereInput;
    none?: Prisma.AiSearchLogWhereInput;
};
export type AiSearchLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type AiSearchLogCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AiSearchLogCreateWithoutUserInput, Prisma.AiSearchLogUncheckedCreateWithoutUserInput> | Prisma.AiSearchLogCreateWithoutUserInput[] | Prisma.AiSearchLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AiSearchLogCreateOrConnectWithoutUserInput | Prisma.AiSearchLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AiSearchLogCreateManyUserInputEnvelope;
    connect?: Prisma.AiSearchLogWhereUniqueInput | Prisma.AiSearchLogWhereUniqueInput[];
};
export type AiSearchLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AiSearchLogCreateWithoutUserInput, Prisma.AiSearchLogUncheckedCreateWithoutUserInput> | Prisma.AiSearchLogCreateWithoutUserInput[] | Prisma.AiSearchLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AiSearchLogCreateOrConnectWithoutUserInput | Prisma.AiSearchLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AiSearchLogCreateManyUserInputEnvelope;
    connect?: Prisma.AiSearchLogWhereUniqueInput | Prisma.AiSearchLogWhereUniqueInput[];
};
export type AiSearchLogUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AiSearchLogCreateWithoutUserInput, Prisma.AiSearchLogUncheckedCreateWithoutUserInput> | Prisma.AiSearchLogCreateWithoutUserInput[] | Prisma.AiSearchLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AiSearchLogCreateOrConnectWithoutUserInput | Prisma.AiSearchLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AiSearchLogUpsertWithWhereUniqueWithoutUserInput | Prisma.AiSearchLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AiSearchLogCreateManyUserInputEnvelope;
    set?: Prisma.AiSearchLogWhereUniqueInput | Prisma.AiSearchLogWhereUniqueInput[];
    disconnect?: Prisma.AiSearchLogWhereUniqueInput | Prisma.AiSearchLogWhereUniqueInput[];
    delete?: Prisma.AiSearchLogWhereUniqueInput | Prisma.AiSearchLogWhereUniqueInput[];
    connect?: Prisma.AiSearchLogWhereUniqueInput | Prisma.AiSearchLogWhereUniqueInput[];
    update?: Prisma.AiSearchLogUpdateWithWhereUniqueWithoutUserInput | Prisma.AiSearchLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AiSearchLogUpdateManyWithWhereWithoutUserInput | Prisma.AiSearchLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AiSearchLogScalarWhereInput | Prisma.AiSearchLogScalarWhereInput[];
};
export type AiSearchLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AiSearchLogCreateWithoutUserInput, Prisma.AiSearchLogUncheckedCreateWithoutUserInput> | Prisma.AiSearchLogCreateWithoutUserInput[] | Prisma.AiSearchLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AiSearchLogCreateOrConnectWithoutUserInput | Prisma.AiSearchLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AiSearchLogUpsertWithWhereUniqueWithoutUserInput | Prisma.AiSearchLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AiSearchLogCreateManyUserInputEnvelope;
    set?: Prisma.AiSearchLogWhereUniqueInput | Prisma.AiSearchLogWhereUniqueInput[];
    disconnect?: Prisma.AiSearchLogWhereUniqueInput | Prisma.AiSearchLogWhereUniqueInput[];
    delete?: Prisma.AiSearchLogWhereUniqueInput | Prisma.AiSearchLogWhereUniqueInput[];
    connect?: Prisma.AiSearchLogWhereUniqueInput | Prisma.AiSearchLogWhereUniqueInput[];
    update?: Prisma.AiSearchLogUpdateWithWhereUniqueWithoutUserInput | Prisma.AiSearchLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AiSearchLogUpdateManyWithWhereWithoutUserInput | Prisma.AiSearchLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AiSearchLogScalarWhereInput | Prisma.AiSearchLogScalarWhereInput[];
};
export type AiSearchLogCreateWithoutUserInput = {
    id?: string;
    queryText: string;
    parsedFilters: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AiSearchLogUncheckedCreateWithoutUserInput = {
    id?: string;
    queryText: string;
    parsedFilters: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AiSearchLogCreateOrConnectWithoutUserInput = {
    where: Prisma.AiSearchLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AiSearchLogCreateWithoutUserInput, Prisma.AiSearchLogUncheckedCreateWithoutUserInput>;
};
export type AiSearchLogCreateManyUserInputEnvelope = {
    data: Prisma.AiSearchLogCreateManyUserInput | Prisma.AiSearchLogCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type AiSearchLogUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.AiSearchLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.AiSearchLogUpdateWithoutUserInput, Prisma.AiSearchLogUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AiSearchLogCreateWithoutUserInput, Prisma.AiSearchLogUncheckedCreateWithoutUserInput>;
};
export type AiSearchLogUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.AiSearchLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.AiSearchLogUpdateWithoutUserInput, Prisma.AiSearchLogUncheckedUpdateWithoutUserInput>;
};
export type AiSearchLogUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.AiSearchLogScalarWhereInput;
    data: Prisma.XOR<Prisma.AiSearchLogUpdateManyMutationInput, Prisma.AiSearchLogUncheckedUpdateManyWithoutUserInput>;
};
export type AiSearchLogScalarWhereInput = {
    AND?: Prisma.AiSearchLogScalarWhereInput | Prisma.AiSearchLogScalarWhereInput[];
    OR?: Prisma.AiSearchLogScalarWhereInput[];
    NOT?: Prisma.AiSearchLogScalarWhereInput | Prisma.AiSearchLogScalarWhereInput[];
    id?: Prisma.UuidFilter<"AiSearchLog"> | string;
    userId?: Prisma.UuidNullableFilter<"AiSearchLog"> | string | null;
    queryText?: Prisma.StringFilter<"AiSearchLog"> | string;
    parsedFilters?: Prisma.JsonFilter<"AiSearchLog">;
    createdAt?: Prisma.DateTimeFilter<"AiSearchLog"> | Date | string;
};
export type AiSearchLogCreateManyUserInput = {
    id?: string;
    queryText: string;
    parsedFilters: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AiSearchLogUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queryText?: Prisma.StringFieldUpdateOperationsInput | string;
    parsedFilters?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiSearchLogUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queryText?: Prisma.StringFieldUpdateOperationsInput | string;
    parsedFilters?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiSearchLogUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queryText?: Prisma.StringFieldUpdateOperationsInput | string;
    parsedFilters?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiSearchLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    queryText?: boolean;
    parsedFilters?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.AiSearchLog$userArgs<ExtArgs>;
}, ExtArgs["result"]["aiSearchLog"]>;
export type AiSearchLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    queryText?: boolean;
    parsedFilters?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.AiSearchLog$userArgs<ExtArgs>;
}, ExtArgs["result"]["aiSearchLog"]>;
export type AiSearchLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    queryText?: boolean;
    parsedFilters?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.AiSearchLog$userArgs<ExtArgs>;
}, ExtArgs["result"]["aiSearchLog"]>;
export type AiSearchLogSelectScalar = {
    id?: boolean;
    userId?: boolean;
    queryText?: boolean;
    parsedFilters?: boolean;
    createdAt?: boolean;
};
export type AiSearchLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "queryText" | "parsedFilters" | "createdAt", ExtArgs["result"]["aiSearchLog"]>;
export type AiSearchLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.AiSearchLog$userArgs<ExtArgs>;
};
export type AiSearchLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.AiSearchLog$userArgs<ExtArgs>;
};
export type AiSearchLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.AiSearchLog$userArgs<ExtArgs>;
};
export type $AiSearchLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AiSearchLog";
    objects: {
        user: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string | null;
        queryText: string;
        parsedFilters: runtime.JsonValue;
        createdAt: Date;
    }, ExtArgs["result"]["aiSearchLog"]>;
    composites: {};
};
export type AiSearchLogGetPayload<S extends boolean | null | undefined | AiSearchLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AiSearchLogPayload, S>;
export type AiSearchLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AiSearchLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AiSearchLogCountAggregateInputType | true;
};
export interface AiSearchLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AiSearchLog'];
        meta: {
            name: 'AiSearchLog';
        };
    };
    findUnique<T extends AiSearchLogFindUniqueArgs>(args: Prisma.SelectSubset<T, AiSearchLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AiSearchLogClient<runtime.Types.Result.GetResult<Prisma.$AiSearchLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AiSearchLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AiSearchLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AiSearchLogClient<runtime.Types.Result.GetResult<Prisma.$AiSearchLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AiSearchLogFindFirstArgs>(args?: Prisma.SelectSubset<T, AiSearchLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__AiSearchLogClient<runtime.Types.Result.GetResult<Prisma.$AiSearchLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AiSearchLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AiSearchLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AiSearchLogClient<runtime.Types.Result.GetResult<Prisma.$AiSearchLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AiSearchLogFindManyArgs>(args?: Prisma.SelectSubset<T, AiSearchLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AiSearchLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AiSearchLogCreateArgs>(args: Prisma.SelectSubset<T, AiSearchLogCreateArgs<ExtArgs>>): Prisma.Prisma__AiSearchLogClient<runtime.Types.Result.GetResult<Prisma.$AiSearchLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AiSearchLogCreateManyArgs>(args?: Prisma.SelectSubset<T, AiSearchLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AiSearchLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AiSearchLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AiSearchLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AiSearchLogDeleteArgs>(args: Prisma.SelectSubset<T, AiSearchLogDeleteArgs<ExtArgs>>): Prisma.Prisma__AiSearchLogClient<runtime.Types.Result.GetResult<Prisma.$AiSearchLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AiSearchLogUpdateArgs>(args: Prisma.SelectSubset<T, AiSearchLogUpdateArgs<ExtArgs>>): Prisma.Prisma__AiSearchLogClient<runtime.Types.Result.GetResult<Prisma.$AiSearchLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AiSearchLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, AiSearchLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AiSearchLogUpdateManyArgs>(args: Prisma.SelectSubset<T, AiSearchLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AiSearchLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AiSearchLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AiSearchLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AiSearchLogUpsertArgs>(args: Prisma.SelectSubset<T, AiSearchLogUpsertArgs<ExtArgs>>): Prisma.Prisma__AiSearchLogClient<runtime.Types.Result.GetResult<Prisma.$AiSearchLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AiSearchLogCountArgs>(args?: Prisma.Subset<T, AiSearchLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AiSearchLogCountAggregateOutputType> : number>;
    aggregate<T extends AiSearchLogAggregateArgs>(args: Prisma.Subset<T, AiSearchLogAggregateArgs>): Prisma.PrismaPromise<GetAiSearchLogAggregateType<T>>;
    groupBy<T extends AiSearchLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AiSearchLogGroupByArgs['orderBy'];
    } : {
        orderBy?: AiSearchLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AiSearchLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiSearchLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AiSearchLogFieldRefs;
}
export interface Prisma__AiSearchLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.AiSearchLog$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AiSearchLog$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AiSearchLogFieldRefs {
    readonly id: Prisma.FieldRef<"AiSearchLog", 'String'>;
    readonly userId: Prisma.FieldRef<"AiSearchLog", 'String'>;
    readonly queryText: Prisma.FieldRef<"AiSearchLog", 'String'>;
    readonly parsedFilters: Prisma.FieldRef<"AiSearchLog", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"AiSearchLog", 'DateTime'>;
}
export type AiSearchLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSearchLogSelect<ExtArgs> | null;
    omit?: Prisma.AiSearchLogOmit<ExtArgs> | null;
    include?: Prisma.AiSearchLogInclude<ExtArgs> | null;
    where: Prisma.AiSearchLogWhereUniqueInput;
};
export type AiSearchLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSearchLogSelect<ExtArgs> | null;
    omit?: Prisma.AiSearchLogOmit<ExtArgs> | null;
    include?: Prisma.AiSearchLogInclude<ExtArgs> | null;
    where: Prisma.AiSearchLogWhereUniqueInput;
};
export type AiSearchLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AiSearchLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AiSearchLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AiSearchLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSearchLogSelect<ExtArgs> | null;
    omit?: Prisma.AiSearchLogOmit<ExtArgs> | null;
    include?: Prisma.AiSearchLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AiSearchLogCreateInput, Prisma.AiSearchLogUncheckedCreateInput>;
};
export type AiSearchLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AiSearchLogCreateManyInput | Prisma.AiSearchLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AiSearchLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSearchLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AiSearchLogOmit<ExtArgs> | null;
    data: Prisma.AiSearchLogCreateManyInput | Prisma.AiSearchLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AiSearchLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AiSearchLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSearchLogSelect<ExtArgs> | null;
    omit?: Prisma.AiSearchLogOmit<ExtArgs> | null;
    include?: Prisma.AiSearchLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AiSearchLogUpdateInput, Prisma.AiSearchLogUncheckedUpdateInput>;
    where: Prisma.AiSearchLogWhereUniqueInput;
};
export type AiSearchLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AiSearchLogUpdateManyMutationInput, Prisma.AiSearchLogUncheckedUpdateManyInput>;
    where?: Prisma.AiSearchLogWhereInput;
    limit?: number;
};
export type AiSearchLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSearchLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AiSearchLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AiSearchLogUpdateManyMutationInput, Prisma.AiSearchLogUncheckedUpdateManyInput>;
    where?: Prisma.AiSearchLogWhereInput;
    limit?: number;
    include?: Prisma.AiSearchLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AiSearchLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSearchLogSelect<ExtArgs> | null;
    omit?: Prisma.AiSearchLogOmit<ExtArgs> | null;
    include?: Prisma.AiSearchLogInclude<ExtArgs> | null;
    where: Prisma.AiSearchLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AiSearchLogCreateInput, Prisma.AiSearchLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AiSearchLogUpdateInput, Prisma.AiSearchLogUncheckedUpdateInput>;
};
export type AiSearchLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSearchLogSelect<ExtArgs> | null;
    omit?: Prisma.AiSearchLogOmit<ExtArgs> | null;
    include?: Prisma.AiSearchLogInclude<ExtArgs> | null;
    where: Prisma.AiSearchLogWhereUniqueInput;
};
export type AiSearchLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AiSearchLogWhereInput;
    limit?: number;
};
export type AiSearchLog$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type AiSearchLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSearchLogSelect<ExtArgs> | null;
    omit?: Prisma.AiSearchLogOmit<ExtArgs> | null;
    include?: Prisma.AiSearchLogInclude<ExtArgs> | null;
};
//# sourceMappingURL=AiSearchLog.d.ts.map
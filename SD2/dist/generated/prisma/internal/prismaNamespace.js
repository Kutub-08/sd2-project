import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "7.9.1",
    engine: "e922089b7d7502aff4249d5da3420f6fa55fc6ad"
};
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    AiSearchLog: 'AiSearchLog',
    Favorite: 'Favorite',
    Inquiry: 'Inquiry',
    Listing: 'Listing',
    ListingImage: 'ListingImage',
    PasswordResetToken: 'PasswordResetToken',
    RefreshToken: 'RefreshToken',
    Review: 'Review',
    User: 'User'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const AiSearchLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    queryText: 'queryText',
    parsedFilters: 'parsedFilters',
    createdAt: 'createdAt'
};
export const FavoriteScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    listingId: 'listingId',
    createdAt: 'createdAt'
};
export const InquiryScalarFieldEnum = {
    id: 'id',
    listingId: 'listingId',
    tenantId: 'tenantId',
    message: 'message',
    status: 'status',
    createdAt: 'createdAt'
};
export const ListingScalarFieldEnum = {
    id: 'id',
    landlordId: 'landlordId',
    title: 'title',
    description: 'description',
    price: 'price',
    sizeSqft: 'sizeSqft',
    bedrooms: 'bedrooms',
    bathrooms: 'bathrooms',
    floorNumber: 'floorNumber',
    address: 'address',
    area: 'area',
    city: 'city',
    latitude: 'latitude',
    longitude: 'longitude',
    amenities: 'amenities',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ListingImageScalarFieldEnum = {
    id: 'id',
    listingId: 'listingId',
    imageUrl: 'imageUrl',
    isPrimary: 'isPrimary',
    orderIndex: 'orderIndex'
};
export const PasswordResetTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt'
};
export const RefreshTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    revoked: 'revoked'
};
export const ReviewScalarFieldEnum = {
    id: 'id',
    listingId: 'listingId',
    tenantId: 'tenantId',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt'
};
export const UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    passwordHash: 'passwordHash',
    role: 'role',
    isVerified: 'isVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const JsonNullValueInput = {
    JsonNull: JsonNull
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const JsonNullValueFilter = {
    DbNull: DbNull,
    JsonNull: JsonNull,
    AnyNull: AnyNull
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map
export declare const UserRole: {
    readonly TENANT: "TENANT";
    readonly LANDLORD: "LANDLORD";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const ListingStatus: {
    readonly AVAILABLE: "AVAILABLE";
    readonly RENTED: "RENTED";
    readonly INACTIVE: "INACTIVE";
};
export type ListingStatus = (typeof ListingStatus)[keyof typeof ListingStatus];
export declare const InquiryStatus: {
    readonly PENDING: "PENDING";
    readonly RESPONDED: "RESPONDED";
    readonly CLOSED: "CLOSED";
};
export type InquiryStatus = (typeof InquiryStatus)[keyof typeof InquiryStatus];
//# sourceMappingURL=enums.d.ts.map
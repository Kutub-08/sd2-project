export declare function upload(listingId: string, file: Express.Multer.File): Promise<{
    id: string;
    listingId: string;
    imageUrl: string;
    isPrimary: boolean;
    orderIndex: number;
}>;
export declare function remove(listingId: string, imageId: string): Promise<void>;
//# sourceMappingURL=image.service.d.ts.map
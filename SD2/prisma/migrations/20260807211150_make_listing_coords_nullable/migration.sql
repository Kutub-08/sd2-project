-- Make listing coordinates optional (historical/edge listings may lack geo data)
ALTER TABLE "listings" ALTER COLUMN "latitude" DROP NOT NULL;
ALTER TABLE "listings" ALTER COLUMN "longitude" DROP NOT NULL;
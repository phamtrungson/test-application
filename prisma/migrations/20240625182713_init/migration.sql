-- CreateTable
CREATE TABLE "Buyer" (
    "id" VARCHAR(64) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Buyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" VARCHAR(64) NOT NULL,
    "buyerId" VARCHAR(64) NOT NULL,
    "note" VARCHAR(1024),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" VARCHAR(64) NOT NULL,
    "productName" VARCHAR(255) NOT NULL,
    "productId" VARCHAR(64) NOT NULL,
    "oderId" VARCHAR(64) NOT NULL,
    "unitPrice" DECIMAL(65,30) NOT NULL,
    "units" INTEGER NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_oderId_fkey" FOREIGN KEY ("oderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

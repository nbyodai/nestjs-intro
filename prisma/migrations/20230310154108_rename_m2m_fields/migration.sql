-- DropIndex
DROP INDEX "coffee_flavors_flavor_coffeeId_idx";

-- DropIndex
DROP INDEX "coffee_flavors_flavor_flavorId_idx";

-- DropIndex
DROP INDEX "event_name_idx";

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- RenameForeignKey
ALTER TABLE "coffee_flavors_flavor" RENAME CONSTRAINT "FK_25642975c6f620d570c635f418d" TO "coffee_flavors_flavor_flavorId_fkey";

-- RenameForeignKey
ALTER TABLE "coffee_flavors_flavor" RENAME CONSTRAINT "FK_9cb98a3799afc95cf71fdb1c4f9" TO "coffee_flavors_flavor_coffeeId_fkey";

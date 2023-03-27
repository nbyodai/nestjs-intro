-- CreateTable
CREATE TABLE "coffee" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "brand" VARCHAR NOT NULL,
    "recommendations" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "coffee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coffee_flavors_flavor" (
    "coffeeId" INTEGER NOT NULL,
    "flavorId" INTEGER NOT NULL,

    CONSTRAINT "coffee_flavors_flavor_pkey" PRIMARY KEY ("coffeeId","flavorId")
);

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "payload" JSON NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flavor" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "flavor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "coffee_flavors_flavor_flavorId_idx" ON "coffee_flavors_flavor"("flavorId");

-- CreateIndex
CREATE INDEX "coffee_flavors_flavor_coffeeId_idx" ON "coffee_flavors_flavor"("coffeeId");

-- CreateIndex
CREATE INDEX "event_name_idx" ON "event"("name");

-- AddForeignKey
ALTER TABLE "coffee_flavors_flavor" ADD CONSTRAINT "FK_25642975c6f620d570c635f418d" FOREIGN KEY ("flavorId") REFERENCES "flavor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "coffee_flavors_flavor" ADD CONSTRAINT "FK_9cb98a3799afc95cf71fdb1c4f9" FOREIGN KEY ("coffeeId") REFERENCES "coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

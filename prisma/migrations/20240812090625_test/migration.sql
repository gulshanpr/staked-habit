-- CreateTable
CREATE TABLE "Received" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "timeStamp" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Received_index_key" ON "Received"("index");

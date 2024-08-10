-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Received" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "timeStamp" TEXT NOT NULL,
    "habitId" INTEGER NOT NULL,

    CONSTRAINT "Received_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habit" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "endDate" INTEGER NOT NULL,
    "locs" INTEGER NOT NULL,
    "commits" INTEGER NOT NULL,
    "streak" BOOLEAN[],
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isHabitCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unstack" (
    "id" SERIAL NOT NULL,
    "index" INTEGER NOT NULL,
    "habitId" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "withdrawn" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Unstack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Received_habitId_key" ON "Received"("habitId");

-- CreateIndex
CREATE UNIQUE INDEX "Habit_index_key" ON "Habit"("index");

-- CreateIndex
CREATE UNIQUE INDEX "Unstack_habitId_key" ON "Unstack"("habitId");

-- AddForeignKey
ALTER TABLE "Received" ADD CONSTRAINT "Received_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_address_fkey" FOREIGN KEY ("address") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unstack" ADD CONSTRAINT "Unstack_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

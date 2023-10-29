-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "discount_price" INTEGER NOT NULL,
    "totalValue" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "signature" (
    "plain_id" TEXT NOT NULL,
    "plain_name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "discount_price" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "signature_pkey" PRIMARY KEY ("plain_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_email_key" ON "profile"("email");

-- AddForeignKey
ALTER TABLE "signature" ADD CONSTRAINT "signature_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

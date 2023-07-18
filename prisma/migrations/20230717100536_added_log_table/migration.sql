-- CreateTable
CREATE TABLE "log" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,
    "subject" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_provider" TEXT NOT NULL,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

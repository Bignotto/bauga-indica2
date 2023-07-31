-- CreateTable
CREATE TABLE "contract" (
    "id" SERIAL NOT NULL,
    "contract_status" TEXT NOT NULL DEFAULT 'open',
    "value" INTEGER NOT NULL,
    "service_id" TEXT NOT NULL,
    "user_provider_id" TEXT NOT NULL,
    "user_contractor_id" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" TIMESTAMP(3) NOT NULL,
    "execution_date" TIMESTAMP(3) NOT NULL,
    "closing_date" TIMESTAMP(3) NOT NULL,
    "service_provided" BOOLEAN NOT NULL,
    "service_reviewd" BOOLEAN NOT NULL,
    "provider_agreed" BOOLEAN NOT NULL,
    "contractor_agreed" BOOLEAN NOT NULL,

    CONSTRAINT "contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "contractId" INTEGER NOT NULL,
    "userFromId" TEXT NOT NULL,
    "messageDate" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "messageRead" BOOLEAN NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "contractId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "reviewDate" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_user_provider_id_fkey" FOREIGN KEY ("user_provider_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_user_contractor_id_fkey" FOREIGN KEY ("user_contractor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_userFromId_fkey" FOREIGN KEY ("userFromId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

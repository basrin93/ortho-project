-- CreateTable
CREATE TABLE "Presentation" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,

    CONSTRAINT "Presentation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Presentation" ADD CONSTRAINT "Presentation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

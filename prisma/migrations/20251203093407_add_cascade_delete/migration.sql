-- DropForeignKey
ALTER TABLE "CBCTFile" DROP CONSTRAINT "CBCTFile_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_treatmentPlanId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_visitId_fkey";

-- DropForeignKey
ALTER TABLE "Presentation" DROP CONSTRAINT "Presentation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "TreatmentPlan" DROP CONSTRAINT "TreatmentPlan_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_patientId_fkey";

-- AddForeignKey
ALTER TABLE "TreatmentPlan" ADD CONSTRAINT "TreatmentPlan_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_treatmentPlanId_fkey" FOREIGN KEY ("treatmentPlanId") REFERENCES "TreatmentPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CBCTFile" ADD CONSTRAINT "CBCTFile_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presentation" ADD CONSTRAINT "Presentation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

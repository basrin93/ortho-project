import { Module } from '@nestjs/common';
import { TreatmentController } from './treatment.controller.js';
import { TreatmentService } from './treatment.service.js';

@Module({
  imports: [],
  controllers: [TreatmentController],
  providers: [TreatmentService],
})
export class TreatmentModule {}

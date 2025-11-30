import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller.js';
import { PatientsService } from './patients.service.js';
import { FilesModule } from '../files/files.module.js';

@Module({
  imports: [FilesModule],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}

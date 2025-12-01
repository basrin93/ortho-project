import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma.module.js';
import { PatientsModule } from './patients/patients.module.js';
import { TreatmentModule } from './treatment/treatment.module.js';
import { VisitsModule } from './visits/visits.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    PatientsModule,
    PrismaModule,
    TreatmentModule,
    VisitsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

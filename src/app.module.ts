import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { PatientsModule } from './patients/patients.module';
import { TreatmentModule } from './treatment/treatment.module';
import { VisitsModule } from './visits/visits.module';

@Module({
  imports: [PatientsModule, PrismaModule, TreatmentModule, VisitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

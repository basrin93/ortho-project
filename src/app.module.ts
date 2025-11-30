import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { PatientsModule } from './patients/patients.module';
import { TreatmentModule } from './treatment/treatment.module';

@Module({
  imports: [PatientsModule, PrismaModule, TreatmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

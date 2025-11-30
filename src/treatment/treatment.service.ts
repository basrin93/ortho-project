import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';

@Injectable()
export class TreatmentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTreatmentDto) {
    return await this.prisma.treatmentPlan.create({
      data: {
        patientId: dto.patientId,
        diagnosis: dto.diagnosis,
        apparatusType: dto.apparatusType,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        isActive: dto.isActive,
      },
    });
  }

  async findAll() {
    return await this.prisma.treatmentPlan.findMany();
  }
}

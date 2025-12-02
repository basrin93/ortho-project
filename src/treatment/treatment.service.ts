import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateTreatmentDto } from './dto/create-treatment.dto.js';

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

  async findAll(userId: string) {
    return await this.prisma.treatmentPlan.findMany({
      where: {
        patient: {
          userId,
        },
      },
      include: {
        patient: true,
      },
    });
  }

  async update(id: string, dto: Partial<CreateTreatmentDto>) {
    const updateData: any = {};
    
    if (dto.diagnosis !== undefined) {
      updateData.diagnosis = dto.diagnosis;
    }
    
    if (dto.apparatusType !== undefined) {
      updateData.apparatusType = dto.apparatusType;
    }
    
    if (dto.startDate !== undefined) {
      updateData.startDate = dto.startDate ? new Date(dto.startDate) : undefined;
    }
    
    if (dto.isActive !== undefined) {
      updateData.isActive = dto.isActive;
    }
    
    return await this.prisma.treatmentPlan.update({
      where: { id },
      data: updateData,
    });
  }
}

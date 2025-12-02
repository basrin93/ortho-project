import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateVisitDto } from './dto/create-visit.dto.js';

@Injectable()
export class VisitsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateVisitDto) {
    return await this.prisma.visit.create({
      data: {
        patientId: dto.patientId,
        notes: dto.notes,
        date: dto.date ? new Date(dto.date) : undefined,
      },
    });
  }

  async findAll(userId: string) {
    return await this.prisma.visit.findMany({
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

  async update(id: string, dto: Partial<CreateVisitDto>) {
    const updateData: any = {};
    
    if (dto.notes !== undefined) {
      updateData.notes = dto.notes;
    }
    
    if (dto.date !== undefined) {
      updateData.date = dto.date ? new Date(dto.date) : undefined;
    }
    
    return await this.prisma.visit.update({
      where: { id },
      data: updateData,
    });
  }
}

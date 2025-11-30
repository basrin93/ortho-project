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

  async findAll() {
    return await this.prisma.visit.findMany({
      include: {
        patient: true,
      },
    });
  }
}

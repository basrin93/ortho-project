import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.patient.findMany();
  }

  async create(data: CreatePatientDto) {
    return await this.prisma.patient.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        birthDate: new Date(data.birthDate),
        userId: data.userId,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.patient.findUnique({
      where: { id },
    });
  }

  async remove(id: string) {
    return await this.prisma.patient.delete({
      where: { id },
    });
  }
}

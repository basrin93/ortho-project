import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreatePatientDto } from './dto/create-patient.dto.js';
import { FilesService } from '../files/files.service.js';

@Injectable()
export class PatientsService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
  ) {}

  async findAll(userId: string) {
    return await this.prisma.patient.findMany({
      where: { userId },
      include: {
        plans: true,
        visits: true,
        photos: true,
      },
    });
  }

  async create(data: CreatePatientDto, userId: string) {
    return await this.prisma.patient.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        birthDate: new Date(data.birthDate),
        userId: userId,
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

  async uploadPhoto(patientId: string, file: Express.Multer.File, visitId?: string) {
    const fileName = await this.filesService.uploadFile(file);
    // Если передан visitId, сохраняем его в поле visitId
    const photoType = visitId ? `visit:${visitId}` : 'Общее';

    return await this.prisma.photo.create({
      data: {
        patientId: patientId,
        s3Key: fileName,
        type: photoType,
        visitId: visitId,
      },
    });
  }
}

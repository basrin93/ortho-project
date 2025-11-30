import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class PatientsService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
  ) {}

  async findAll() {
    return await this.prisma.patient.findMany({
      include: {
        plans: true,
        visits: true,
      },
    });
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

  async uploadPhoto(patientId: string, file: Express.Multer.File) {
    const fileName = await this.filesService.uploadFile(file);

    return await this.prisma.photo.create({
      data: {
        patientId: patientId,
        s3Key: fileName,
        type: 'Общее',
      },
    });
  }
}

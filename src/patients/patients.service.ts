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
        cbctFiles: true,
        presentations: true,
      },
      orderBy: {
        createdAt: 'desc', // Сортируем по дате создания, новые сначала
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
      include: {
        cbctFiles: true,
        photos: true,
        presentations: true,
      },
    });
  }

  async update(id: string, data: CreatePatientDto) {
    return await this.prisma.patient.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        birthDate: new Date(data.birthDate),
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.patient.delete({
      where: { id },
    });
  }

  async uploadPhoto(patientId: string, file: Express.Multer.File, visitId?: string, treatmentPlanId?: string) {
    const fileName = await this.filesService.uploadFile(file);
    // Определяем тип фото
    let photoType = 'Общее';
    if (treatmentPlanId) {
      photoType = `treatment-plan:${treatmentPlanId}`;
    } else if (visitId) {
      photoType = `visit:${visitId}`;
    }

    return await this.prisma.photo.create({
      data: {
        patientId: patientId,
        s3Key: fileName,
        type: photoType,
        visitId: visitId || null,
        treatmentPlanId: treatmentPlanId || null,
      },
    });
  }

  async deletePhoto(photoId: string) {
    // Получаем фото для удаления файла из S3
    const photo = await this.prisma.photo.findUnique({
      where: { id: photoId },
    });

    if (photo) {
      // Извлекаем ключ файла из полного URL
      // Формат: ${S3_ENDPOINT}/${BUCKET_NAME}/${fileName}
      const urlParts = photo.s3Key.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      // Удаляем файл из S3
      try {
        await this.filesService.deleteFile(fileName);
      } catch (e) {
        console.error('Ошибка удаления файла из S3:', e);
      }
    }

    // Удаляем запись из БД
    return await this.prisma.photo.delete({
      where: { id: photoId },
    });
  }

  async uploadCBCTFile(patientId: string, file: Express.Multer.File, notes?: string) {
    const s3Key = await this.filesService.uploadCBCTFile(file);
    
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    return await this.prisma.cBCTFile.create({
      data: {
        patientId: patientId,
        fileName: originalName,
        s3Key: s3Key,
        fileSize: file.size,
        notes: notes || null,
      },
    });
  }

  async getCBCTFiles(patientId: string) {
    return await this.prisma.cBCTFile.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteCBCTFile(cbctFileId: string) {
    // Получаем КЛКТ файл для удаления из S3
    const cbctFile = await this.prisma.cBCTFile.findUnique({
      where: { id: cbctFileId },
    });

    if (cbctFile) {
      // Извлекаем ключ файла из полного URL
      // Формат: ${S3_ENDPOINT}/${BUCKET_NAME}/cbct/...
      const urlParts = cbctFile.s3Key.split('/');
      const bucketIndex = urlParts.findIndex(part => part === process.env.S3_BUCKET_NAME);
      const fileName = bucketIndex >= 0 
        ? urlParts.slice(bucketIndex + 1).join('/')
        : cbctFile.s3Key.replace(`${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}/`, '');
      
      // Удаляем файл из S3
      try {
        await this.filesService.deleteFile(fileName);
      } catch (e) {
        console.error('Ошибка удаления КЛКТ файла из S3:', e);
      }
    }

    // Удаляем запись из БД
    return await this.prisma.cBCTFile.delete({
      where: { id: cbctFileId },
    });
  }

  async uploadPresentation(patientId: string, file: Express.Multer.File, title?: string) {
    const s3Key = await this.filesService.uploadPresentationFile(file);
    
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    return await this.prisma.presentation.create({
      data: {
        patientId: patientId,
        fileName: originalName,
        s3Key: s3Key,
        fileSize: file.size,
        title: title || null,
      },
    });
  }

  async getPresentations(patientId: string) {
    return await this.prisma.presentation.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deletePresentation(presentationId: string) {
    // Получаем презентацию для удаления из S3
    const presentation = await this.prisma.presentation.findUnique({
      where: { id: presentationId },
    });

    if (presentation) {
      // Извлекаем ключ файла из полного URL
      const urlParts = presentation.s3Key.split('/');
      const bucketIndex = urlParts.findIndex(part => part === process.env.S3_BUCKET_NAME);
      const fileName = bucketIndex >= 0 
        ? urlParts.slice(bucketIndex + 1).join('/')
        : presentation.s3Key.replace(`${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}/`, '');
      
      // Удаляем файл из S3
      try {
        await this.filesService.deleteFile(fileName);
      } catch (e) {
        console.error('Ошибка удаления презентации из S3:', e);
      }
    }

    // Удаляем запись из БД
    return await this.prisma.presentation.delete({
      where: { id: presentationId },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateTemplateDto } from './dto/create-template.dto.js';

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateTemplateDto) {
    return await this.prisma.template.create({
      data: {
        userId,
        text: dto.text,
      },
    });
  }

  async findAll(userId: string) {
    return await this.prisma.template.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async remove(id: string, userId: string) {
    // Проверяем, что шаблон принадлежит пользователю
    const template = await this.prisma.template.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!template) {
      throw new Error('Шаблон не найден или нет доступа');
    }

    return await this.prisma.template.delete({
      where: { id },
    });
  }
}


import { Controller, Get, Post, Body } from '@nestjs/common';
import { TreatmentService } from './treatment.service.js';
import { CreateTreatmentDto } from './dto/create-treatment.dto.js';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Планы лечения')
@Controller('treatment-plans')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый план лечения' })
  create(@Body() dto: CreateTreatmentDto) {
    return this.treatmentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все планы' })
  findAll() {
    return this.treatmentService.findAll();
  }
}

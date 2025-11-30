import { Controller, Get, Post, Body } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Визиты')
@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  @ApiOperation({ summary: 'Зафиксировать новый визит' })
  create(@Body() dto: CreateVisitDto) {
    return this.visitsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить историю всех визитов' })
  findAll() {
    return this.visitsService.findAll();
  }
}

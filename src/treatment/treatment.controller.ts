import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TreatmentService } from './treatment.service.js';
import { CreateTreatmentDto } from './dto/create-treatment.dto.js';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

interface RequestWithUser {
  user: {
    userId: string;
    email: string;
  };
}

@ApiTags('Планы лечения')
@Controller('treatment-plans')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый план лечения' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateTreatmentDto) {
    return this.treatmentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все планы' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Request() req: RequestWithUser) {
    return this.treatmentService.findAll(req.user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить план лечения' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() dto: Partial<CreateTreatmentDto>) {
    return this.treatmentService.update(id, dto);
  }
}

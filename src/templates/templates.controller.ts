import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TemplatesService } from './templates.service.js';
import { CreateTemplateDto } from './dto/create-template.dto.js';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

interface RequestWithUser {
  user: {
    userId: string;
    email: string;
  };
}

@ApiTags('Шаблоны')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать шаблон фразы' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateTemplateDto, @Request() req: RequestWithUser) {
    return this.templatesService.create(req.user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все шаблоны пользователя' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Request() req: RequestWithUser) {
    return this.templatesService.findAll(req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить шаблон' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.templatesService.remove(id, req.user.userId);
  }
}


import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { PatientsService } from './patients.service.js';
import { CreatePatientDto } from './dto/create-patient.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

interface RequestWithUser {
  user: {
    userId: string;
    email: string;
  };
}

@ApiTags('Пациенты')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить всех пациентов' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Request() req: RequestWithUser) {
    return this.patientsService.findAll(req.user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Создать пациента' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreatePatientDto, @Request() req: RequestWithUser) {
    return this.patientsService.create(dto, req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить одного пациента' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пациента' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }

  @Post(':id/photos')
  @ApiOperation({ summary: 'Загрузить фото пациента' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        visitId: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @Param('id') patientId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { visitId?: string },
  ) {
    return this.patientsService.uploadPhoto(patientId, file, body.visitId);
  }
}

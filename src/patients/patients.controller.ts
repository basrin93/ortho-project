import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
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

@ApiTags('Пациенты')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Post()
  create(@Body() dto: CreatePatientDto) {
    return this.patientsService.create(dto);
  }

  @Get(':id')
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @Param('id') patientId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.patientsService.uploadPhoto(patientId, file);
  }
}

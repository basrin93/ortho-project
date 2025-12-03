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
        treatmentPlanId: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @Param('id') patientId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { visitId?: string; treatmentPlanId?: string },
  ) {
    return this.patientsService.uploadPhoto(patientId, file, body.visitId, body.treatmentPlanId);
  }

  @Delete('photos/:photoId')
  @ApiOperation({ summary: 'Удалить фото пациента' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deletePhoto(@Param('photoId') photoId: string) {
    return this.patientsService.deletePhoto(photoId);
  }

  @Post(':id/cbct')
  @ApiOperation({ summary: 'Загрузить КЛКТ файл пациента' })
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
        notes: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadCBCTFile(
    @Param('id') patientId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { notes?: string },
  ) {
    return this.patientsService.uploadCBCTFile(patientId, file, body.notes);
  }

  @Get(':id/cbct')
  @ApiOperation({ summary: 'Получить все КЛКТ файлы пациента' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getCBCTFiles(@Param('id') patientId: string) {
    return this.patientsService.getCBCTFiles(patientId);
  }

  @Delete('cbct/:cbctFileId')
  @ApiOperation({ summary: 'Удалить КЛКТ файл пациента' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteCBCTFile(@Param('cbctFileId') cbctFileId: string) {
    return this.patientsService.deleteCBCTFile(cbctFileId);
  }

  @Post(':id/presentations')
  @ApiOperation({ summary: 'Загрузить презентацию (PDF) пациента' })
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
        title: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadPresentation(
    @Param('id') patientId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title?: string },
  ) {
    return this.patientsService.uploadPresentation(patientId, file, body.title);
  }

  @Get(':id/presentations')
  @ApiOperation({ summary: 'Получить все презентации пациента' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getPresentations(@Param('id') patientId: string) {
    return this.patientsService.getPresentations(patientId);
  }

  @Delete('presentations/:presentationId')
  @ApiOperation({ summary: 'Удалить презентацию пациента' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deletePresentation(@Param('presentationId') presentationId: string) {
    return this.patientsService.deletePresentation(presentationId);
  }
}

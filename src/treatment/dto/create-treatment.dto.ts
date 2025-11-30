import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class CreateTreatmentDto {
  @ApiProperty({ description: 'ID пациента', example: 'ff79a0ae-...' })
  @IsString()
  @IsUUID()
  patientId: string;

  @ApiProperty({ description: 'Диагноз', example: 'Дистальный прикус' })
  @IsString()
  diagnosis: string;

  @ApiProperty({ description: 'Тип аппарата', example: 'Herbst' })
  @IsString()
  apparatusType: string;

  @ApiProperty({
    description: 'Дата начала',
    example: '2025-11-25',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    description: 'Активен ли план?',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

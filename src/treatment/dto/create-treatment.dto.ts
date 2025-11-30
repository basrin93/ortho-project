import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class CreateTreatmentDto {
  @ApiProperty({
    description: 'ID of the patient',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsUUID()
  patientId: string;

  @ApiProperty({
    description: 'Диагноз пациента',
    example: 'Дистальный прикус',
  })
  @IsString()
  diagnosis: string;

  @ApiProperty({ description: 'Тип аппарата', example: 'Herbst' })
  @IsString()
  applianceType: string;

  @ApiProperty({
    description: 'Дата начала (необязательно)',
    example: '2024-01-15',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    description: 'Активен ли курс лечения',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

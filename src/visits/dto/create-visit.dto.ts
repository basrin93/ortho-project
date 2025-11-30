import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsDateString } from 'class-validator';

export class CreateVisitDto {
  @ApiProperty({ description: 'ID пациента', example: 'ff79a0ae-...' })
  @IsString()
  @IsUUID()
  patientId: string;

  @ApiProperty({
    description: 'Заметки о приеме',
    example: 'Заменили дугу на НЧ',
  })
  @IsString()
  notes: string;

  @ApiProperty({
    description: 'Дата визита',
    example: '2025-11-30T12:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  date?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsUUID } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    description: 'Имя пациента',
    example: 'Иван',
  })
  @IsString({ message: 'Имя должно быть строкой' })
  firstName: string;

  @ApiProperty({
    description: 'Фамилия пациента',
    example: 'Иванов',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Телефон пациента',
    example: '+79991234567',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'Дата рождения пациента',
    example: '2000-01-01',
  })
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    description: 'ID врача (User), к которому привязан пациент',
    example: 'b35c4087-480e-4851-b98e-20855dfb54e8',
  })
  @IsString()
  @IsUUID()
  userId: string;
}

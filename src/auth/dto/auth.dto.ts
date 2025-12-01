import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'doctor@example.com', description: 'Почта врача' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'super-password', description: 'Пароль' })
  @IsString()
  @MinLength(6, { message: 'Пароль должен быть не короче 6 символов' })
  password: string;
}

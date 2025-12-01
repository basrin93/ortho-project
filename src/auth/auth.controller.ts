import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto.js';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового врача' })
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Вход в систему (получение токена)' })
  async login(@Body() dto: AuthDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);

    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    return this.authService.login(user);
  }
}

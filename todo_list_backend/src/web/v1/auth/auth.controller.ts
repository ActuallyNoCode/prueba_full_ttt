import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshJwtAuthGuard } from './guards/refreshJwt.guard';
import { Request } from 'express';
import User from 'src/databases/postgres/entities/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('refresh-token')
  @UseGuards(RefreshJwtAuthGuard)
  refreshToken(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.refreshToken(user.id);
  }
}

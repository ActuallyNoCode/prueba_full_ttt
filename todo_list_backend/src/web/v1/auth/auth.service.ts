import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/databases/postgres/entities/users.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    const user = await this.userRepository.findOne({
      where: { email: registerDto.email.toLowerCase() },
    });

    if (user) {
      throw new ConflictException('Email already exists');
    }

    const securePassword = await hash(registerDto.password, 10);
    registerDto.password = securePassword;

    const newUser = await this.userRepository.save(registerDto);

    const accessToken = await this.generateAccessToken({ id: newUser.id });
    const refreshToken = await this.generateRefreshToken({ id: newUser.id });

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
      token: {
        accessToken,
        refreshToken,
      },
    };
  }

  async login(LoginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: LoginDto.email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatch = await compare(LoginDto.password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken({ id: user.id });
    const refreshToken = await this.generateRefreshToken({ id: user.id });

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      token: {
        accessToken,
        refreshToken,
      },
    };
  }

  async refreshToken(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken({ id: user.id });
    return {
      message: 'Refresh token success',
      data: {},
      token: {
        accessToken,
      },
    };
  }

  async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: config.JWT.sessionSecret,
      expiresIn: config.JWT.sessionExpiresIn,
    });
  }

  async generateRefreshToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: config.JWT.refreshSecret,
      expiresIn: config.JWT.refreshExpiresIn,
    });
  }
}

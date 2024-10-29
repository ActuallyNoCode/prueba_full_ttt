import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/databases/postgres/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { RefreshJwtStrategy } from './strategies/refreshJwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, RefreshJwtStrategy],
})
export class AuthModule {}

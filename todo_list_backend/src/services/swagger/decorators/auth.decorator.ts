import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import User from 'src/databases/postgres/entities/users.entity';
import { RefreshJwtAuthGuard } from 'src/web/v1/auth/guards/refreshJwt.guard';

export function AuthControllerDocs() {
  return applyDecorators(ApiTags('auth'), ApiBearerAuth());
}

export function registerDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Register a new user' }),
    ApiResponse({
      status: 201,
      description: 'User registered successfully',
      type: User,
    }),
    ApiResponse({ status: 409, description: 'Conflict: Email already exists' }),
  );
}

export function loginDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Login an existing user' }),
    ApiResponse({
      status: 200,
      description: 'User logged in successfully',
      type: User,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized: Invalid credentials',
    }),
  );
}

export function refreshTokenDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Refresh access token for an authenticated user -- DISABLED',
    }),
    ApiResponse({
      status: 200,
      description: 'Access token refreshed successfully',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized: Invalid refresh token',
    }),
    UseGuards(RefreshJwtAuthGuard),
  );
}

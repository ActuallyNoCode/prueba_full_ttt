// refresh-jwt-auth.guard.ts
import { Injectable, ExecutionContext, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/web/v1/auth/auth.service';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard('refresh-jwt') {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Customize activation logic if necessary
    return (await super.canActivate(context)) as boolean;
  }
}

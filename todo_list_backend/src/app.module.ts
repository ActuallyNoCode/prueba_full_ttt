import 'reflect-metadata';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksModule } from './web/v1/tasks/tasks.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { UsersModule } from './web/v1/users/users.module';
import { AuthModule } from './web/v1/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(config.database), TasksModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}

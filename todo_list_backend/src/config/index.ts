import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

export const config: Config = {
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: Number(process.env.POSTGRES_PORT ?? '5432'),
    username: process.env.POSTGRES_USERNAME ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? 'postgres',
    database: process.env.POSTGRES_NAME ?? 'postgres',
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    synchronize: false,
    migrations: [
      join(__dirname, '..', 'databases', 'postgres', 'migrations', '*.{ts,js}'),
    ],
  },
  JWT: {
    sessionSecret: process.env.JWT_SECRET,
    sessionExpiresIn: process.env.JWT_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};

interface Config {
  database: TypeOrmModuleOptions;
  JWT: {
    sessionSecret: string;
    sessionExpiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };
}

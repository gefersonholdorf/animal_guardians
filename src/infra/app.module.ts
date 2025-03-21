import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { EnvModule } from './env/env.module';
import { CryptographyModule } from './cryptography/cryptography.module';
import { HttpModule } from './http/http.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true
  }),
  EnvModule, CryptographyModule, DatabaseModule, HttpModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { EnvModule } from "../env/env.module";
import { EnvService } from "../env/env.service";
import { AuthGuard } from "./auth-guard";

@Module({
    imports: [EnvModule, JwtModule.registerAsync({
        imports: [EnvModule],
        inject: [EnvService],
        global: true,
        useFactory(env: EnvService) {
            const secret = env.get('SECRET_KEY')

            return {
                secret,
                signOptions: {
                    expiresIn: '1d'
                }
            }
        }
    })],
    providers: [],
    exports: [JwtModule]
})
export class AuthModule{}
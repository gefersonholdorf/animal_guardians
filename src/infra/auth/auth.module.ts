import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { EnvModule } from "../env/env.module";
import { EnvService } from "../env/env.service";
import { AuthGuard } from "./auth-guard";

@Module({
    imports: [JwtModule.registerAsync({
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
    }), EnvModule],
    providers: [AuthGuard],
    exports: [AuthGuard, JwtModule]
})
export class AuthModule{}
import { Module } from "@nestjs/common";
import { RegisterController } from "./controllers/register.controller";
import { RegisterUseCase } from "src/domain/report/application/use-cases/register-use-case";
import { DatabaseModule } from "../database/database.module";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { AuthenticateUseCase } from "src/domain/report/application/use-cases/authenticate-use-case";
import { AuthModule } from "../auth/auth.module";
import { EnvModule } from "../env/env.module";

@Module({
    imports: [DatabaseModule, CryptographyModule, AuthModule, EnvModule],
    controllers: [RegisterController, AuthenticateController],
    providers: [RegisterUseCase, AuthenticateUseCase]
})
export class HttpModule{}
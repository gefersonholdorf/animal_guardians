import { Module } from "@nestjs/common";
import { RegisterController } from "./controllers/register.controller";
import { RegisterUseCase } from "src/domain/report/application/use-cases/register-use-case";
import { DatabaseModule } from "../database/database.module";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { AuthenticateUseCase } from "src/domain/report/application/use-cases/authenticate-use-case";

@Module({
    imports: [DatabaseModule, CryptographyModule],
    controllers: [RegisterController, AuthenticateController],
    providers: [RegisterUseCase, AuthenticateUseCase]
})
export class HttpModule{}
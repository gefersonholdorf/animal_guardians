import { Module } from "@nestjs/common";
import { RegisterController } from "./controllers/register.controller";
import { RegisterUseCase } from "src/domain/report/application/use-cases/register-use-case";
import { DatabaseModule } from "../database/database.module";
import { CryptographyModule } from "../cryptography/cryptography.module";

@Module({
    imports: [DatabaseModule, CryptographyModule],
    controllers: [RegisterController],
    providers: [RegisterUseCase]
})
export class HttpModule{}
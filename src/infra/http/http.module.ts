import { Module } from "@nestjs/common";
import { RegisterController } from "./controllers/register.controller";
import { RegisterUseCase } from "src/domain/report/application/use-cases/register-use-case";
import { DatabaseModule } from "../database/database.module";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { AuthenticateUseCase } from "src/domain/report/application/use-cases/authenticate-use-case";
import { AuthModule } from "../auth/auth.module";
import { EnvModule } from "../env/env.module";
import { CreateComplaintController } from "./controllers/create-complaint.controller";
import { CreateComplaintUseCase } from "src/domain/report/application/use-cases/create-complaint-use-case";
import { GetComplaintByIdUseCase } from "src/domain/report/application/use-cases/get-complaint-by-id-use-case";
import { GetComplaintByIdController } from "./controllers/get-complaint-by-id.controller";
import { ApprovedComplaintUseCase } from "src/domain/report/application/use-cases/approved-complaint-use-case";
import { approvedComplaintController } from "./controllers/approved-complaint.controller";

@Module({
    imports: [DatabaseModule, CryptographyModule, AuthModule, EnvModule],
    controllers: [RegisterController, AuthenticateController, CreateComplaintController, GetComplaintByIdController,
        approvedComplaintController
    ],
    providers: [RegisterUseCase, AuthenticateUseCase, CreateComplaintUseCase, GetComplaintByIdUseCase, ApprovedComplaintUseCase]
})
export class HttpModule{}
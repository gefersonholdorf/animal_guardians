import { Module } from "@nestjs/common";
import { BcryptHashed } from "./bcrypt-hashed";
import { Hashed } from "src/domain/report/application/cryptography/hashed";
import { JwtModule } from "@nestjs/jwt";
import { Encrypter } from "src/domain/report/application/cryptography/encrypter";
import { JwtEncrypter } from "./jwt-encrypter";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [AuthModule],
    providers: [
        {
            provide: Hashed,
            useClass: BcryptHashed
        },
        {
            provide: Encrypter,
            useClass: JwtEncrypter
        }
    ],
    exports: [Hashed, Encrypter]
})
export class CryptographyModule{}
import { Module } from "@nestjs/common";
import { BcryptHashed } from "./bcrypt-hashed";
import { Hashed } from "src/domain/report/application/cryptography/hashed";

@Module({
    providers: [
        {
            provide: Hashed,
            useClass: BcryptHashed
        }
    ],
    exports: [Hashed]
})
export class CryptographyModule{}
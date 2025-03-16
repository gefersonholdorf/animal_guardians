import { Module } from "@nestjs/common";
import { BcryptHashed } from "./bcrypt-hashed";

@Module({
    providers: [BcryptHashed],
    exports: [BcryptHashed]
})
export class CryptographyModule{}
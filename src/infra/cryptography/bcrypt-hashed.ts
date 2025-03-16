import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcryptjs";
import { Hashed } from "src/domain/report/application/cryptography/hashed";

@Injectable()
export class BcryptHashed implements Hashed {
    private HASH_SALT_LENGTH = 8

    async hash(text: string): Promise<string> {
        return await hash(text, this.HASH_SALT_LENGTH)
    }

    async compare(text: string, hash: string): Promise<boolean> {
        return await compare(text, hash)
    }
}
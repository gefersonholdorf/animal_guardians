import { Hashed } from "src/domain/report/application/cryptography/hashed";

export class FakeHashed implements Hashed {
    async hash(text: string): Promise<string> {
        return text.concat('-concat')
    }
    async compare(text: string, hash: string): Promise<boolean> {
        return text.concat('-concat') === hash
    }
}
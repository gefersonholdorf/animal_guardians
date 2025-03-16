import { Encrypter } from "src/domain/report/application/cryptography/encrypter";

export class FakeEncrypter implements Encrypter {
    async sign(payload: Record<string, unknown>): Promise<string> {
        return JSON.stringify(payload)
    }
}
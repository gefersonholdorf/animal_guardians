import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Encrypter } from "src/domain/report/application/cryptography/encrypter";

@Injectable()
export class JwtEncrypter implements Encrypter {
    constructor(private jwtService: JwtService) {}

    sign(payload: Record<string, unknown>): Promise<string> {
        return this.jwtService.signAsync(payload)
    }
}
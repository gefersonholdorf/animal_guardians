import { Injectable } from "@nestjs/common"
import { Either, left, right } from "src/core/errors/either"
import { CredentialsInvalidError } from "src/core/errors/errors/credentials-invalid-error"
import { Encrypter } from "../cryptography/encrypter"
import { Hashed } from "../cryptography/hashed"
import { UserRepository } from "../repositories/user-repository"

export interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

export type AuthenticateUseCaseResponse = Either<CredentialsInvalidError, {access_token: string}>

@Injectable()
export class AuthenticateUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashed: Hashed,
        private readonly encrypter: Encrypter
    ) {}

    async execute(data: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const {email, password} = data

        const existsUser = await this.userRepository.findByEmail(email)

        if(!existsUser) {
            return left(new CredentialsInvalidError())
        }

        const isPasswordValid = await this.hashed.compare(password, existsUser.props.password)

        if(!isPasswordValid) {
            return left(new CredentialsInvalidError())
        }

        const token = await this.encrypter.sign({sub: existsUser.id})

        return right({access_token: token})
    }
}
import { Either, left, right } from "src/core/errors/either"
import { UserRepository } from "../repositories/user-repository"
import { User, type RoleUser } from "../../enterprises/entities/user"
import { Hashed } from "../cryptography/hashed"
import { Injectable } from "@nestjs/common"
import { EmailAlreadyExistsError } from "src/core/errors/errors/email-already-exists-error"

export interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
    phone: string
    role: RoleUser
}

export type RegisterUseCaseResponse = Either<EmailAlreadyExistsError, {}>

@Injectable()
export class RegisterUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashed: Hashed
    ) {}

    async execute(data: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const {name, email, password, phone, role} = data

        const existsEmail = await this.userRepository.findByEmail(email)

        if(existsEmail) {
            return left(new EmailAlreadyExistsError())
        }

        const passwordHashed = await this.hashed.hash(password)

        const newUser = User.create({
            name, email, password: passwordHashed, phone, role
        })

        await this.userRepository.create(newUser)

        return right({})
    }
}
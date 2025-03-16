import { Either, left, right } from "src/core/errors/either"
import { SetEmail } from "../email/set-email"
import { Injectable } from "@nestjs/common"
import { Email } from "../../enterprises/entities/email"
import { UserRepository } from "src/domain/report/application/repositories/user-repository"
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found-error"

export interface SendEmailUseCaseRequest {
    userId: string
    from: string
    subject: string
    text: string
}

export type SendEmailUseCaseResponse = Either<ResourceNotFoundError, {}>

@Injectable()
export class SendEmailUseCase {
    constructor(
        private setEmail: SetEmail,
        private userRepository: UserRepository
    ) {}

    async execute(data: SendEmailUseCaseRequest): Promise<SendEmailUseCaseResponse> {
        const {userId, from, subject, text} = data

        const user = await this.userRepository.findById(userId)

        if(!user) {
            return left(new ResourceNotFoundError())
        }

        const email = Email.create({
            from, to: user.props.email, subject, text
        })

        await this.setEmail.sendEmail(email)

        return right({})
    }
}
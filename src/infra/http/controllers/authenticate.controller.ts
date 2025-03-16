import { BadRequestException, Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { CredentialsInvalidError } from "src/core/errors/errors/credentials-invalid-error";
import { AuthenticateUseCase } from "src/domain/report/application/use-cases/authenticate-use-case";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zop-validation-.pipe";

export const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
}) 

export type AuthenticateSchema = z.infer<typeof authenticateSchema>

@Controller('/session')
export class AuthenticateController{
    constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

    @Post()
    @UsePipes(new ZodValidationPipe(authenticateSchema))
    async handle(@Body() body: AuthenticateSchema) {
        const {email, password} = body

        const result = await this.authenticateUseCase.execute({email, password})

        if(result.isLeft()) {
            const error = result.value

            switch (error.constructor) {
                case CredentialsInvalidError:
                    throw new UnauthorizedException()
                default:
                    throw new BadRequestException()
            }
        }

        const {access_token} = result.value

        return {
            access_token
        }
    }
}
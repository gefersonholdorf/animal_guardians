import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { RegisterUseCase } from "src/domain/report/application/use-cases/register-use-case";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zop-validation-.pipe";
import { EmailAlreadyExistsError } from "src/core/errors/errors/email-already-exists-error";

export const registerUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    role: z.enum(['COMMON', 'MODERATOR', 'ONG']).optional()
})

export type RegisterUserSchema = z.infer<typeof registerUserSchema>

@Controller('/users')
export class RegisterController{
    constructor(private readonly registerUseCase: RegisterUseCase) {}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(registerUserSchema))
    async handle(@Body() body: RegisterUserSchema) {
        const {name, email, password, phone, role} = body

        const result = await this.registerUseCase.execute({name, email, password, phone, role})

        if(result.isLeft()) {
            const error = result.value

           switch (error.constructor) {
                case EmailAlreadyExistsError:
                    throw new ConflictException()
                default:
                    throw new BadRequestException()
           }
        }
    }
}
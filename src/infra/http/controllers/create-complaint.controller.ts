import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { CreateComplaintUseCase } from "src/domain/report/application/use-cases/create-complaint-use-case";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zop-validation-.pipe";

const createComplaintSchema = z.object({
    description: z.string(),
    location: z.string(),
    userId: z.string()
})

export type CreateComplaintSchema = z.infer<typeof createComplaintSchema>

@Controller('/complaints')
export class CreateComplaintController {
    constructor(private readonly createComplaintService: CreateComplaintUseCase) {}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createComplaintSchema))
    async handler(@Body() body: CreateComplaintSchema) {
        const {description, location, userId} = body

        await this.createComplaintService.execute({description, location, userId})
    }
}
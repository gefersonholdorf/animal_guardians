import { BadRequestException, Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found-error";
import { GetComplaintByIdUseCase } from "src/domain/report/application/use-cases/get-complaint-by-id-use-case";
import { z } from "zod";
import { GetComplaintByIdPresenter } from "../presenters/get-complaint-by-id.presenter";

const getComplaintByIdSchema = z.object({
    id: z.string()
})

type GetComplaintByIdSchema = z.infer<typeof getComplaintByIdSchema>

@Controller('/complaints/:id')
export class GetComplaintByIdController {
    constructor(private readonly getComplaintByIdService: GetComplaintByIdUseCase) {}

    @Get()
    async handler(@Param() params: GetComplaintByIdSchema) {
        const {id} = params

        const result = await this.getComplaintByIdService.execute({id})

        if(result.isLeft()) {
            const error = result.value

            if(error instanceof ResourceNotFoundError) {
                throw new NotFoundException()
            }

            throw new BadRequestException()
        }

        console.log(result.value.complaint)

        const complaint = GetComplaintByIdPresenter.toHttp(result.value.complaint)

        return {
            complaint
        }
    }
}
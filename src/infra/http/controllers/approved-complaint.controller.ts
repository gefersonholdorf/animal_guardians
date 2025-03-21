import { BadRequestException, Body, Controller, Get, HttpCode, NotFoundException, Param, Patch, UsePipes } from "@nestjs/common";
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found-error";
import { ApprovedComplaintUseCase } from "src/domain/report/application/use-cases/approved-complaint-use-case";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zop-validation-.pipe";

const approvedComplaintParamsSchema = z.object({
    complaintId: z.string(),
})

const approvedComplaintSchema = z.object({
    moderatorId: z.string()
})

type ApprovedComplaintSchema = z.infer<typeof approvedComplaintSchema>
type ApprovedComplaintParamsSchema = z.infer<typeof approvedComplaintParamsSchema>

@Controller('/complaints/approved/:complaintId')
export class approvedComplaintController {
    constructor(private readonly approvedComplaintService: ApprovedComplaintUseCase) {}

    @Patch()
    @UsePipes(new ZodValidationPipe(approvedComplaintSchema))
    @HttpCode(201)
    async handler(@Param() params: ApprovedComplaintParamsSchema, @Body() body: ApprovedComplaintSchema) {
        const {complaintId} = params
        const {moderatorId} = body

        const result = await this.approvedComplaintService.execute({moderatorId, complaintId})

        if(result.isLeft()) {
            const error = result.value

            if(error instanceof ResourceNotFoundError) {
                throw new NotFoundException()
            }

            throw new BadRequestException()
        }
    }
}
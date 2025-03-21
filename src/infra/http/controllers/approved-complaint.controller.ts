import { BadRequestException, Body, Controller, Get, HttpCode, NotFoundException, Param, Patch, Put, UsePipes } from "@nestjs/common";
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found-error";
import { ApprovedComplaintUseCase } from "src/domain/report/application/use-cases/approved-complaint-use-case";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zop-validation-.pipe";


const approvedComplaintSchema = z.object({
    moderatorId: z.string().uuid()
})

type ApprovedComplaintSchema = z.infer<typeof approvedComplaintSchema>

@Controller('/complaints')
export class ApprovedComplaintController {
    constructor(private readonly approvedComplaintService: ApprovedComplaintUseCase) {}

    @Put('/approved/:complaintId')
    @HttpCode(204)
    async handler(@Param('complaintId') complaintId: string, @Body() body: ApprovedComplaintSchema) {
        const {moderatorId} = approvedComplaintSchema.parse(body)

        const result = await this.approvedComplaintService.execute({complaintId, moderatorId})

        if(result.isLeft()) {
            const error = result.value

            if(error instanceof ResourceNotFoundError) {
                throw new NotFoundException()
            }

            throw new BadRequestException()
        }
    }
}
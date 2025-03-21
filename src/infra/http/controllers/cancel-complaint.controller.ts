import { BadRequestException, Body, Controller, Get, HttpCode, NotFoundException, Param, Patch, Put, UsePipes } from "@nestjs/common";
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found-error";
import { z } from "zod";
import { CancelComplaintUseCase } from "src/domain/report/application/use-cases/cancel-complaint-use-case";


const cancelComplaintSchema = z.object({
    moderatorId: z.string().uuid()
})

type cancelComplaintSchema = z.infer<typeof cancelComplaintSchema>

@Controller('/complaints')
export class CancelComplaintController {
    constructor(private readonly cancelComplaintService: CancelComplaintUseCase) {}

    @Put('/cancel/:complaintId')
    @HttpCode(204)
    async handler(@Param('complaintId') complaintId: string, @Body() body: cancelComplaintSchema) {
        const {moderatorId} = cancelComplaintSchema.parse(body)

        const result = await this.cancelComplaintService.execute({complaintId, moderatorId})

        if(result.isLeft()) {
            const error = result.value

            if(error instanceof ResourceNotFoundError) {
                throw new NotFoundException()
            }

            throw new BadRequestException()
        }
    }
}
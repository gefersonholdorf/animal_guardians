import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found-error";
import { PaginationParams } from "src/core/repositories/pagination-params";
import { FetchComplaintsByUserIdUseCase } from "src/domain/report/application/use-cases/fetch-complaints-by-user-id-use-case";
import { FetchComplaintsByUserIdPresenter } from "../presenters/fetch-complaints-by-user-id.presenter";

@Controller('/complaints') 
export class FetchComplaintsByUserIdController {
    constructor(private fetchComplaintsByUserId: FetchComplaintsByUserIdUseCase) {}

    @Get()
    async handler(@Query() params: PaginationParams, @Body() body: any) {
        const result = await this.fetchComplaintsByUserId.execute({
            userId: body.userId,
            page: params.page,
            perPage: params.perPage
        })

        if(result.isLeft()) {
            const error = result.value
        
            if(error instanceof ResourceNotFoundError) {
                throw new NotFoundException()
            }
        
            throw new BadRequestException()
        }

        return {
            complaints: FetchComplaintsByUserIdPresenter.toHttp(result.value.complaints)
        }
    }
}
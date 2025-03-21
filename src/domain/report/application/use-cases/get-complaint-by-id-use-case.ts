import { left, right, type Either } from "src/core/errors/either"
import { Complaint } from "../../enterprises/entities/complaint"
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found-error"
import { ComplaintRepository } from "../repositories/complaint-repository"
import { Injectable } from "@nestjs/common"

export interface GetComplaintByIdUseCaseRequest {
    id: string
}

export type GetComplaintByIdUseCaseResponse = Either<ResourceNotFoundError, {complaint: Complaint}>

@Injectable()
export class GetComplaintByIdUseCase {
    constructor(private readonly complaintRepository: ComplaintRepository) {}

    async execute(data: GetComplaintByIdUseCaseRequest): Promise<GetComplaintByIdUseCaseResponse> {
        const {id} = data

        const complaint = await this.complaintRepository.findById(id)

        if(!complaint) {
            return left(new ResourceNotFoundError())
        }

        return right({complaint})
    }
}
import { Injectable } from "@nestjs/common"
import { left, right, type Either } from "src/core/errors/either"
import { ComplaintRepository } from "../repositories/complaint-repository"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found-error"

export interface ApprovedComplaintUseCaseRequest {
    complaintId: string
    moderatorId: string
}

export type ApprovedComplaintUseCaseResponse = Either<ResourceNotFoundError, {}>

@Injectable()
export class ApprovedComplaintUseCase {
    constructor(private complaintRepository: ComplaintRepository) {}

    async execute(data: ApprovedComplaintUseCaseRequest): Promise<ApprovedComplaintUseCaseResponse> {
        const {complaintId, moderatorId} = data

        const complaint = await this.complaintRepository.findById(complaintId)

        if(!complaint) {
            return left(new ResourceNotFoundError())
        }   

        complaint.moderatorId = new UniqueEntityId(moderatorId)
        complaint.status = 'APPROVED'

        await this.complaintRepository.save(complaint)

        return right({})
    }
}
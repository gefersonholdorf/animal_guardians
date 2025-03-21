import { Injectable } from "@nestjs/common"
import { left, right, type Either } from "src/core/errors/either"
import { ComplaintRepository } from "../repositories/complaint-repository"
import { Complaint } from "../../enterprises/entities/complaint"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found-error"

export interface CancelComplaintUseCaseRequest {
    complaintId: string
    moderatorId: string
}

export type CancelComplaintUseCaseResponse = Either<ResourceNotFoundError, {}>

@Injectable()
export class CancelComplaintUseCase {
    constructor(private complaintRepository: ComplaintRepository) {}

    async execute(data: CancelComplaintUseCaseRequest): Promise<CancelComplaintUseCaseResponse> {
        const {complaintId, moderatorId} = data

        const complaint = await this.complaintRepository.findById(complaintId)

        if(!complaint) {
            return left(new ResourceNotFoundError())
        }   

        complaint.moderatorId = new UniqueEntityId(moderatorId)
        complaint.status = 'CANCEL'

        await this.complaintRepository.save(complaint)

        return right({})
    }
}
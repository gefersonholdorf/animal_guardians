import { Injectable } from "@nestjs/common"
import { left, right, type Either } from "src/core/errors/either"
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found-error"
import { ComplaintRepository } from "../repositories/complaint-repository"

export interface UpdateComplaintUseCaseRequest {
    complaintId: string
    description: string
    location: string
}

export type UpdateComplaintUseCaseResponse = Either<ResourceNotFoundError, {}>

@Injectable()
export class UpdateComplaintUseCase {
    constructor(private complaintRepository: ComplaintRepository) {}

    async execute(data: UpdateComplaintUseCaseRequest): Promise<UpdateComplaintUseCaseResponse> {
        const {description, location, complaintId} = data

        const complaint = await this.complaintRepository.findById(complaintId)

        if(!complaint) {
            return left(new ResourceNotFoundError())
        }   

        complaint.description = description
        complaint.location = location

        await this.complaintRepository.save(complaint)

        return right({})
    }
}
import { Injectable } from "@nestjs/common"
import { right, type Either } from "src/core/errors/either"
import { ComplaintRepository } from "../repositories/complaint-repository"
import { Complaint } from "../../enterprises/entities/complaint"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"

export interface CreateComplaintUseCaseRequest {
    description: string
    location: string
    userId: string
}

export type CreateComplaintUseCaseResponse = Either<never, {}>

@Injectable()
export class CreateComplaintUseCase {
    constructor(private complaintRepository: ComplaintRepository) {}

    async execute(data: CreateComplaintUseCaseRequest): Promise<CreateComplaintUseCaseResponse> {
        const {description, location, userId} = data

        const complaint = Complaint.create({
            description, location, userId: new UniqueEntityId(userId)
        })

        await this.complaintRepository.create(complaint)

        return right({})
    }
}
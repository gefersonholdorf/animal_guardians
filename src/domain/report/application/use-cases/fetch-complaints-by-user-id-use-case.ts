import { left, right, type Either } from "src/core/errors/either"
import { Complaint } from "../../enterprises/entities/complaint"
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found-error"
import { ComplaintRepository } from "../repositories/complaint-repository"
import { Injectable } from "@nestjs/common"
import { UserRepository } from "../repositories/user-repository"

export interface FetchComplaintsByUserIdUseCaseRequest {
    userId: string
    page: number
    perPage: number
}

export type FetchComplaintsByUserIdUseCaseResponse = Either<ResourceNotFoundError, {complaints: Complaint[]}>

@Injectable()
export class FetchComplaintsByUserIdUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly complaintRepository: ComplaintRepository
    ) {}

    async execute(data: FetchComplaintsByUserIdUseCaseRequest): Promise<FetchComplaintsByUserIdUseCaseResponse> {
        const {userId, page, perPage} = data

        const user = await this.userRepository.findById(userId)

        if(!user) {
            return left(new ResourceNotFoundError())
        }

        const complaints = await this.complaintRepository.findByUserId(user.id.toValue, {page, perPage})

        return right({complaints})
    }
}
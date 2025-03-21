import { Injectable } from "@nestjs/common";
import { PaginationParams } from "src/core/repositories/pagination-params";
import { ComplaintRepository } from "src/domain/report/application/repositories/complaint-repository";
import { Complaint } from "src/domain/report/enterprises/entities/complaint";
import { PrismaService } from "../prisma.service";
import { PrismaComplaintMapper } from "../mappers/prisma-complaint-mapper";

@Injectable()
export class PrismaComplaintRepository implements ComplaintRepository{
    constructor(private readonly prisma: PrismaService){}

    async create(complaint: Complaint): Promise<void> {
        const data = PrismaComplaintMapper.toPrisma(complaint)

        await this.prisma.complaint.create({
            data
        })
    }

    async findById(id: string): Promise<Complaint | null> {
        const complaint = await this.prisma.complaint.findUnique({
            where: {
                id
            }
        })

        if(!complaint) {
            return null
        }

        return PrismaComplaintMapper.toDomain(complaint)
    }

    async save(complaint: Complaint): Promise<void> {
        const data = PrismaComplaintMapper.toPrisma(complaint)

        await this.prisma.complaint.update({
            where: {
                id: data.id
            },
            data
        })
    }

    async findByUserId(userId: string, params: PaginationParams): Promise<Complaint[]> {
        const complaints = await this.prisma.complaint.findMany({
            where: {
                userId
            },
            take: params.perPage,
            skip: (params.page - 1) * params.perPage
        })

        const fetchComplaint = complaints.map((complaint) => {
            return PrismaComplaintMapper.toDomain(complaint)
        })

        return fetchComplaint
    }

}
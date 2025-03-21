import { Complaint as PrismaComplaint, type Prisma } from "@prisma/client";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Complaint } from "src/domain/report/enterprises/entities/complaint";

export class PrismaComplaintMapper {
    static toDomain(complaint: PrismaComplaint): Complaint {
        return Complaint.create({
            description: complaint.description,
            location: complaint.location,
            status: complaint.status,
            userId: new UniqueEntityId(complaint.userId),
            moderatorId: complaint.moderatorId ? new UniqueEntityId(complaint.moderatorId) : null,
            createdAt: complaint.createdAt,
            updatedAt: complaint.updatedAt
        }, new UniqueEntityId(complaint.id))
    }

    static toPrisma(complaint: Complaint): Prisma.ComplaintUncheckedCreateInput {
        return {
            id: complaint.id.toValue,
            description: complaint.props.description,
            location: complaint.props.location,
            status: complaint.props.status,
            userId: complaint.props.userId.toValue,
            moderatorId: complaint.props.moderatorId?.toValue ?? null
        }
    }
}
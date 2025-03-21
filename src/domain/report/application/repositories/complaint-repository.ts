import { PaginationParams } from "src/core/repositories/pagination-params";
import { Complaint } from "../../enterprises/entities/complaint";

export abstract class ComplaintRepository {
    abstract create(complaint: Complaint): Promise<void>
    abstract findById(id: string): Promise<Complaint | null>
    abstract save(complaint: Complaint): Promise<void>
    abstract findByUserId(userId: string, params: PaginationParams): Promise<Complaint[]>
}
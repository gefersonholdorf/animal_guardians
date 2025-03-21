import { ComplaintRepository } from "src/domain/report/application/repositories/complaint-repository"
import { Complaint } from "src/domain/report/enterprises/entities/complaint"

export class InMemoryComplaintRepository implements ComplaintRepository {
    public items: Complaint[] = []

    async create(Complaint: Complaint): Promise<void> {
        this.items.push(Complaint)
    }

    async findById(id: string): Promise<Complaint | null> {
        const item = this.items.find(item => item.id.toValue === id)

        if(!item) {
            return null
        }

        return item
    }

    async save(Complaint: Complaint): Promise<void> {
        const index = this.items.findIndex(item => item.id.toValue === Complaint.id.toValue)

        this.items[index] = Complaint
    }

    async findByUserId(userId: string): Promise<Complaint[]> {
        const items = await this.items.filter(item => item.userId.toValue === userId)

        return items
    }
}
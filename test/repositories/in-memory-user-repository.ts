import { DomainEvents } from "src/core/events/domain-events";
import { UserRepository } from "src/domain/report/application/repositories/user-repository";
import { User } from "src/domain/report/enterprises/entities/user";

export class InMemoryUserRepository implements UserRepository {
    public items: User[] = []

    async create(user: User): Promise<void> {
        await this.items.push(user)

        await DomainEvents.dispatchEventsForAggregate(user.id)
        console.log(user.domainEvents)
        console.log(user.id.toValue)
    }

    async findByEmail(email: string): Promise<User | null> {
        const item = this.items.find(item => item.props.email === email)

        if(!item) {
            return null
        }

        return item
    }

    async findById(id: string): Promise<User | null> {
        const item = this.items.find(item => item.id.toValue === id)

        if(!item) {
            return null
        }

        return item
    }

    async save(user: User): Promise<void> {
        const index = this.items.findIndex(item => item.id.toValue === user.id.toValue)

        this.items[index] = user
    }
}
import { User } from "../../enterprises/entities/user";

export abstract class UserRepository {
    abstract create(user: User): Promise<void>
    abstract findByEmail(email: string): Promise<User | null>
    abstract findById(id: string): Promise<User | null>
    abstract save(user: User): Promise<void>
}
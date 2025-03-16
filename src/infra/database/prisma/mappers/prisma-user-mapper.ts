import { User as PrismaUser, type Prisma } from "@prisma/client";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { User } from "src/domain/report/enterprises/entities/user";

export class PrismaUserMapper {
    static toDomain(user: PrismaUser): User {
        return User.create({
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            role: user.role
        }, new UniqueEntityId(user.id))
    }

    static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
        return {
            id: user.id.toValue,
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            role: user.role
        }
    }
}
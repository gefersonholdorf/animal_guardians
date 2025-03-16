import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { User, type UserProps } from "src/domain/report/enterprises/entities/user";

export function makeUser(
    override: Partial<UserProps>,
    id?: UniqueEntityId
) {
    const user = User.create({
        name: 'José Almeida',
        email: 'jose@gmail.com',
        password: 'senha123',
        phone: '478990789',
        role: 'COMMON',
        ...override
    }, id)

    return user
}
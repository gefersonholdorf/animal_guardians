import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { User, type UserProps } from "src/domain/report/enterprises/entities/user";

export function makeUser(
    override: Partial<UserProps>,
    id?: UniqueEntityId
) {
    const user = User.create({
        name: faker.person.fullName(),
        email: `${faker.person.firstName()}@gmail.com`,
        password: faker.lorem.text(),
        phone: faker.phone.number(),
        role: 'COMMON',
        ...override
    }, id)

    return user
}
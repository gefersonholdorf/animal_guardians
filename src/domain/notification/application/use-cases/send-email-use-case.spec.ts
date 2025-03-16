import { FakeSetEmail } from "test/email/fake-set-email";
import { InMemoryUserRepository } from "test/repositories/in-memory-user-repository";
import { beforeEach, describe, it, expect } from "vitest";
import { SendEmailUseCase } from "./send-email-use-case";
import { makeUser } from "test/factories/makeUser";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found-error";

let inMemoryUserRepository: InMemoryUserRepository
let setEmail: FakeSetEmail
let sut: SendEmailUseCase

describe('Send E-mail [UNIT]', () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        setEmail = new FakeSetEmail()
        sut = new SendEmailUseCase(setEmail, inMemoryUserRepository)
    })

    it('should be able to send email', async() => {
        const user = makeUser({email: 'almeida@gmail.com'}, new UniqueEntityId('user-01'))

        inMemoryUserRepository.create(user)

        const result = await sut.execute({
            userId: user.id.toValue,
            from: 'test@gmail.com',
            subject: 'User created',
            text: 'User created successfully!'
        })

        expect(result.isRight()).toBe(true)
    })

    it('should be able to return an error when reporting an invalid user', async() => {
        const user = makeUser({email: 'almeida@gmail.com'}, new UniqueEntityId('user-01'))

        inMemoryUserRepository.create(user)

        const result = await sut.execute({
            userId: 'user-02',
            from: 'test@gmail.com',
            subject: 'User created',
            text: 'User created successfully!'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })
})
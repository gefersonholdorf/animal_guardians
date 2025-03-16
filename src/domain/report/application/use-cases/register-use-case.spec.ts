import { FakeHashed } from "test/cryptography/fake-hashed";
import { InMemoryUserRepository } from "test/repositories/in-memory-user-repository";
import { beforeEach, describe, it, expect } from "vitest";
import { RegisterUseCase } from "./register-use-case";
import { User } from "../../enterprises/entities/user";
import { EmailAlreadyExistsError } from "src/core/errors/errors/email-already-exists-error";

let inMemoryUserRepository: InMemoryUserRepository
let hashed: FakeHashed
let sut: RegisterUseCase

describe('Register User [UNIT]', () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        hashed = new FakeHashed()
        sut = new RegisterUseCase(inMemoryUserRepository, hashed)
    })

    it('should be able to register a user', async() => {
        const user = User.create({
            name: 'José Almeida',
            email: 'almeida@gmail.com',
            password: 'senha123',
            role: 'COMMON',
            phone: '47991122465'
        })

        const result = await sut.execute(user)

        expect(result.isRight()).toBe(true)
        expect(inMemoryUserRepository.items).toHaveLength(1)
        expect(inMemoryUserRepository.items[0].props.password).toEqual('senha123-concat')
    })

    it('should be able to return an error when entering an existing email', async() => {
        const user1 = User.create({
            name: 'José Almeida',
            email: 'almeida@gmail.com',
            password: 'senha123',
            role: 'COMMON',
            phone: '47991122465'
        })

        const user2 = User.create({
            name: 'José Almeida',
            email: 'almeida@gmail.com',
            password: 'senha123',
            role: 'COMMON',
            phone: '47991122465'
        })

        await sut.execute(user1)
        const result2 = await sut.execute(user2)

        expect(result2.isLeft()).toBe(true)
        expect(result2.value).toBeInstanceOf(EmailAlreadyExistsError)
    })
})
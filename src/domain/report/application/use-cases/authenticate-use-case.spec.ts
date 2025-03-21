import { EmailAlreadyExistsError } from "src/core/errors/errors/email-already-exists-error";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { FakeHashed } from "test/cryptography/fake-hashed";
import { InMemoryUserRepository } from "test/repositories/in-memory-user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { User } from "../../enterprises/entities/user";
import { AuthenticateUseCase } from "./authenticate-use-case";
import { makeUser } from "test/factories/makeUser";
import { Hashed } from "../cryptography/hashed";
import { access } from "fs";
import { CredentialsInvalidError } from "src/core/errors/errors/credentials-invalid-error";

let inMemoryUserRepository: InMemoryUserRepository
let hashed: FakeHashed
let encrypter: FakeEncrypter
let sut: AuthenticateUseCase

describe('Authenticate User [UNIT]', () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        hashed = new FakeHashed()
        encrypter = new FakeEncrypter()
        sut = new AuthenticateUseCase(inMemoryUserRepository, hashed, encrypter)
    })

    it('should be able to register a user', async() => {
        inMemoryUserRepository.create(makeUser({email: 'almeida@gmail.com', password: await hashed.hash('senha123')}))

        const result = await sut.execute({
            email: 'almeida@gmail.com',
            password: 'senha123'
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            access_token: expect.any(String)
        })
    })

    it('should be able to return an error when entering a non-existent email', async() => {
        inMemoryUserRepository.create(makeUser({email: 'almeida@gmail.com', password: await hashed.hash('senha123')}))

        const result = await sut.execute({
            email: 'almeida@gmail.comm',
            password: 'senha123'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(CredentialsInvalidError)
    })

    it('should be able to return an error when entering a non-existent password', async() => {
        inMemoryUserRepository.create(makeUser({email: 'almeida@gmail.com', password: await hashed.hash('senha123')}))

        const result = await sut.execute({
            email: 'almeida@gmail.com',
            password: 'senha1234'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(CredentialsInvalidError)
    })
})
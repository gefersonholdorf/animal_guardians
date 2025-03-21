import { RegisterUseCase } from "src/domain/report/application/use-cases/register-use-case";
import { User } from "src/domain/report/enterprises/entities/user";
import { FakeHashed } from "test/cryptography/fake-hashed";
import { FakeSetEmail } from "test/email/fake-set-email";
import { InMemoryUserRepository } from "test/repositories/in-memory-user-repository";
import { waitFor } from "test/utils/wait-for";
import { beforeEach, describe, expect, it, vi, MockInstance } from "vitest";
import { SendEmailUseCase, type SendEmailUseCaseRequest, type SendEmailUseCaseResponse } from "../use-cases/send-email-use-case";
import { OnUserCreated } from "./on-user-created";

let inMemoryUserRepository: InMemoryUserRepository
let registerUseCase: RegisterUseCase
let hashed: FakeHashed
let setEmail: FakeSetEmail
let sendEmailUseCase: SendEmailUseCase

let sendNotificationExecuteSpy: ReturnType<typeof vi.spyOn>;


describe('On User created [UNIT]', () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        hashed = new FakeHashed()
        registerUseCase = new RegisterUseCase(inMemoryUserRepository, hashed)
        setEmail = new FakeSetEmail()
        sendEmailUseCase = new SendEmailUseCase(setEmail, inMemoryUserRepository)

        sendNotificationExecuteSpy = vi.spyOn(sendEmailUseCase, 'execute')
        new OnUserCreated(sendEmailUseCase)
    })

    it('should be able send a notification when an user is created', async() => {
        await registerUseCase.execute({
            name: 'José Almeida',
            email: 'almeida@gmail.com',
            password: 'senha123',
            role: 'COMMON',
            phone: '47991122465'
        })
        
        vi.waitFor(() => {
            expect(sendNotificationExecuteSpy).toHaveBeenCalled()
            console.log(inMemoryUserRepository.items[0].domainEvents)
        })
    })
})
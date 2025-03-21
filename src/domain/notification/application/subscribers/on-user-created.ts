import { Injectable } from "@nestjs/common";
import { DomainEvents } from "src/core/events/domain-events";
import { EventHandler } from "src/core/events/event-handler";
import { UserCreatedEvent } from "src/domain/report/enterprises/events/user-created-event";
import { SendEmailUseCase } from "../use-cases/send-email-use-case";

@Injectable()
export class OnUserCreated implements EventHandler {

    constructor(
        private sendEmailUseCase: SendEmailUseCase
    ) {
        this.setupSubscriptions()
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.sendUserNotification.bind(this), UserCreatedEvent.name)
    }

    private async sendUserNotification({ user }: UserCreatedEvent) {
        await this.sendEmailUseCase.execute({
            userId: user.id.toValue,
            from: 'email@gmail.com',
            subject: 'Usuário criado com sucesso',
            text: 'Usuário criado com sucesso, acesso ao sistema liberado...'
        })
    }
}
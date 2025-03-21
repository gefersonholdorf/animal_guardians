import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { DomainEvent } from "src/core/events/domain-event";
import { User } from "../entities/user";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserCreatedEvent implements DomainEvent {
    ocurredAt: Date;
    user: User

    constructor(user: User) {
        this.user = user
        this.ocurredAt = new Date()
    }

    getAggregateId(): UniqueEntityId {
        return this.user.id
    }

}
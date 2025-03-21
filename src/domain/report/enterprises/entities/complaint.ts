import { randomUUID } from "node:crypto";
import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Optional } from "src/core/types/optional";

export type StatusComplait = 'PENDING' | 'CANCEL' | 'APPROVED'

export interface ComplaintProps {
    id?: UniqueEntityId
    description: string
    location: string
    status: StatusComplait
    userId: UniqueEntityId
    moderatorId?: UniqueEntityId | null
    createdAt: Date
    updatedAt: Date
}

export class Complaint extends Entity<ComplaintProps> {

    get description() {
        return this.props.description
    }

    set description(description: string) {
        this.props.description = description

        this.setUpdated()
    }

    get location() {
        return this.props.location
    }

    set location(location: string) {
        this.props.location = location

        this.setUpdated()
    }

    get status() {
        return this.props.status
    }

    set status(status: StatusComplait) {
        this.props.status = status

        this.setUpdated()
    }

    get userId() {
        return this.props.userId
    }

    get moderatorId() {
        return this.props.moderatorId
    }

    set moderatorId(moderatorId) {
        this.props.moderatorId = moderatorId
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    private setUpdated() {
        this.props.updatedAt = new Date()
    }

    static create(
        props: Optional<ComplaintProps, 'createdAt' | 'updatedAt' | 'status' | 'moderatorId'>,
        id?: UniqueEntityId
    ) {
        const complait = new Complaint({
            description: props.description,
            location: props.location,
            status: props.status ?? 'PENDING',
            userId: props.userId,
            moderatorId: props.moderatorId ?? null,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        }, id ?? new UniqueEntityId())

        return complait
    }
}
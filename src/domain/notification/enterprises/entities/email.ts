import { Entity } from "src/core/entities/entity"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"

export interface EmailProps {
    from: string
    to: string
    subject: string
    text: string
}

export class Email extends Entity<EmailProps>{
    get from() {
        return this.props.from
    }

    get to() {
        return this.props.to
    }

    get subject() {
        return this.props.subject
    }

    get text() {
        return this.props.text
    }

    static create(
        props: EmailProps,
        id?: UniqueEntityId
    ) {
        const email = new Email({
            from: props.from,
            to: props.to,
            subject: props.subject,
            text: props.text
        }, id)

        return email
    }
}
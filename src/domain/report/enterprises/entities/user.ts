import { AggregateRoot } from "src/core/entities/aggregate-root";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Optional } from "src/core/types/optional";
import { UserCreatedEvent } from "../events/user-created-event";

export type RoleUser = 'COMMON' | 'MODERATOR' | 'ONG'

export interface UserProps {
    name: string
    email: string
    password: string
    phone: string
    role?: RoleUser
}

export class User extends AggregateRoot<UserProps> {
    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    get email() {
        return this.props.email
    }

    get password() {
        return this.props.password
    }

    set password(password: string) {
        this.props.password = password
    }

    get phone() {
        return this.props.phone
    }

    set phone(phone: string) {
        this.props.phone = phone
    }

    get role() {
        return this.props.role!
    }

    set role(role: RoleUser) {
        this.props.role = role
    }

    static create(
        props: Optional<UserProps, 'role'>,
        id?: UniqueEntityId 
    ) {
        const user = new User({
            name: props.name,
            email: props.email,
            password: props.password,
            phone: props.phone,
            role: props.role ?? 'COMMON'
        }, id)

        if(!id) {
            user.addDomainEvent(new UserCreatedEvent(user))
            console.log(user.domainEvents)
            console.log('Adicionado' + user.id.toValue)
        }

        return user
    }
}
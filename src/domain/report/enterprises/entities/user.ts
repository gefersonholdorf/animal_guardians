import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Optional } from "src/core/types/optional";

export type RoleUser = 'COMMON' | 'MODERATOR' | 'ONG'

export interface UserProps {
    id?: UniqueEntityId
    name: string
    email: string
    password: string
    phone: string
    role?: RoleUser
}

export class User extends Entity<UserProps> {
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
        })

        return user
    }
}
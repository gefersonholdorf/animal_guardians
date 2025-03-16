import { UniqueEntityId } from "./unique-entity-id"

export class Entity<Props> {
    private _id: UniqueEntityId
    private _props: Props

    get props() {
        return this._props
    }

    get id() {
        return this._id
    }

    constructor(props: Props, id?: string) {
        this._props = props,
        this._id = new UniqueEntityId(id)
    }
}
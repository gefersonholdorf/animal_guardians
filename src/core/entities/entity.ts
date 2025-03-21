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

    constructor(props: Props, id?: UniqueEntityId) {
        this._props = props,
        this._id = id ?? new UniqueEntityId()
    }

    public equals(entity: Entity<unknown>) {
        if(entity === this) {
            return true
        }

        if(entity.id === this._id) {
            return true
        }

        return false
    }
}
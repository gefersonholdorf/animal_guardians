import { randomUUID } from "node:crypto"

export class UniqueEntityId {
    private _id: string

    get toValue() {
        return this._id
    }

    constructor(value?: string) {
        this._id = value ?? randomUUID() 
    }
}
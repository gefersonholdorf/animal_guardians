import { ErrorUseCase } from "../error-use-case";

export class EmailAlreadyExistsError extends Error implements ErrorUseCase {
    constructor() {
        super('E-mail already exists.')
    }
}
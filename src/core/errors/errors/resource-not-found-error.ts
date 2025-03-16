import { ErrorUseCase } from "../error-use-case";

export class ResourceNotFoundError extends Error implements ErrorUseCase {
    constructor() {
        super('Resource not found.')
    }
}
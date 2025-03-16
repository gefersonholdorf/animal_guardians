import { ErrorUseCase } from "../error-use-case";

export class CredentialsInvalidError extends Error implements ErrorUseCase {
    constructor() {
        super('Credentials invalid.')
    }
}
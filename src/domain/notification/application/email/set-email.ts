import { Email } from "../../enterprises/entities/email";

export abstract class SetEmail {
    abstract sendEmail(email: Email): Promise<void>
}
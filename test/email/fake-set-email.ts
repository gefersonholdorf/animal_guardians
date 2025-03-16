import { SetEmail } from "src/domain/notification/application/email/set-email";
import { Email } from "src/domain/notification/enterprises/entities/email";

export class FakeSetEmail implements SetEmail {
    async sendEmail(email: Email): Promise<void> {
        console.log(`E-mail enviado`)
        console.log(`From: ${email.from}`)
        console.log(`To: ${email.to}`)
        console.log(`Subject: ${email.subject}`)
        console.log(`Text: ${email.text}`)
    }
}
import { Injectable } from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {

    constructor(private readonly mailerService: MailerService) {}

    private async generateChangePasswordCode(): Promise<string> {
        const minNumber = 100000
        const maxNumber = 999999
        const randomlyGeneratedCode = Math.floor(Math.random() * (maxNumber - minNumber)) + 1
        return randomlyGeneratedCode.toString()
    }

    async sendChangePasswordCode(email: string): Promise<void> {
        const changePasswordCode = await this.generateChangePasswordCode()
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Change Request</title>
            </head>
            <body>
                <h1>Password Change Request</h1>
                <p>Hello,</p>
                <p>You have requested to change your password. Please use the following code to proceed:</p>
                <p><strong>Activation Code:</strong>{changePasswordCode}</p>
                <p>If you did not request this change, please ignore this email.</p>
                <p>Best regards,</p>
                <p>Your Application Team</p>
            </body>
            </html>
        `;
        await this.mailerService.sendMail({
            to: email,
            html,
            template: "index"
        })
    }
}

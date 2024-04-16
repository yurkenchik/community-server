import { Module } from '@nestjs/common';
import {EmailService} from "./email.service";
import {MailerModule} from "@nestjs-modules/mailer";
import * as process from "node:process";
import {PugAdapter} from "@nestjs-modules/mailer/dist/adapters/pug.adapter";

@Module({
    providers: [EmailService],
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.MAIL_HOST,
                port: Number(process.env.MAIL_PORT),
                secure: false,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD
                }
            },
            defaults: {
                from: `"No Reply" <${process.env.MAIL_USER}>`
            },
            template: {
                adapter: new PugAdapter(),
                options: {
                    strict: true
                }
            }
        })
    ],
    exports: [
        EmailService
    ]
})
export class EmailModule {}

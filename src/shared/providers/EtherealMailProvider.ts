/* eslint-disable no-console */
import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IMailProvider from './interfaces/IMailProvider';
import IMailTemplateProvider from './interfaces/IMailTemplateProvider';
import IMailObject from './interfaces/objects/IMailObject';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
    private transporter: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        nodemailer.createTestAccount().then(testAccount => {
            this.transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                },
            });
        });
    }

    public async send({
        to,
        from,
        subject,
        templateData,
    }: IMailObject): Promise<void> {
        const info = await this.transporter.sendMail({
            from: {
                name: from?.name || 'GoBarber Team',
                address: from?.email || 'contact@gobarber.com',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
}

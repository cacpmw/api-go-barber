/* eslint-disable no-console */
import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from './interfaces/IMailProvider';
import IMailObject from './interfaces/objects/IMailObject';

export default class EtherealMailProvider implements IMailProvider {
    private transporter: Transporter;

    constructor() {
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

    public async send({ to, subject, text, html }: IMailObject): Promise<void> {
        const info = await this.transporter.sendMail({
            from: '"GoBarber Team" <team@gobarber.com>', // sender address
            to, // list of receivers 'bar@example.com, baz@example.com'
            subject, // Subject line
            text, // plain text body
            html, // html body
        });
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
}

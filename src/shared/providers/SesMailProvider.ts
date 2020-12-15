/* eslint-disable no-console */
import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import { inject, injectable } from 'tsyringe';
import mailconfig from '@config/mailconfig';
import IMailProvider from './interfaces/IMailProvider';
import IMailTemplateProvider from './interfaces/IMailTemplateProvider';
import IMailObject from './interfaces/objects/IMailObject';

@injectable()
export default class SesMailProvider implements IMailProvider {
    private transporter: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        this.transporter = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
                region: process.env.AWS_DEFAULT_REGION,
            }),
        });
    }

    public async send({
        to,
        from,
        subject,
        templateData,
    }: IMailObject): Promise<void> {
        const { name, email } = mailconfig.defaults.from;
        await this.transporter.sendMail({
            from: {
                name: from?.name || name,
                address: from?.email || email,
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });
    }
}

import { container } from 'tsyringe';
import { Request, Response } from 'express';
import SendPasswordResetEmailService from '@modules/users/services/SendPasswordResetEmailService';
import IMailObject from '@shared/providers/interfaces/objects/IMailObject';
import StatusCode from '@shared/infrastructure/http/status';

export default class ForgotPasswordController {
    public async store(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email } = request.body;
        const emailData: IMailObject = {
            to: email,
            subject: 'Your reset password link',
            text: "It looks like you've request a reset password link",
        };
        const sendPasswordResetEmail = container.resolve(
            SendPasswordResetEmailService,
        );
        await sendPasswordResetEmail.execute(emailData);
        return response.status(StatusCode.NoContent).json();
    }
}

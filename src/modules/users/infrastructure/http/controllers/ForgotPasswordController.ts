import { container } from 'tsyringe';
import { Request, Response } from 'express';
import SendPasswordResetEmailService from '@modules/users/services/SendPasswordResetEmailService';
import StatusCode from '@shared/infrastructure/http/status';

export default class ForgotPasswordController {
    public async store(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email } = request.body;
        const sendPasswordResetEmail = container.resolve(
            SendPasswordResetEmailService,
        );
        await sendPasswordResetEmail.execute(email);
        return response.status(StatusCode.NoContent).json();
    }
}

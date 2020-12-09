import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ResetForgotPasswordService from '@modules/users/services/ResetForgotPasswordService';
import StatusCode from '@shared/infrastructure/http/status';

export default class ResetPasswordController {
    public async store(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { password, token } = request.body;
        const resetForgotPasswordService = container.resolve(
            ResetForgotPasswordService,
        );
        await resetForgotPasswordService.execute({ password, token });
        return response.status(StatusCode.NoContent).json();
    }
}

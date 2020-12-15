import ShowUserDataService from '@modules/users/services/ShowUserDataService';
import UpdateUserDataService from '@modules/users/services/UpdateUserDataService';
import StatusCode from '@shared/infrastructure/http/status';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserDataController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, oldPassword, newPassword } = request.body;
        const updateUserDataService = container.resolve(UpdateUserDataService);

        const user = await updateUserDataService.execute({
            user_id,
            name,
            email,
            newPassword,
            oldPassword,
        });

        return response.status(StatusCode.Ok).json(classToClass(user));
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const showUserDataService = container.resolve(ShowUserDataService);
        const user = await showUserDataService.execute(user_id);

        return response.status(StatusCode.Ok).json(classToClass(user));
    }
}

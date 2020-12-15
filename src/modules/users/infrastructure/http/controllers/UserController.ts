import CreateUserService from '@modules/users/services/CreateUserService';
import ListAllUsersService from '@modules/users/services/ListAllUsersService';
import StatusCode from '@shared/infrastructure/http/status';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listAllUsersService = container.resolve(ListAllUsersService);
        const users = await listAllUsersService.execute();

        return response.status(StatusCode.Ok).json(classToClass(users));
    }

    public async store(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;
        const createUserService = container.resolve(CreateUserService);
        const user = await createUserService.execute({
            name,
            email,
            password,
        });

        return response.status(StatusCode.Created).json(classToClass(user));
    }
}

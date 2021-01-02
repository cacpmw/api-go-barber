import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import StatusCode from '@shared/infrastructure/http/status';
import { classToClass } from 'class-transformer';

export default class ProvidersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProvidersService = container.resolve(ListProvidersService);

        const providers = await listProvidersService.execute(request.user.id);

        return response.status(StatusCode.Ok).json(classToClass(providers));
    }
}

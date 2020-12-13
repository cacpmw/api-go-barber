import { Request, Response } from 'express';
import { container } from 'tsyringe';
import StatusCode from '@shared/infrastructure/http/status';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProvidersDayAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const provider_id = request.params.id;
        const { year, month, day } = request.body;
        const listProviderDayAvailabilityService = container.resolve(
            ListProviderDayAvailabilityService,
        );

        const providers = await listProviderDayAvailabilityService.execute({
            provider_id,
            year,
            month,
            day,
        });

        return response.status(StatusCode.Ok).json(providers);
    }
}

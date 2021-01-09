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
        const { year, month, day } = request.query;
        const listProviderDayAvailabilityService = container.resolve(
            ListProviderDayAvailabilityService,
        );

        const availability = await listProviderDayAvailabilityService.execute({
            day: Number(day),
            month: Number(month),
            provider_id,
            year: Number(year),
        });

        return response.status(StatusCode.Ok).json(availability);
    }
}

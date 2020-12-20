import { Request, Response } from 'express';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import StatusCode from '@shared/infrastructure/http/status';
import { container } from 'tsyringe';

export default class ProvidersDayAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const provider_id = request.params.id;
        const { year, month } = request.query;
        const listProviderMonthAvailabilityService = container.resolve(
            ListProviderMonthAvailabilityService,
        );

        const providers = await listProviderMonthAvailabilityService.execute({
            month: Number(month),
            provider_id,
            year: Number(year),
        });

        return response.status(StatusCode.Ok).json(providers);
    }
}

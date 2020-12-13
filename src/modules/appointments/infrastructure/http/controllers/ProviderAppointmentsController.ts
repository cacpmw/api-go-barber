import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import StatusCode from '@shared/infrastructure/http/status';

export default class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const provider_id = request.user.id;
        const { day, month, year } = request.body;
        const listProviderAppointmentsService = container.resolve(
            ListProviderAppointmentsService,
        );
        const appointments = await listProviderAppointmentsService.execute({
            day,
            month,
            provider_id,
            year,
        });
        return response.status(StatusCode.Ok).json(appointments);
    }
}

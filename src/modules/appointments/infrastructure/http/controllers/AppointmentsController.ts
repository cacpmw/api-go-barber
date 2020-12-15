import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentsRepository from '@modules/appointments/infrastructure/typeorm/repositories/AppointmentsRepository';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const appointmentRepository = new AppointmentsRepository();
        const appointments = await appointmentRepository.all();
        return response.status(200).json(appointments);
    }

    public async store(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { provider_id, date } = request.body;
        const createAppointmentService = container.resolve(
            CreateAppointmentService,
        );

        const appointment = await createAppointmentService.execute({
            provider_id,
            date,
            user_id,
        });

        return response.status(201).json(appointment);
    }
}

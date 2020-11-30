import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import AppointmentRepository from '@modules/appointments/infrastructure/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import authenticated from '@modules/users/infrastructure/http/middlewares/Authenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(authenticated);

appointmentsRouter.post('/', async (request: Request, response: Response) => {
    const { provider_id, date } = request.body;
    const createAppointmentService = container.resolve(
        CreateAppointmentService,
    );

    const parsedDate = parseISO(date);
    const appointment = await createAppointmentService.execute({
        provider_id,
        date: parsedDate,
    });

    return response.status(201).json(appointment);
});
appointmentsRouter.get('/', async (request: Request, response: Response) => {
    const appointmentRepository = new AppointmentRepository();
    const appointments = await appointmentRepository.all();
    return response.status(200).json(appointments);
});
export default appointmentsRouter;

import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import authenticated from '@modules/users/infrastructure/http/middlewares/Authenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(authenticated);
appointmentsRouter.post('/', async (request: Request, response: Response) => {
    const { provider_id, date } = request.body;
    const createAppointmentService = new CreateAppointmentService();

    const parsedDate = parseISO(date);
    const appointment = await createAppointmentService.execute({
        provider_id,
        date: parsedDate,
    });

    return response.status(201).json(appointment);
});
appointmentsRouter.get('/', async (request: Request, response: Response) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointments = await appointmentRepository.find();
    return response.status(200).json(appointments);
});
export default appointmentsRouter;

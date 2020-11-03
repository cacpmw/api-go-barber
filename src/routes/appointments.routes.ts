import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/createAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();
appointmentsRouter.post('/', (request: Request, response: Response) => {
    try {
        const { provider, date } = request.body;
        const createAppointmentService = new CreateAppointmentService(
            appointmentRepository,
        );

        const parsedDate = parseISO(date);
        const appointment = createAppointmentService.execute({
            provider,
            date: parsedDate,
        });

        return response.status(201).json(appointment);
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
});
appointmentsRouter.get('/', (request: Request, response: Response) => {
    return response.status(200).json(appointmentRepository.all());
});
export default appointmentsRouter;

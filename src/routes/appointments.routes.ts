import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/createAppointmentService';

const appointmentsRouter = Router();
appointmentsRouter.post('/', async (request: Request, response: Response) => {
    try {
        const { provider, date } = request.body;
        const createAppointmentService = new CreateAppointmentService();

        const parsedDate = parseISO(date);
        const appointment = await createAppointmentService.execute({
            provider,
            date: parsedDate,
        });

        return response.status(201).json(appointment);
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
});
appointmentsRouter.get('/', async (request: Request, response: Response) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointments = await appointmentRepository.find();
    return response.status(200).json(appointments);
});
export default appointmentsRouter;

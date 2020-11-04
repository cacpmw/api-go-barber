import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import RequestError from '../exceptions/RequestError';

class CreateAppointmentService {
    public async execute({
        provider_id,
        date,
    }: {
        provider_id: string;
        date: Date;
    }): Promise<Appointment> {
        const appointmentRepository = getCustomRepository(
            AppointmentsRepository,
        );
        const parsedDate = startOfHour(date);
        const appointmentInSameDate = await appointmentRepository.findByDate(
            parsedDate,
        );
        if (appointmentInSameDate) {
            throw new RequestError('Invalid Date');
        }
        const appointment = appointmentRepository.create({
            provider_id,
            date: parsedDate,
        });
        await appointmentRepository.save(appointment);
        return appointment;
    }
}

export default CreateAppointmentService;

import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import RequestError from '@shared/exceptions/RequestError';
import Appointment from '../infrastructure/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

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

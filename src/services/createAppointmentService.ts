import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

class CreateAppointmentService {
    public async execute({
        provider,
        date,
    }: {
        provider: string;
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
            throw Error('Invalid Date');
        }
        const appointment = appointmentRepository.create({
            provider,
            date: parsedDate,
        });
        await appointmentRepository.save(appointment);
        return appointment;
    }
}

export default CreateAppointmentService;

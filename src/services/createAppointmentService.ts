import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

class CreateAppointmentService {
    private appointmentRepository;

    constructor(appointmentRepository: AppointmentsRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public execute({
        provider,
        date,
    }: {
        provider: string;
        date: Date;
    }): Appointment {
        const parsedDate = startOfHour(date);
        const appointmentInSameDate = this.appointmentRepository.findByDate(
            parsedDate,
        );
        if (appointmentInSameDate) {
            throw Error('Invalid Date');
        }
        return this.appointmentRepository.create({
            provider,
            date: parsedDate,
        });
    }
}

export default CreateAppointmentService;

import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import RequestError from '@shared/exceptions/RequestError';
import Appointment from '../infrastructure/typeorm/entities/Appointment';
import IAppointmentRepository from '../interfaces/classes/IAppointmentRepository';
import IAppointmentObject from '../interfaces/objects/IAppointmentObject';

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentRepository: IAppointmentRepository,
    ) {}

    public async execute({
        provider_id,
        date,
    }: IAppointmentObject): Promise<Appointment> {
        const parsedDate = startOfHour(date);
        const appointmentInSameDate = await this.appointmentRepository.findByDate(
            parsedDate,
        );
        if (appointmentInSameDate) {
            throw new RequestError('Invalid Date');
        }
        const appointment = await this.appointmentRepository.create({
            provider_id,
            date: parsedDate,
        });
        return appointment;
    }
}

export default CreateAppointmentService;

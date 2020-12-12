import { isBefore, startOfHour } from 'date-fns';
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

    public async execute(data: IAppointmentObject): Promise<Appointment> {
        const parsedDate = startOfHour(data.date);
        if (isBefore(parsedDate, Date.now())) {
            throw new RequestError("Can't book an apointment in the past");
        }
        const appointmentInSameDate = await this.appointmentRepository.findByDate(
            parsedDate,
        );
        if (appointmentInSameDate) {
            throw new RequestError('Invalid Date');
        }
        const appointment = await this.appointmentRepository.create({
            provider_id: data.provider_id,
            date: parsedDate,
            user_id: data.user_id,
        });
        return appointment;
    }
}
export default CreateAppointmentService;

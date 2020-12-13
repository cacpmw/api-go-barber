import { format, isBefore, startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import RequestError from '@shared/exceptions/RequestError';
import INotificationRepository from '@modules/notifications/interfaces/classes/INotificationRepository';
import Appointment from '../infrastructure/typeorm/entities/Appointment';
import IAppointmentRepository from '../interfaces/classes/IAppointmentRepository';
import IAppointmentObject from '../interfaces/objects/IAppointmentObject';

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentRepository: IAppointmentRepository,
        @inject('NotificationsRepository')
        private notificationRepository: INotificationRepository,
    ) {}

    public async execute(data: IAppointmentObject): Promise<Appointment> {
        if (data.provider_id === data.user_id) {
            throw new RequestError("Can't book an appointment with yourself");
        }
        const parsedDate = startOfHour(data.date);
        if (isBefore(parsedDate, startOfHour(Date.now()))) {
            throw new RequestError("Can't book an appointment in the past");
        }
        const appointmentInSameDate = await this.appointmentRepository.findByDate(
            parsedDate,
        );
        if (appointmentInSameDate) {
            throw new RequestError(
                'There is already an appointment for this date',
            );
        }
        const appointment = await this.appointmentRepository.create({
            provider_id: data.provider_id,
            date: parsedDate,
            user_id: data.user_id,
        });
        const formatedDate = format(parsedDate, "MM/dd/yyyy 'at' HH:mm");
        await this.notificationRepository.create({
            recipient_id: data.provider_id,
            content: `New appointment for ${formatedDate}`,
        });
        return appointment;
    }
}
export default CreateAppointmentService;

import Appointment from '../../infrastructure/typeorm/entities/Appointment';
import IAppointmentObject from '../objects/IAppointmentObject';

export default interface IAppointmentRepository {
    create(data: IAppointmentObject): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    all(): Promise<Appointment[]>;
}

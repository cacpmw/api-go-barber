import Appointment from '../../infrastructure/typeorm/entities/Appointment';
import IAppointmentObject from '../objects/IAppointmentObject';

export default interface IAppointmentRepository {
    create(data: IAppointmentObject): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    all(): Promise<Appointment[]>;
    findAllAppointmentsFromProviderByMonth({
        user_id,
        month,
        year,
    }: {
        user_id: string;
        month: number;
        year: number;
    }): Promise<Appointment[]>;
    findAllAppointmentsFromProviderByDay({
        user_id,
        month,
        year,
    }: {
        user_id: string;
        month: number;
        year: number;
        day: number;
    }): Promise<Appointment[]>;
}

import Appointment from '../../infrastructure/typeorm/entities/Appointment';
import IAppointmentObject from '../objects/IAppointmentObject';

export default interface IAppointmentRepository {
    create(data: IAppointmentObject): Promise<Appointment>;
    findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined>;
    all(): Promise<Appointment[]>;
    findAllAppointmentsFromProviderByMonth({
        provider_id,
        month,
        year,
    }: {
        provider_id: string;
        month: number;
        year: number;
    }): Promise<Appointment[]>;
    findAllAppointmentsFromProviderByDay({
        provider_id,
        month,
        year,
    }: {
        provider_id: string;
        month: number;
        year: number;
        day: number;
    }): Promise<Appointment[]>;
}

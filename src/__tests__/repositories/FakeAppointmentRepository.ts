import IAppointmentRepository from '@modules/appointments/interfaces/classes/IAppointmentRepository';
import IAppointmentObject from '@modules/appointments/interfaces/objects/IAppointmentObject';
import Appointment from '@modules/appointments/infrastructure/typeorm/entities/Appointment';
import { uuid } from 'uuidv4';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';

class FakeAppointmentsRepository implements IAppointmentRepository {
    private appointments: Appointment[] = [];

    public async create(data: IAppointmentObject): Promise<Appointment> {
        const appointment = new Appointment();
        appointment.id = uuid();
        appointment.date = data.date;
        appointment.provider_id = data.provider_id;
        appointment.user_id = data.user_id;
        this.appointments.push(appointment);
        return appointment;
    }

    public async findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined> {
        const appointment = this.appointments.find(
            currentAppointment =>
                isEqual(currentAppointment.date, date) &&
                currentAppointment.provider_id === provider_id,
        );
        return appointment;
    }

    public async all(): Promise<Appointment[]> {
        return this.appointments;
    }

    public async findAllAppointmentsFromProviderByMonth({
        provider_id,
        month,
        year,
    }: {
        provider_id: string;
        month: number;
        year: number;
    }): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            currentAppointment =>
                currentAppointment.provider_id === provider_id &&
                getMonth(currentAppointment.date) + 1 === month &&
                getYear(currentAppointment.date) === year,
        );
        return appointments;
    }

    public async findAllAppointmentsFromProviderByDay({
        provider_id,
        month,
        year,
        day,
    }: {
        provider_id: string;
        month: number;
        year: number;
        day: number;
    }): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            currentAppointment =>
                currentAppointment.provider_id === provider_id &&
                getDate(currentAppointment.date) === day &&
                getMonth(currentAppointment.date) + 1 === month && // months start at 0 hence the + 1
                getYear(currentAppointment.date) === year,
        );
        return appointments;
    }
}

export default FakeAppointmentsRepository;

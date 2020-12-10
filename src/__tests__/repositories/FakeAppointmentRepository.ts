import IAppointmentRepository from '@modules/appointments/interfaces/classes/IAppointmentRepository';
import IAppointmentObject from '@modules/appointments/interfaces/objects/IAppointmentObject';
import Appointment from '@modules/appointments/infrastructure/typeorm/entities/Appointment';
import { uuid } from 'uuidv4';
import { getMonth, getYear, isEqual } from 'date-fns';

class FakeAppointmentsRepository implements IAppointmentRepository {
    private appointments: Appointment[] = [];

    public async create(data: IAppointmentObject): Promise<Appointment> {
        const appointment = new Appointment();
        appointment.id = uuid();
        appointment.date = data.date;
        appointment.provider_id = data.provider_id;
        this.appointments.push(appointment);
        return appointment;
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const appointment = this.appointments.find(currentAppointment =>
            isEqual(currentAppointment.date, date),
        );
        return appointment;
    }

    public async all(): Promise<Appointment[]> {
        return this.appointments;
    }

    public async findAllAppointmentsFromProviderByMonth({
        user_id,
        month,
        year,
    }: {
        user_id: string;
        month: number;
        year: number;
    }): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            currentAppointment =>
                currentAppointment.provider_id === user_id &&
                getMonth(currentAppointment.date) + 1 === month &&
                getYear(currentAppointment.date) === year,
        );
        return appointments;
    }
}

export default FakeAppointmentsRepository;

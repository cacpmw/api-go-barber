import IAppointmentRepository from '@modules/appointments/interfaces/classes/IAppointmentRepository';
import IAppointmentObject from '@modules/appointments/interfaces/objects/IAppointmentObject';
import Appointment from '@modules/appointments/infrastructure/typeorm/entities/Appointment';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

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
}

export default FakeAppointmentsRepository;

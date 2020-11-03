import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentsRepository {
    private appointments: Appointment[] = [];

    public create({
        provider,
        date,
    }: {
        provider: string;
        date: Date;
    }): Appointment {
        const appointment = new Appointment({
            provider,
            date,
        });
        this.appointments.push(appointment);
        return appointment;
    }

    public all(): Appointment[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        const appointment = this.appointments.find(element => {
            return isEqual(date, element.date);
        });

        return appointment || null;
    }
}

export default AppointmentsRepository;

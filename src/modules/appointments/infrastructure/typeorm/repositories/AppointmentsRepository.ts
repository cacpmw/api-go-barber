import IAppointmentRepository from '@modules/appointments/interfaces/classes/IAppointmentRepository';
import IAppointmentObject from '@modules/appointments/interfaces/objects/IAppointmentObject';
import { getRepository, Raw, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async create(data: IAppointmentObject): Promise<Appointment> {
        const appointment = this.ormRepository.create(data);
        await this.ormRepository.save(appointment);
        return appointment;
    }

    public async findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined> {
        const appointment = await this.ormRepository.findOne({
            where: { date, provider_id },
        });

        return appointment;
    }

    public async all(): Promise<Appointment[]> {
        return this.ormRepository.find();
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
        /** Adding 0 to left of the number for 0 through 9.
         * It is required for database comparison
         */
        const parsedMonth = month.toString().padStart(2, '0');
        /** Querying appointments that match a user_id and a date.
         * It is necessary to cast the dateFieldName to char
         * in order to campare the dates directly in the database
         */

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
                ),
            },
        });

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
        /** Adding 0 to left of the number for 0 through 9.
         * It is required for database comparison
         */
        const parsedMonth = String(month).padStart(2, '0');
        const parsedDay = String(day).padStart(2, '0');
        /** Querying appointments that match a user_id and a date.
         * It is necessary to cast the dateFieldName to char
         * in order to campare the dates directly in the database
         */
        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
                ),
            },
            relations: ['user'],
        });
        return appointments;
    }
}

export default AppointmentsRepository;

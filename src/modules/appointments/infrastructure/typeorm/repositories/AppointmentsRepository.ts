import IAppointmentRepository from '@modules/appointments/interfaces/classes/IAppointmentRepository';
import IAppointmentObject from '@modules/appointments/interfaces/objects/IAppointmentObject';
import { getRepository, Repository } from 'typeorm';
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

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const appointment = await this.ormRepository.findOne({
            where: { date },
        });

        return appointment;
    }

    public async all(): Promise<Appointment[]> {
        return this.ormRepository.find();
    }
}

export default AppointmentsRepository;

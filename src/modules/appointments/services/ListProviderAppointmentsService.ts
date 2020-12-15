import ICacheProvider from '@shared/providers/interfaces/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import Appointment from '../infrastructure/typeorm/entities/Appointment';
import IAppointmentRepository from '../interfaces/classes/IAppointmentRepository';

@injectable()
export default class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
        day,
    }: {
        provider_id: string;
        year: number;
        month: number;
        day: number;
    }): Promise<Appointment[]> {
        const appointments = await this.appointmentsRepository.findAllAppointmentsFromProviderByDay(
            {
                provider_id,
                year,
                month,
                day,
            },
        );
        return appointments;
    }
}

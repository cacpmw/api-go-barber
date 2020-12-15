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
        const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;
        let appointments = await this.cacheProvider.get<Appointment[]>(
            cacheKey,
        );
        if (!appointments) {
            appointments = await this.appointmentsRepository.findAllAppointmentsFromProviderByDay(
                {
                    provider_id,
                    year,
                    month,
                    day,
                },
            );
            await this.cacheProvider.set(cacheKey, appointments);
        }

        return appointments;
    }
}

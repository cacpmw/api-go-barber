import { getDate, getDaysInMonth } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentRepository from '../interfaces/classes/IAppointmentRepository';
import IMonthAvailabilityObject from '../interfaces/objects/IMonthAvailabilityObject';

@injectable()
export default class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentRepository,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
    }: {
        provider_id: string;
        year: number;
        month: number;
    }): Promise<IMonthAvailabilityObject[]> {
        const appointments = await this.appointmentsRepository.findAllAppointmentsFromProviderByMonth(
            {
                provider_id,
                year,
                month,
            },
        );
        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));
        /** Creating an array with the number of days
         *  for the particular month */
        const eachDay = Array.from(
            {
                length: numberOfDaysInMonth,
            },
            (value, index) => index + 1,
        );
        /** Iterating through each day and checking if
         * there are any appointments for that particular day */
        const availability = eachDay.map(day => {
            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            });
            /** A day may have at maximum 10 appointments.
             * If appointmentsInDay.length is < 10 it will be
             * an available day
             */
            return {
                day,
                available: appointmentsInDay.length < 10,
            };
        });
        return availability;
    }
}

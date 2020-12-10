import { getDate, getDaysInMonth } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentRepository from '../interfaces/classes/IAppointmentRepository';

@injectable()
export default class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentRepository,
    ) {}

    public async execute({
        user_id,
        year,
        month,
    }: {
        user_id: string;
        year: number;
        month: number;
    }): Promise<Array<{ day: number; available: boolean }>> {
        const appointments = await this.appointmentsRepository.findAllAppointmentsFromProviderByMonth(
            {
                user_id,
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
            const appointmentsInDay = appointments.filter(
                currentAppointment => {
                    return getDate(currentAppointment.date) === day;
                },
            );
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

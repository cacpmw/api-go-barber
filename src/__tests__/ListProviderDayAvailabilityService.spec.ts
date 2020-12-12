import 'reflect-metadata';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from './repositories/FakeAppointmentRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
            fakeAppointmentsRepository,
        );
    });
    it('should be able to list day availability', async () => {
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 8, 0, 0),
            provider_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
            user_id: '4f7f4360-7f1a-420f-87fc-3f5c272deff7',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 14, 0, 0),
            provider_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
            user_id: '4f7f4360-7f1a-420f-87fc-3f5c272deff7',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 21, 17, 0, 0),
            provider_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
            user_id: '4f7f4360-7f1a-420f-87fc-3f5c272deff7',
        });

        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 20, 11).getTime();
        });

        const availability = await listProviderDayAvailabilityService.execute({
            provider_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
            month: 5,
            year: 2020,
            day: 20,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 11, available: false },
                { hour: 12, available: true },
                { hour: 13, available: true },
                { hour: 14, available: false },
                { hour: 15, available: true },
                { hour: 16, available: true },
                { hour: 17, available: true },
            ]),
        );
    });
});

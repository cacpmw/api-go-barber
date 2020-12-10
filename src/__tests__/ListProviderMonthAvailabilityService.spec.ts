import 'reflect-metadata';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from './repositories/FakeAppointmentRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
            fakeAppointmentsRepository,
        );
    });
    it('should be able to list month availability', async () => {
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 8, 0, 0),
            provider_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 9, 0, 0),
            provider_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 10, 0, 0),
            provider_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 11, 0, 0),
            provider_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 12, 0, 0),
            provider_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 13, 0, 0),
            provider_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 14, 0, 0),
            provider_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 15, 0, 0),
            provider_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 16, 0, 0),
            provider_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 17, 0, 0),
            provider_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 21, 17, 0, 0),
            provider_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
        });

        const availability = await listProviderMonthAvailabilityService.execute(
            {
                user_id: '3f7f4360-7f1a-420f-87fc-3f5c272deff7',
                month: 5,
                year: 2020,
            },
        );

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 19, available: true },
                { day: 20, available: false },
                { day: 21, available: true },
                { day: 22, available: true },
            ]),
        );
    });
});

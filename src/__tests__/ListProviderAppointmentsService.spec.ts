import 'reflect-metadata';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import FakeAppointmentsRepository from './repositories/FakeAppointmentRepository';
import FakeCacheProvider from './providers/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointmentsService = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider,
        );
    });
    it("should be able to list a provider's appointments for a given day", async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            user_id: 'user_id',
            date: new Date(2020, 11, 13, 8, 0),
        });
        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            user_id: 'user_id',
            date: new Date(2020, 11, 13, 9, 0),
        });
        const appointment3 = await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            user_id: 'user_id',
            date: new Date(2020, 11, 13, 11, 0),
        });

        const appointments = await listProviderAppointmentsService.execute({
            provider_id: 'provider_id',
            day: 13,
            month: 12,
            year: 2020,
        });

        expect(appointments).toEqual([
            appointment1,
            appointment2,
            appointment3,
        ]);
    });
});

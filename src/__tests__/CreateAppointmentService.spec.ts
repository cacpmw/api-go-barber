import 'reflect-metadata';
import IAppointmentObject from '@modules/appointments/interfaces/objects/IAppointmentObject';
import FakeCreateAppointmentRepository from './repositories/FakeAppointmentRepository';
import CreateAppointmentService from '../modules/appointments/services/CreateAppointmentService';
import FakeNotificationsRepository from './repositories/FakeNotificationsRepository';
import FakeCacheProvider from './providers/FakeCacheProvider';

let fakeCreateAppointmentRepository: FakeCreateAppointmentRepository;
let createAppointService: CreateAppointmentService;
let fakeCacheProvider: FakeCacheProvider;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeCreateAppointmentRepository = new FakeCreateAppointmentRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        createAppointService = new CreateAppointmentService(
            fakeCreateAppointmentRepository,
            fakeNotificationsRepository,
            fakeCacheProvider,
        );
    });
    it('should be able to create a new Appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        const appointment = await createAppointService.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: '12334234jrsfsdffsdf',
            user_id: 'hjasgdad781263712648',
        });
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('12334234jrsfsdffsdf');
        expect(appointment.user_id).toBe('hjasgdad781263712648');
        expect(appointment.date).toBeDefined();
    });
    it('should not be able to create two Appointments with the same date', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        const date = new Date(2020, 4, 10, 14);
        const data: IAppointmentObject = {
            date,
            provider_id: '12334234jrsfsdffsdf',
            user_id: 'hjasgdad781263712648',
        };
        await createAppointService.execute(data);

        await expect(createAppointService.execute(data)).rejects.toHaveProperty(
            'message',
            'There is already an appointment for this date',
        );
    });
    it('should not be able to create an appointment in the past', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        await expect(
            createAppointService.execute({
                date: new Date(2020, 4, 10, 11),
                provider_id: '12334234jrsfsdffsdf',
                user_id: 'hjasgdad781263712648',
            }),
        ).rejects.toHaveProperty(
            'message',
            "Can't book an appointment in the past",
        );
    });

    it('should not be able to create an appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        await expect(
            createAppointService.execute({
                date: new Date(2020, 4, 10, 13),
                provider_id: '12334234jrsfsdffsdf',
                user_id: '12334234jrsfsdffsdf',
            }),
        ).rejects.toHaveProperty(
            'message',
            "Can't book an appointment with yourself",
        );
    });
});

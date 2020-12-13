import 'reflect-metadata';
import IAppointmentObject from '@modules/appointments/interfaces/objects/IAppointmentObject';
import RequestError from '@shared/exceptions/RequestError';
import FakeCreateAppointmentRepository from './repositories/FakeAppointmentRepository';
import CreateAppointmentService from '../modules/appointments/services/CreateAppointmentService';

let fakeCreateAppointmentRepository: FakeCreateAppointmentRepository;
let createAppointService: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeCreateAppointmentRepository = new FakeCreateAppointmentRepository();
        createAppointService = new CreateAppointmentService(
            fakeCreateAppointmentRepository,
        );
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
    });
    it('should be able to create a new Appointment', async () => {
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
        const date = new Date(2020, 4, 10, 14);
        const data: IAppointmentObject = {
            date,
            provider_id: '12334234jrsfsdffsdf',
            user_id: 'hjasgdad781263712648',
        };
        await createAppointService.execute(data);

        await expect(createAppointService.execute(data)).rejects.toBeInstanceOf(
            RequestError,
        );
    });
    it('should not be able to create an appointment in the past', async () => {
        await expect(
            createAppointService.execute({
                date: new Date(2020, 4, 10, 11),
                provider_id: '12334234jrsfsdffsdf',
                user_id: 'hjasgdad781263712648',
            }),
        ).rejects.toBeInstanceOf(RequestError);
    });

    it('should not be able to create an appointment with same user as provider', async () => {
        await expect(
            createAppointService.execute({
                date: new Date(2020, 4, 10, 13),
                provider_id: '12334234jrsfsdffsdf',
                user_id: '12334234jrsfsdffsdf',
            }),
        ).rejects.toBeInstanceOf(RequestError);
    });
});

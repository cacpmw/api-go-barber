import IAppointmentObject from '@modules/appointments/interfaces/objects/IAppointmentObject';
import RequestError from '@shared/exceptions/RequestError';
import FakeCreateAppointmentRepository from '../../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from '../CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be able to create a new Appointment', async () => {
        const fakeCreateAppointmentRepository = new FakeCreateAppointmentRepository();
        const createAppointService = new CreateAppointmentService(
            fakeCreateAppointmentRepository,
        );
        const data: IAppointmentObject = {
            date: new Date(),
            provider_id: '12334234jrsfsdffsdf',
        };

        const appointment = await createAppointService.execute(data);
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('12334234jrsfsdffsdf');
        expect(appointment.date).toBeDefined();
    });
    it('should not be able to create two Appointments with the same date', async () => {
        const fakeCreateAppointmentRepository = new FakeCreateAppointmentRepository();
        const createAppointService = new CreateAppointmentService(
            fakeCreateAppointmentRepository,
        );
        const date = new Date(2020, 4, 10, 11);
        const data: IAppointmentObject = {
            date,
            provider_id: '12334234jrsfsdffsdf',
        };
        await createAppointService.execute(data);

        expect(createAppointService.execute(data)).rejects.toBeInstanceOf(
            RequestError,
        );
    });
});

import { container } from 'tsyringe';
import IAppointmentRepository from '@modules/appointments/interfaces/classes/IAppointmentRepository';
import AppointmentsRepository from '@modules/appointments/infrastructure/typeorm/repositories/AppointmentsRepository';
import IUserRepository from '@modules/users/interfaces/classes/IUserRepository';
import UsersRepository from '@modules/users/infrastructure/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);
container.registerSingleton<IUserRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IAppointmentRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);

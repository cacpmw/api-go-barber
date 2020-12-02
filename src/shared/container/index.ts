import { container } from 'tsyringe';
import IAppointmentRepository from '@modules/appointments/interfaces/classes/IAppointmentRepository';
import AppointmentsRepository from '@modules/appointments/infrastructure/typeorm/repositories/AppointmentsRepository';
import IUserRepository from '@modules/users/interfaces/classes/IUserRepository';
import UsersRepository from '@modules/users/infrastructure/typeorm/repositories/UsersRepository';
import IStorageProvider from '../repositories/interfaces/IStorageRepository';
import DiskStorageRepository from '../repositories/DiskStorageRepository';

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
container.registerSingleton<IStorageProvider>(
    'StorageRepository',
    DiskStorageRepository,
);

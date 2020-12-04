import { container } from 'tsyringe';
import IAppointmentRepository from '@modules/appointments/interfaces/classes/IAppointmentRepository';
import AppointmentsRepository from '@modules/appointments/infrastructure/typeorm/repositories/AppointmentsRepository';
import IUserRepository from '@modules/users/interfaces/classes/IUserRepository';
import UsersRepository from '@modules/users/infrastructure/typeorm/repositories/UsersRepository';
import IMailRepository from '@shared/repositories/interfaces/IMailRepository';
import MailRepository from '@shared/repositories/MailRepository';
import ICryptographRepository from '@shared/repositories/interfaces/ICryptographRepository';
import CryptographRepository from '@shared/repositories/CryptographRepository';
import IStorageRepository from '../repositories/interfaces/IStorageRepository';
import DiskStorageRepository from '../repositories/DiskStorageRepository';
// import IUserTokenRepository from '@modules/users/interfaces/classes/IUserTokenRepository';

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
container.registerSingleton<IStorageRepository>(
    'StorageRepository',
    DiskStorageRepository,
);
container.registerSingleton<IMailRepository>('MailRepository', MailRepository);
container.registerSingleton<ICryptographRepository>(
    'ICryptographRepository',
    CryptographRepository,
);
// container.registerSingleton<IUserTokenRepository>('UserTokensRepository', UserTokens);

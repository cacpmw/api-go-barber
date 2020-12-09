import { container } from 'tsyringe';
import IAppointmentRepository from '@modules/appointments/interfaces/classes/IAppointmentRepository';
import AppointmentsRepository from '@modules/appointments/infrastructure/typeorm/repositories/AppointmentsRepository';
import IUserRepository from '@modules/users/interfaces/classes/IUserRepository';
import UsersRepository from '@modules/users/infrastructure/typeorm/repositories/UsersRepository';
import IMailRepository from '@shared/providers/interfaces/IMailProvider';
import EtherealMailProvider from '@shared/providers/EtherealMailProvider';
import IUserTokenRepository from '@modules/users/interfaces/classes/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infrastructure/typeorm/repositories/UserTokensRepository';
import CryptographProvider from '@shared/providers/CryptographProvider';
import ICryptographProvider from '@shared/providers/interfaces/ICryptographProvider';
import HandlebarsMailTemplateProvider from '@shared/providers/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from '@shared/providers/interfaces/IMailTemplateProvider';
import IStorageRepository from '../providers/interfaces/IStorageProvider';
import DiskStorageRepository from '../providers/DiskStorageProvider';

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

container.registerSingleton<ICryptographProvider>(
    'CryptographProvider',
    CryptographProvider,
);
container.registerSingleton<IUserTokenRepository>(
    'UserTokensRepository',
    UserTokensRepository,
);
container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
);
container.registerInstance<IMailRepository>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
);

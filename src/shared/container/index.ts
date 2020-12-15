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
import INotificationRepository from '@modules/notifications/interfaces/classes/INotificationRepository';
import NotificationsRepository from '@modules/notifications/infrastructure/typeorm/repositories/NotificationsRepository';
import mailconfig from '@config/mailconfig';
import SesMailProvider from '@shared/providers/SesMailProvider';

import '@shared/providers/storage/StorageResolver';
import '@shared/providers/cache/CacheResolver';

container.registerSingleton<INotificationRepository>(
    'NotificationsRepository',
    NotificationsRepository,
);
container.registerSingleton<IAppointmentRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);
container.registerSingleton<IUserRepository>(
    'UsersRepository',
    UsersRepository,
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
    mailconfig.driver === 'ethereal'
        ? container.resolve(EtherealMailProvider)
        : container.resolve(SesMailProvider),
);

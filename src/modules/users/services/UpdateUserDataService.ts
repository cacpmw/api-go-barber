import { inject, injectable } from 'tsyringe';
import ICryptographProvider from '@shared/providers/interfaces/ICryptographProvider';
import RequestError from '@shared/exceptions/RequestError';
import StatusCode from '@shared/infrastructure/http/status';
import ICacheProvider from '@shared/providers/interfaces/ICacheProvider';
import IUserRepository from '../interfaces/classes/IUserRepository';
import User from '../infrastructure/typeorm/entities/User';

@injectable()
export default class UpdateUserDataService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
        @inject('CryptographProvider')
        private cryptographProvider: ICryptographProvider,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        user_id,
        email,
        name,
        newPassword,
        oldPassword,
    }: {
        user_id: string;
        name?: string;
        email?: string;
        oldPassword?: string;
        newPassword?: string;
    }): Promise<User> {
        const user = await this.userRepository.findById(user_id);
        if (!user) {
            throw new RequestError('User not found', StatusCode.NotFound);
        }
        if (email) {
            const userByEmail = await this.userRepository.findByEmail(email);
            if (userByEmail && userByEmail.id !== user.id) {
                throw new RequestError(
                    'Email already exists',
                    StatusCode.Forbidden,
                );
            }
        }

        if (newPassword && !oldPassword) {
            throw new RequestError('Enter old password', StatusCode.Forbidden);
        }

        user.name = name || user.name;
        user.email = email || user.email;
        if (newPassword && oldPassword) {
            const checkOldPassword = await this.cryptographProvider.compare(
                oldPassword,
                user.password,
            );
            if (!checkOldPassword) {
                throw new RequestError(
                    'Old password does not match',
                    StatusCode.Forbidden,
                );
            }
            user.password = await this.cryptographProvider.hash(newPassword, 8);
        }
        this.userRepository.save(user);
        await this.cacheProvider.invalidateWithPrefix('providers-list');
        return user;
    }
}

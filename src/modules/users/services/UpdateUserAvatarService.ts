import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infrastructure/typeorm/entities/User';
import RequestError from '@shared/exceptions/RequestError';
import IStorageProvider from '@shared/providers/interfaces/IStorageProvider';
import ICacheProvider from '@shared/providers/interfaces/ICacheProvider';
import IUserRepository from '../interfaces/classes/IUserRepository';

@injectable()
export default class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        user_id,
        avatarFilename,
    }: {
        user_id: string;
        avatarFilename: string;
    }): Promise<User> {
        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new RequestError('User not found', 404);
        }

        if (user.avatar) {
            this.storageProvider.delete(user.avatar);
        }
        const completeFilePath = await this.storageProvider.save(
            avatarFilename,
        );
        user.avatar = completeFilePath;
        await this.userRepository.save(user);
        await this.cacheProvider.invalidateWithPrefix('providers-list');
        return user;
    }
}

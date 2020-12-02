import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infrastructure/typeorm/entities/User';
import RequestError from '@shared/exceptions/RequestError';
import IStorageRepository from '@shared/repositories/interfaces/IStorageRepository';
import IUserRepository from '../interfaces/classes/IUserRepository';

@injectable()
export default class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
        @inject('StorageRepository')
        private storageRepository: IStorageRepository,
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
            this.storageRepository.delete(user.avatar);
        }
        const completeFilePath = await this.storageRepository.save(
            avatarFilename,
        );
        user.avatar = completeFilePath;
        await this.userRepository.save(user);
        return user;
    }
}

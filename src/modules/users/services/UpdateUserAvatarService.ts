import { inject, injectable } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import multerconfig from '@config/multerconfig';
import User from '@modules/users/infrastructure/typeorm/entities/User';
import RequestError from '@shared/exceptions/RequestError';
import IUserRepository from '../interfaces/classes/IUserRepository';

@injectable()
export default class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
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
            const userAvatarPath = path.join(
                multerconfig.directory,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(userAvatarPath);
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarPath);
            }
        }
        user.avatar = avatarFilename;
        await this.userRepository.save(user);
        return user;
    }
}

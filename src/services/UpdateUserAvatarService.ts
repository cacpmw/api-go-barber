import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import multerconfig from '../config/multerconfig';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import RequestError from '../exceptions/RequestError';

export default class UpdateUserAvatarService {
    public async execute({
        user_id,
        avatarFilename,
    }: {
        user_id: string;
        avatarFilename: string;
    }): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne(user_id);

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
        userRepository.save(user);
        return user;
    }
}

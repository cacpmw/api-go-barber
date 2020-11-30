import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/users/infrastructure/typeorm/entities/User';
import RequestError from '@shared/exceptions/RequestError';
import UsersRepository from '../repositories/UsersRepository';

export default class CreateUserService {
    public async execute({
        name,
        email,
        password,
    }: {
        name: string;
        email: string;
        password: string;
    }): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);
        const checkUserExists = await userRepository.findOne({
            where: { email },
        });
        if (checkUserExists) {
            throw new RequestError('Email already used');
        }
        const hashedPassword = await hash(password, 8);
        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        await userRepository.save(user);
        return user;
    }
}

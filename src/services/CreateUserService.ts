import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import RequestError from '../exceptions/RequestError';

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

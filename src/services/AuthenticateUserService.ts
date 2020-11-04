import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import authConfig from '../config/authconfig';
import RequestError from '../exceptions/RequestError';

export default class AuthenticateUserService {
    public async execute({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<{ user: User; token: string }> {
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new RequestError('Invalid Credentials', 401);
        }
        const passwordMatched = await compare(password, user.password);
        if (!passwordMatched) {
            throw new RequestError('Invalid Credentials', 401);
        }
        const { secret, expiresIn } = authConfig.jwt;
        const token = sign(
            {
                name: user.name,
                avatar: user.avatar,
            },
            secret,
            {
                subject: user.id,
                expiresIn,
            },
        );
        return { user, token };
    }
}

import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/authconfig';
import RequestError from '@shared/exceptions/RequestError';
import ICryptographProvider from '@shared/providers/interfaces/ICryptographProvider';
import User from '../infrastructure/typeorm/entities/User';
import IUserRepository from '../interfaces/classes/IUserRepository';
import IAuthenticationObject from '../interfaces/objects/IAuthenticationObject';

@injectable()
export default class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
        @inject('CryptographProvider')
        private cryptographProvider: ICryptographProvider,
    ) {}

    public async execute({
        email,
        password,
    }: IAuthenticationObject): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new RequestError('Invalid Credentials', 401);
        }
        const passwordMatched = await this.cryptographProvider.compare(
            password,
            user.password,
        );

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

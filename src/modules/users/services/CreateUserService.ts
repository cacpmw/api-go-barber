import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infrastructure/typeorm/entities/User';
import RequestError from '@shared/exceptions/RequestError';
import ICacheProvider from '@shared/providers/interfaces/ICacheProvider';
import IUserObject from '../interfaces/objects/IUserObject';
import IUserRepository from '../interfaces/classes/IUserRepository';

@injectable()
export default class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        name,
        email,
        password,
    }: IUserObject): Promise<User> {
        const checkUserExists = await this.userRepository.findByEmail(email);
        if (checkUserExists) {
            throw new RequestError('Email already used');
        }
        const hashedPassword = await hash(password, 8);
        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        await this.cacheProvider.invalidateWithPrefix('providers-list');
        return user;
    }
}

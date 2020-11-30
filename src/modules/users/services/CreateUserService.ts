import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infrastructure/typeorm/entities/User';
import RequestError from '@shared/exceptions/RequestError';
import IUserObject from '../interfaces/objects/IUserObject';
import IUserRepository from '../interfaces/classes/IUserRepository';

@injectable()
export default class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
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
        return user;
    }
}

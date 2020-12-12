import { inject, injectable } from 'tsyringe';
import IUserRepository from '../interfaces/classes/IUserRepository';
import User from '../infrastructure/typeorm/entities/User';

@injectable()
export default class ListAllUsersService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute(): Promise<User[]> {
        const users = await this.userRepository.all();
        return users;
    }
}

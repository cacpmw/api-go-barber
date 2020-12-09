import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infrastructure/typeorm/entities/User';
import IUserRepository from '@modules/users/interfaces/classes/IUserRepository';

@injectable()
export default class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute(except_user_id: string): Promise<User[]> {
        const users = await this.userRepository.except(except_user_id);
        return users;
    }
}

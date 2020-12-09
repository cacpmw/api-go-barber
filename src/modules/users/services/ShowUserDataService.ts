import { inject, injectable } from 'tsyringe';
import RequestError from '@shared/exceptions/RequestError';
import StatusCode from '@shared/infrastructure/http/status';
import IUserRepository from '../interfaces/classes/IUserRepository';
import User from '../infrastructure/typeorm/entities/User';

@injectable()
export default class ShowUserDataService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute(user_id: string): Promise<User> {
        const user = await this.userRepository.findById(user_id);
        if (!user) {
            throw new RequestError('User not found', StatusCode.NotFound);
        }
        return user;
    }
}

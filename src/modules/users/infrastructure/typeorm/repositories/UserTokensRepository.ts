import IUserTokenRepository from '@modules/users/interfaces/classes/IUserTokenRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

export default class UserTokensRepository implements IUserTokenRepository {
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({ user_id });
        await this.ormRepository.save(userToken);
        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.ormRepository.findOne({
            where: { token },
        });

        return userToken;
    }
}

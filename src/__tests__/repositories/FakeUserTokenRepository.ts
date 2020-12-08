import { uuid } from 'uuidv4';
import IUserTokenRepository from '@modules/users/interfaces/classes/IUserTokenRepository';
import UserToken from '@modules/users/infrastructure/typeorm/entities/UserToken';

export default class FakeUserTokensRepository implements IUserTokenRepository {
    private userTokens: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();
        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id,
            created_at: new Date(),
            updated_at: new Date(),
        });
        this.userTokens.push(userToken);
        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = this.userTokens.find(
            currentToken => currentToken.token === token,
        );

        return userToken;
    }
}

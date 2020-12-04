import UserToken from '@modules/users/infrastructure/typeorm/entities/UserToken';

export default interface IUserTokenRepository {
    generate(user_id: string): Promise<UserToken>;
    findByToken(token: string): Promise<UserToken | undefined>;
}

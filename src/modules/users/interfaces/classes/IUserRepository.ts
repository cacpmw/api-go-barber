import User from '@modules/users/infrastructure/typeorm/entities/User';
import IUserObject from '../objects/IUserObject';

export default interface IUserRepository {
    create(data: IUserObject): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    save(user: User): Promise<void>;
}

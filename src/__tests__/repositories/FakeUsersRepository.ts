import { uuid } from 'uuidv4';
import IUserRepository from '@modules/users/interfaces/classes/IUserRepository';
import User from '@modules/users/infrastructure/typeorm/entities/User';
import IUserObject from '@modules/users/interfaces/objects/IUserObject';

class FakeUsersRepository implements IUserRepository {
    private users: User[] = [];

    public async create(data: IUserObject): Promise<User> {
        const user = new User();
        const { email, password, name } = data;
        Object.assign(user, { id: uuid(), email, password, name });

        this.users.push(user);
        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = this.users.find(currentUser => currentUser.id === id);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(
            currentUser => currentUser.email === email,
        );
        return user;
    }

    public async all(): Promise<User[]> {
        return this.users;
    }

    public async save(user: User): Promise<void> {
        const index = this.users.findIndex(
            currentUser => currentUser.id === user.id,
        );
        if (index > 0) {
            this.users[index] = user;
            return;
        }
        this.users.push(user);
    }

    public async except(user_id: string): Promise<User[]> {
        return this.users.filter(currentUser => currentUser.id !== user_id);
    }
}

export default FakeUsersRepository;

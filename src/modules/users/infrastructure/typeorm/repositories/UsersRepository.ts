import IUserRepository from '@modules/users/interfaces/classes/IUserRepository';
import IUserObject from '@modules/users/interfaces/objects/IUserObject';
import { getRepository, Not, Repository } from 'typeorm';
import User from '../entities/User';

export default class UsersRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async create(data: IUserObject): Promise<User> {
        const user = this.ormRepository.create(data);
        await this.ormRepository.save(user);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });
        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);
        return user;
    }

    public async save(user: User): Promise<void> {
        await this.ormRepository.save(user);
    }

    public async all(): Promise<User[]> {
        return this.ormRepository.find();
    }

    public async except(user_id: string): Promise<User[]> {
        return this.ormRepository.find({
            where: {
                id: Not(user_id),
            },
            select: [
                'name',
                'email',
                'id',
                'avatar',
                'created_at',
                'updated_at',
            ],
        });
    }
}

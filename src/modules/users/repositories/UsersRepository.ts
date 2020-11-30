import { EntityRepository, Repository } from 'typeorm';
import User from '../infrastructure/typeorm/entities/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export default UsersRepository;

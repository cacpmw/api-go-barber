import 'reflect-metadata';
import IUserObject from '@modules/users/interfaces/objects/IUserObject';
import RequestError from '@shared/exceptions/RequestError';
import CreateUserService from '../modules/users/services/CreateUserService';
import FakeUsersRepository from './repositories/FakeUsersRepository';
import FakeCacheProvider from './providers/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let createUserService: CreateUserService;
describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();
        createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeCacheProvider,
        );
    });
    it('should be able to create a new User', async () => {
        const data: IUserObject = {
            email: 'test@email.com',
            name: 'Tester Developer',
            password: 'secret',
        };

        const user = await createUserService.execute(data);
        expect(user).toHaveProperty('id');
        expect(user.email).toBe('test@email.com');
        expect(user.name).toBe('Tester Developer');
        expect(user.password).toBeDefined();
    });
    it('should not be able to create a new User with existing email', async () => {
        const data: IUserObject = {
            email: 'test@email.com',
            name: 'Tester Developer',
            password: 'secret',
        };

        const user = await createUserService.execute(data);
        expect(user).toHaveProperty('id');
        expect(user.email).toBe('test@email.com');
        expect(user.name).toBe('Tester Developer');
        expect(user.password).toBeDefined();

        const newUserData: IUserObject = {
            email: 'test@email.com',
            name: 'Tester Developer',
            password: 'secret',
        };

        expect(createUserService.execute(newUserData)).rejects.toBeInstanceOf(
            RequestError,
        );
    });
});

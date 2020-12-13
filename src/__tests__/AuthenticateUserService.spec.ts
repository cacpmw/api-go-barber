import 'reflect-metadata';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeUsersRepository from './repositories/FakeUsersRepository';
import FakeCryptographProvider from './providers/FakeCryptographProvider';

let fakeUsersRepository: FakeUsersRepository;
let authenticateUserService: AuthenticateUserService;
let fakeCryptographProvider: FakeCryptographProvider;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCryptographProvider = new FakeCryptographProvider();
        authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
            fakeCryptographProvider,
        );
    });
    it('should be able to authenticate a user', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: 'secret',
        });
        const user = await authenticateUserService.execute({
            email: 'johndoe@email.com',
            password: 'secret',
        });
        expect(user).toHaveProperty('token');
    });
    it('should not be able to authenticate a non existing user', async () => {
        await expect(
            authenticateUserService.execute({
                email: 'wrongemail@email.com',
                password: 'secret',
            }),
        ).rejects.toHaveProperty('message', 'Invalid Credentials');
    });
    it('should not be able to authenticate a user with wrong password', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: 'secret',
        });

        await expect(
            authenticateUserService.execute({
                email: 'johndoe@email.com',
                password: 'wrongpassword',
            }),
        ).rejects.toHaveProperty('message', 'Invalid Credentials');
    });
});

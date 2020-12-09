import 'reflect-metadata';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import RequestError from '@shared/exceptions/RequestError';
import FakeUsersRepository from './repositories/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
        );
        createUserService = new CreateUserService(fakeUsersRepository);
    });
    it('should be able to authenticate a user', async () => {
        await createUserService.execute({
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
        ).rejects.toBeInstanceOf(RequestError);
    });
    it('should not be able to authenticate a user with wrong password', async () => {
        await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: 'secret',
        });

        await expect(
            authenticateUserService.execute({
                email: 'johndoe@email.com',
                password: 'wrongpassword',
            }),
        ).rejects.toBeInstanceOf(RequestError);
    });
});

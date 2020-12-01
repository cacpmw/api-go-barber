import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import RequestError from '@shared/exceptions/RequestError';

describe('AuthenticateUser', () => {
    it('should be able to authenticate a user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
        );
        const createUserService = new CreateUserService(fakeUsersRepository);
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
        const fakeUsersRepository = new FakeUsersRepository();
        const authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
        );

        await expect(
            authenticateUserService.execute({
                email: 'wrongemail@email.com',
                password: 'secret',
            }),
        ).rejects.toBeInstanceOf(RequestError);
    });
    it('should not be able to authenticate a user with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
        );
        const createUserService = new CreateUserService(fakeUsersRepository);
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

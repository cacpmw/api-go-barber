import 'reflect-metadata';
import ResetForgotPasswordService from '@modules/users/services/ResetForgotPasswordService';
import RequestError from '@shared/exceptions/RequestError';
import CryptographRepository from '@shared/repositories/CryptographRepository';
import FakeUsersRepository from './repositories/FakeUsersRepository';
import FakeUserTokensRepository from './repositories/FakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let cryptographRepository: CryptographRepository;
let resetForgotPasswordService: ResetForgotPasswordService;

describe('ResetPassword', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        cryptographRepository = new CryptographRepository();
        resetForgotPasswordService = new ResetForgotPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository,
            cryptographRepository,
        );
    });
    it('should be able to reset a User forgotten password', async () => {
        const user = await fakeUsersRepository.create({
            email: 'johndoe@email.com',
            name: 'John Doe',
            password: 'secret',
        });

        const userToken = await fakeUserTokensRepository.generate(user.id);
        const data = {
            token: userToken.token,
            password: 'newsecret',
        };
        await resetForgotPasswordService.execute(data);
        const updatedUser = await fakeUsersRepository.findById(user.id);
        let matchedPassword = false;
        if (updatedUser) {
            matchedPassword = await cryptographRepository.compare(
                'newsecret',
                updatedUser.password,
            );
        }
        expect(matchedPassword).toBe(true);
    });
    it('should not be able to reset password for non existing UserToken', async () => {
        await expect(
            resetForgotPasswordService.execute({
                token: 'non-existing-user-token',
                password: 'secret',
            }),
        ).rejects.toBeInstanceOf(RequestError);
    });
    it('should not be able to reset password for non existing User', async () => {
        const { token } = await fakeUserTokensRepository.generate(
            'non-existing-user',
        );
        await expect(
            resetForgotPasswordService.execute({
                token,
                password: 'secret',
            }),
        ).rejects.toBeInstanceOf(RequestError);
    });
    it('should not be able to reset password after expiration time', async () => {
        const user = await fakeUsersRepository.create({
            email: 'johndoe@email.com',
            name: 'John Doe',
            password: 'secret',
        });
        const { token } = await fakeUserTokensRepository.generate(user.id);
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetForgotPasswordService.execute({
                token,
                password: 'secret',
            }),
        ).rejects.toBeInstanceOf(RequestError);
    });
});

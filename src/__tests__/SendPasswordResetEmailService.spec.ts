import 'reflect-metadata';
import SendPasswordResetEmailService from '@modules/users/services/SendPasswordResetEmailService';
import RequestError from '@shared/exceptions/RequestError';
import FakeMailProvider from './providers/FakeMailProvider';
import FakeUsersRepository from './repositories/FakeUsersRepository';
import FakeUserTokensRepository from './repositories/FakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendPasswordResetEmailService: SendPasswordResetEmailService;

describe('SendPasswordResetEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        sendPasswordResetEmailService = new SendPasswordResetEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );
    });
    it('should send a password reset email', async () => {
        const user = await fakeUsersRepository.create({
            email: 'johndoe@email.com',
            name: 'John Doe',
            password: 'secret',
        });
        const send = jest.spyOn(fakeMailProvider, 'send');
        await sendPasswordResetEmailService.execute(user.email);
        expect(send).toHaveBeenCalled();
    });
    it('should not send a password reset email for non existing User', async () => {
        await expect(
            sendPasswordResetEmailService.execute('johndoe@email.com'),
        ).rejects.toBeInstanceOf(RequestError);
    });
    it('should generate forgot password UserToken', async () => {
        const generate = jest.spyOn(fakeUserTokensRepository, 'generate');
        const user = await fakeUsersRepository.create({
            email: 'johndoe@email.com',
            name: 'John Doe',
            password: 'secret',
        });
        await sendPasswordResetEmailService.execute(user.email);
        expect(generate).toHaveBeenCalledWith(user.id);
    });
});

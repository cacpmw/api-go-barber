import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import ResetForgotPasswordService from '@modules/users/services/ResetForgotPasswordService';
import CryptographRepository from '@shared/repositories/CryptographRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let cryptographRepository: CryptographRepository;
let resetForgotPasswordService: ResetForgotPasswordService;

describe('SendPasswordResetEmail', () => {
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
});

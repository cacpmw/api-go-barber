import 'reflect-metadata';
import ShowUserDataService from '@modules/users/services/ShowUserDataService';
import RequestError from '@shared/exceptions/RequestError';
import FakeUsersRepository from './repositories/FakeUsersRepository';
import FakeCryptographProvider from './providers/FakeCryptographProvider';

let fakeUsersRepository: FakeUsersRepository;
let showUserDataService: ShowUserDataService;
let fakeCryptographProvider: FakeCryptographProvider;

describe('UserData', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCryptographProvider = new FakeCryptographProvider();
        showUserDataService = new ShowUserDataService(fakeUsersRepository);
    });
    it("should be able to retrieve an authenticated User's data", async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: 'secret',
        });
        await fakeCryptographProvider.compare(user.password, user.password);
        const currentUser = await showUserDataService.execute(user.id);

        expect(currentUser.id).toBe(user.id);
    });
    it("should not be able to retrieve User's data for non existing id", async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: 'secret',
        });
        await fakeCryptographProvider.compare(user.password, user.password);

        await expect(
            showUserDataService.execute('non-existing-id'),
        ).rejects.toBeInstanceOf(RequestError);
    });
});

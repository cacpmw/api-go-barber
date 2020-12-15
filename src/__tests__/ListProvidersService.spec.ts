import 'reflect-metadata';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import FakeUsersRepository from './repositories/FakeUsersRepository';
import FakeCacheProvider from './providers/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProvidersService = new ListProvidersService(
            fakeUsersRepository,
            fakeCacheProvider,
        );
    });
    it('should be able to list all providers except one', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: 'secret',
        });
        await fakeUsersRepository.create({
            name: 'John Doe 2',
            email: 'johndoe2@email.com',
            password: 'secret',
        });
        const user = await fakeUsersRepository.create({
            name: 'John Doe 3',
            email: 'johndoe3@email.com',
            password: 'secret',
        });
        const users = await listProvidersService.execute(user.id);

        expect(users.length).toBe(2);
    });
});

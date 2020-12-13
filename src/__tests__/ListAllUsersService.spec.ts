import 'reflect-metadata';
import ListAllUsersService from '@modules/users/services/ListAllUsersService';
import FakeUsersRepository from './repositories/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let listAllUsersService: ListAllUsersService;

describe('ListAllUsers', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        listAllUsersService = new ListAllUsersService(fakeUsersRepository);
    });
    it('should be able to list all users', async () => {
        expect(listAllUsersService.execute()).toBeDefined();
    });
});

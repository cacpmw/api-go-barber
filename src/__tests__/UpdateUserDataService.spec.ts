import 'reflect-metadata';
import UpdateUserDataService from '@modules/users/services/UpdateUserDataService';
import RequestError from '@shared/exceptions/RequestError';
import FakeUsersRepository from './repositories/FakeUsersRepository';
import FakeCryptographProvider from './providers/FakeCryptographProvider';
import FakeCacheProvider from './providers/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeCryptographProvider: FakeCryptographProvider;
let updateUserDataService: UpdateUserDataService;
let fakeCacheProvider: FakeCacheProvider;
describe('UpdateUserData', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCryptographProvider = new FakeCryptographProvider();
        fakeCacheProvider = new FakeCacheProvider();
        updateUserDataService = new UpdateUserDataService(
            fakeUsersRepository,
            fakeCryptographProvider,
            fakeCacheProvider,
        );
    });
    it("should be able to update a User's data", async () => {
        const user = await fakeUsersRepository.create({
            email: 'johndoe@email.com',
            name: 'John Doe',
            password: 'secret',
        });

        const updatedUser = await updateUserDataService.execute({
            user_id: user.id,
            name: 'John Doe Updated',
            email: 'johndoeupdated@email.com',
        });
        expect(updatedUser?.name).toBe('John Doe Updated');
        expect(updatedUser?.email).toBe('johndoeupdated@email.com');
    });
    it("should not be able to update a User's data for non existing id", async () => {
        await fakeUsersRepository.create({
            email: 'johndoe@email.com',
            name: 'John Doe',
            password: 'secret',
        });

        await expect(
            updateUserDataService.execute({
                user_id: 'non-existing-id',
                name: 'John Doe Updated',
                email: 'johndoeupdated@email.com',
            }),
        ).rejects.toBeInstanceOf(RequestError);
    });
    it('should not be able update to an existing email', async () => {
        await fakeUsersRepository.create({
            email: 'johndoefirst@email.com',
            name: 'John Doe First',
            password: 'secret',
        });
        const user = await fakeUsersRepository.create({
            email: 'johndoesecond@email.com',
            name: 'John Doe Second',
            password: 'secret',
        });

        await expect(
            updateUserDataService.execute({
                user_id: user.id,
                name: 'John Doe Second',
                email: 'johndoefirst@email.com',
            }),
        ).rejects.toBeInstanceOf(RequestError);
    });
    it("should be able update User's password", async () => {
        const user = await fakeUsersRepository.create({
            email: 'johndoe@email.com',
            name: 'John Doe',
            password: 'secret',
        });

        const updatedUser = await updateUserDataService.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'johndoe@email.com',
            oldPassword: 'secret',
            newPassword: 'newSecret',
        });

        expect(updatedUser?.password).toBe('newSecret');
    });
    it("should not be able update User's password without old password", async () => {
        const user = await fakeUsersRepository.create({
            email: 'johndoe@email.com',
            name: 'John Doe',
            password: 'secret',
        });

        await expect(
            updateUserDataService.execute({
                user_id: user.id,
                name: 'John Doe',
                email: 'johndoe@email.com',
                newPassword: 'newSecret',
            }),
        ).rejects.toBeInstanceOf(RequestError);
    });
    it("should not be able update User's password with wrong old password", async () => {
        const user = await fakeUsersRepository.create({
            email: 'johndoe@email.com',
            name: 'John Doe',
            password: 'secret',
        });

        await expect(
            updateUserDataService.execute({
                user_id: user.id,
                name: 'John Doe',
                email: 'johndoe@email.com',
                newPassword: 'newSecret',
                oldPassword: 'wrongSecret',
            }),
        ).rejects.toBeInstanceOf(RequestError);
    });
    it("should be able to update a User's data except the name property", async () => {
        const user = await fakeUsersRepository.create({
            email: 'johndoe@email.com',
            name: 'John Doe',
            password: 'secret',
        });
        const updatedUser = await updateUserDataService.execute({
            user_id: user.id,
            email: 'johndoeupdated@email.com',
        });
        expect(updatedUser.name).toBe('John Doe');
    });
    it("should be able to update a User's data except the email property", async () => {
        const user = await fakeUsersRepository.create({
            email: 'johndoe@email.com',
            name: 'John Doe',
            password: 'secret',
        });
        const updatedUser = await updateUserDataService.execute({
            user_id: user.id,
            name: 'John Doe',
        });
        expect(updatedUser.email).toBe('johndoe@email.com');
    });
});

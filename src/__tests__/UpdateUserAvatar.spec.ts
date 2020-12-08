import 'reflect-metadata';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import RequestError from '@shared/exceptions/RequestError';
import FakeStorageRepository from './repositories/FakeStorageRepository';
import FakeUsersRepository from './repositories/FakeUsersRepository';

describe('UpdateUserAvatar', () => {
    it("should be able to create a User's avatar", async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageRepository = new FakeStorageRepository();
        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageRepository,
        );
        const user = await fakeUsersRepository.create({
            email: 'johndoe@email.com',
            name: 'John Doe',
            password: 'secret',
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });
        expect(user.avatar).toBe('avatar.jpg');
    });
    it('should not be able to update avatar of non existing User', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageRepository = new FakeStorageRepository();
        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageRepository,
        );

        await expect(
            updateUserAvatarService.execute({
                user_id: '1827381237214823',
                avatarFilename: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(RequestError);
    });
    it("should be able to update a User's avatar", async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageRepository = new FakeStorageRepository();
        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageRepository,
        );
        const user = await fakeUsersRepository.create({
            email: 'johndoe@email.com',
            name: 'John Doe',
            password: 'secret',
        });

        // creating the avatar for a user
        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });
        // actually trying to update the same user's avatar
        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'avatar2.jpg',
        });

        expect(user.avatar).toBe('avatar2.jpg');
    });
});

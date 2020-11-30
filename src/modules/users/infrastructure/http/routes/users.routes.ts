import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import multerConfig from '@config/multerconfig';
import authenticated from '../middlewares/Authenticated';

const usersRouter = Router();
const multerObject = multer(multerConfig);
usersRouter.post('/', async (request: Request, response: Response) => {
    const { name, email, password } = request.body;
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({
        name,
        email,
        password,
    });

    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };

    return response.status(201).json(userWithoutPassword);
});

usersRouter.patch(
    '/avatar',
    authenticated,
    multerObject.single('avatar'),
    async (request: Request, response: Response) => {
        const updateUserAvatarService = container.resolve(
            UpdateUserAvatarService,
        );
        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return response.status(200).json({ user: userWithoutPassword });
    },
);
export default usersRouter;

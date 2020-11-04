import { Router, Request, Response } from 'express';
import multer from 'multer';
import authenticated from '../middlewares/Authenticated';
import CreateUserService from '../services/CreateUserService';

import multerConfig from '../config/multerconfig';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const multerObject = multer(multerConfig);
usersRouter.post('/', async (request: Request, response: Response) => {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
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
        const updateUserAvatarService = new UpdateUserAvatarService();
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

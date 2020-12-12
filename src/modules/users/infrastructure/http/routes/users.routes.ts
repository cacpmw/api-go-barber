import { Router } from 'express';
import multer from 'multer';
import multerConfig from '@config/multerconfig';
import authenticated from '../middlewares/Authenticated';
import UsersController from '../controllers/UserController';
import UsersAvatarController from '../controllers/UsersAvatarController';

const usersRouter = Router();
const multerObject = multer(multerConfig);
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();
usersRouter.get('/', authenticated, usersController.index);
usersRouter.post('/', usersController.store);

usersRouter.patch(
    '/avatar',
    authenticated,
    multerObject.single('avatar'),
    usersAvatarController.update,
);
export default usersRouter;

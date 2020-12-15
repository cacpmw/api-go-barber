import { Router } from 'express';
import multer from 'multer';
import multerConfig from '@config/multerconfig';
import { celebrate, Joi, Segments } from 'celebrate';
import authenticated from '../middlewares/Authenticated';
import UsersController from '../controllers/UserController';
import UsersAvatarController from '../controllers/UsersAvatarController';

const usersRouter = Router();
const multerObject = multer(multerConfig.multer);
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();
usersRouter.get('/', authenticated, usersController.index);
usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            passwordConfirmation: Joi.string().valid(Joi.ref('password')),
        },
    }),
    usersController.store,
);

usersRouter.patch(
    '/avatar',
    authenticated,
    multerObject.single('avatar'),
    usersAvatarController.update,
);
export default usersRouter;

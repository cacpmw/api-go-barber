import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import authenticated from '../middlewares/Authenticated';
import UserDataController from '../controllers/UserDataController';

const userDataRouter = Router();
const userDataController = new UserDataController();
userDataRouter.use(authenticated);
userDataRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
            oldPassword: Joi.string(),
            newPassword: Joi.string(),
            passwordConfirmation: Joi.string().valid(Joi.ref('newPassword')),
        }),
    }),
    userDataController.update,
);
userDataRouter.get('/show', userDataController.show);

export default userDataRouter;

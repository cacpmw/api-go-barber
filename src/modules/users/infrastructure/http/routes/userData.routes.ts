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
            name: Joi.string().optional(),
            email: Joi.string().optional().email(),
            oldPassword: Joi.string().optional(),
            newPassword: Joi.when('oldPassword', {
                is: Joi.ref('oldPassword').key,
                then: Joi.string().required(),
            }),
            passwordConfirmation: Joi.when('newPassword', {
                is: Joi.object().keys({
                    oldPassword: Joi.exist(),
                }),
                then: Joi.string().valid(Joi.ref('newPassword')),
            }),
        }),
    }),
    userDataController.update,
);
userDataRouter.get('/show', userDataController.show);

export default userDataRouter;

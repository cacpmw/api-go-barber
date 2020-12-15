import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsController = new SessionsController();
const sessionsRouter = Router();

sessionsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object({
            password: Joi.string().required(),
            email: Joi.string().email().required(),
        }),
    }),
    sessionsController.store,
);

export default sessionsRouter;

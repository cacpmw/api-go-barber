import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsController = new SessionsController();
const sessionsRouter = Router();

sessionsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
        }),
    }),
    sessionsController.store,
);

export default sessionsRouter;

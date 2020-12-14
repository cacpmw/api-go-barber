import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import authenticated from '@modules/users/infrastructure/http/middlewares/Authenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();
appointmentsRouter.use(authenticated);

appointmentsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date().required(),
        },
    }),
    appointmentsController.store,
);
appointmentsRouter.get('/', appointmentsController.index);
appointmentsRouter.get('/schedule', providerAppointmentsController.index);
export default appointmentsRouter;

import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import authenticated from '@modules/users/infrastructure/http/middlewares/Authenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProvidersMonthAvailabilityController from '../controllers/ProvidersMonthAvailabilityController';
import ProvidersDayAvailabilityController from '../controllers/ProvidersDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providersMonthAvailability = new ProvidersMonthAvailabilityController();
const providersDayAvailability = new ProvidersDayAvailabilityController();

providersRouter.use(authenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
    '/:id/month-availability',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    providersMonthAvailability.index,
);
providersRouter.get(
    '/:id/day-availability',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.QUERY]: {
            day: Joi.string().required(),
            month: Joi.string().required(),
            year: Joi.string().required(),
        },
    }),
    providersDayAvailability.index,
);
export default providersRouter;

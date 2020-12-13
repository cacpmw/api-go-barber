import { Router } from 'express';
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
    providersMonthAvailability.index,
);
providersRouter.get('/:id/day-availability', providersDayAvailability.index);
export default providersRouter;

import { Router } from 'express';
import authenticated from '@modules/users/infrastructure/http/middlewares/Authenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(authenticated);

providersRouter.get('/', providersController.index);
export default providersRouter;

import { Router } from 'express';
import authenticated from '@modules/users/infrastructure/http/middlewares/Authenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(authenticated);

appointmentsRouter.post('/', appointmentsController.store);
appointmentsRouter.get('/', appointmentsController.index);
export default appointmentsRouter;

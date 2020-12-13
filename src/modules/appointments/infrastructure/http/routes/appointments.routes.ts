import { Router } from 'express';
import authenticated from '@modules/users/infrastructure/http/middlewares/Authenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();
appointmentsRouter.use(authenticated);

appointmentsRouter.post('/', appointmentsController.store);
appointmentsRouter.get('/', appointmentsController.index);
appointmentsRouter.get('/schedule', providerAppointmentsController.index);
export default appointmentsRouter;

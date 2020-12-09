import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infrastructure/http/routes/appointments.routes';
import usersRouter from '@modules/users/infrastructure/http/routes/users.routes';
import sessionsRouter from '@modules/users/infrastructure/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infrastructure/http/routes/password.routes';

const routes = Router();
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
export default routes;

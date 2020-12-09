import { Router } from 'express';
import authenticated from '../middlewares/Authenticated';
import UserDataController from '../controllers/UserDataController';

const userDataRouter = Router();
const userDataController = new UserDataController();
userDataRouter.use(authenticated);
userDataRouter.put('/', userDataController.update);
userDataRouter.get('/show', userDataController.show);

export default userDataRouter;

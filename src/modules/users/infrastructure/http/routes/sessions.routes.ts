import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
    const { email, password } = request.body;
    const authenticateUserService = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateUserService.execute({
        email,
        password,
    });
    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
    return response.status(201).json({ user: userWithoutPassword, token });
});
export default sessionsRouter;

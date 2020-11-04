import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/authconfig';
import RequestError from '../exceptions/RequestError';

export default function authenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authenticationHeader = request.headers.authorization;
    if (!authenticationHeader) {
        throw new RequestError('JWT token is missing', 401);
    }
    const [, token] = authenticationHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);
        const { iat, sub, exp } = decoded as {
            iat: number;
            exp: number;
            sub: string;
        };
        request.user = {
            id: sub,
        };
        return next();
    } catch {
        throw new RequestError('Invalid token', 401);
    }
}

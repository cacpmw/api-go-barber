/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';
import RequestError from './RequestError';

export default (
    error: Error,
    request: Request,
    response: Response,
    _: NextFunction,
): Response => {
    console.log(error);
    if (error instanceof RequestError) {
        return response
            .status(error.statusCode)
            .json({ message: error.message });
    }

    return response.status(500).json({ message: 'Internal Server Error' });
};

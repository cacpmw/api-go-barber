/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import { errors } from 'celebrate';
import express from 'express';
import 'express-async-errors';
import routes from '@shared/infrastructure/http/routes';
import '@shared/infrastructure/typeorm/connection';
import multerConfig from '@config/multerconfig';
import ExceptionHandler from '@shared/exceptions/Handler';
import '@shared/container/index';
import rateLimiter from './middlewares/rateLimiter';

const app = express();
app.use(rateLimiter);
app.use(express.json());
app.use(cors());
app.use('/files', express.static(multerConfig.uploadsFolder));
app.use(routes);
app.use(errors());
app.use(ExceptionHandler);
app.listen(3333, () => {
    console.log('🧨 Server started on port 3333');
});

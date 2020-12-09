/* eslint-disable no-console */
import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import routes from '@shared/infrastructure/http/routes';
import '@shared/infrastructure/typeorm/connection';
import multerConfig from '@config/multerconfig';
import Handler from '@shared/exceptions/Handler';
import '@shared/container/index';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/files', express.static(multerConfig.uploadsFolder));
app.use(routes);
app.use(Handler);
app.listen(3333, () => {
    console.log('🧨 Server started on port 3333');
});

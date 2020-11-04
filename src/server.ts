/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import routes from './routes';
import './database/connection';
import multerConfig from './config/multerconfig';
import Handler from './exceptions/Handler';

const app = express();
app.use(express.json());
app.use('/files', express.static(multerConfig.directory));
app.use(routes);
app.use(Handler);
app.listen(3333, () => {
    console.log('🧨 Server started on port 3333');
});

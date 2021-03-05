import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import ServerError from '@shared/errors/ServerError';
import routes from './routes';

import '../typeorm';
import '../../container';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof ServerError) {
    return res.status(err.statusCode).json({
      status: 'erro',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'erro',
    message: 'Erro interno do servidor',
  });
});

app.listen(3333, () => {
  console.log('Rodando na porta 3333');
});

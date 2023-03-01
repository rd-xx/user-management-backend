import HandleErrorMiddleware from './middlewares/handleError.middleware';
import Handle404Middleware from './middlewares/handle404.middleware';
import BaseModel from './db/models/base.model';
import UserRoutes from './routes/user.routes';
// @ts-expect-error no typings
import config from '../knexfile.js';
import express from 'express';
import cors from 'cors';
import knex from 'knex';

async function main() {
  const app = express();

  // Middlewares
  app.use(express.json());
  app.use(cors());

  // Database
  const knexInstance = knex(config);
  BaseModel.knex(knexInstance);

  // Routes
  UserRoutes(app, knexInstance);

  // Error handling
  app.use(HandleErrorMiddleware);
  app.use(Handle404Middleware);

  app.listen(4000, () => console.log(`Listening on : 4000`));
}

main();

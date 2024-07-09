// src/middlewares/index.js
import { retryMiddleware, timeoutMiddleware } from './retry.js';
import authenticate from './authenticate.js';
import errorHandler from './errorHandler.js';

const applyMiddlewares = (app) => {
  app.use(authenticate);
  app.use(timeoutMiddleware);
  app.use(retryMiddleware);
  app.use(errorHandler);
};

export default applyMiddlewares;
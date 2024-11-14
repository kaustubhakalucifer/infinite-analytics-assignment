import {
  initializePassportStrategies,
  setupMiddlewares,
  setupRoutes,
} from './app';
import { connectMongoDatabase } from './database';
import express from 'express';
import { env } from './env';
import { logger } from './logger';

connectMongoDatabase()
  .then(() => {
    const app = express();
    setupMiddlewares(app);
    initializePassportStrategies();
    setupRoutes(app);
    app.listen(env.app.port, () => {
      logger.info(
        `--- [ ${env.app.name} is listening on port ${env.app.port} in ${env.currentNodeEnv} mode! ] ---`
      );
    });
  })
  .catch((err) => {
    logger.error(`${JSON.stringify(err)}`);
  });

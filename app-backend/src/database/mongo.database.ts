import { connect } from 'mongoose';
import { logger } from '../logger';
import { env } from '../env';

export async function connectMongoDatabase(): Promise<void> {
  logger.info('--- [ Connecting to the mongo database ] ---');
  return await connect(env.mongoUri)
    .then((connection) => {
      logger.info(
        `--- [ MongoDB connected: ${connection.connection.host} ] ---`
      );
    })
    .catch((err) => {
      throw new Error(err);
    });
}

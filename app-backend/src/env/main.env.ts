import dotenv from 'dotenv';
import path from 'node:path';
import { getOsEnvironment } from './helper.env';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

const env = {
  currentNodeEnv: getOsEnvironment('NODE_ENV'),
  app: {
    name: getOsEnvironment('APP_NAME'),
    port: getOsEnvironment('APP_PORT'),
    routePrefix: getOsEnvironment('APP_ROUTE_PREFIX'),
  },
  mongoUri: getOsEnvironment('MONGO_URI'),
  secrets: {
    session: getOsEnvironment('SESSION_SECRET'),
  },
  headers: {
    username: getOsEnvironment('HEADERS_USERNAME'),
    password: getOsEnvironment('HEADERS_PASSWORD'),
  },
  googleAuth: {
    clientId: getOsEnvironment('GOOGLE_CLIENT_ID'),
    clientSecret: getOsEnvironment('GOOGLE_CLIENT_SECRET'),
  },
};

export { env };

import express, { Application } from 'express';
import { logger } from './logger';
import morgan from 'morgan';
import moment from 'moment-timezone';
import cors from 'cors';
import session from 'express-session';
import { env } from './env';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {
  googleAuthRoutes,
  loginRoutes,
  registerRoutes,
  sessionRoutes,
  userRoutes,
} from './routes';
import { validateAndUpdateUserDetails } from './helper';

function setupMiddlewares(app: Application): void {
  logger.info('--- [ Configuring all middlewares ] ---');
  morgan.token('date', () => {
    return moment().tz('Asia/Kolkata').format();
  });
  morgan.format(
    'format',
    ':date[Asia/Kolkata] [main] api: :method :url :status :res[content-length] - :response-time ms'
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(
    morgan(
      ':date[Asia/Kolkata] [main] :method :url :status :res[content-length] - :response-time ms',
      {
        stream: {
          write: (message: string) => logger.info(message.trim()),
        },
      }
    )
  );
  app.use(
    session({
      secret: env.secrets.session,
      saveUninitialized: false,
      resave: true,
      cookie: {
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 3,
        secure: false,
      },
      store: new MongoStore({
        mongoUrl: env.mongoUri,
        collectionName: 'user-sessions',
      }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  logger.info('--- [ All middlewares configured ] ---');
}

function initializePassportStrategies(): void {
  logger.info('--- [ Initializing passport strategies ] ---');
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.googleAuth.clientId,
        clientSecret: env.googleAuth.clientSecret,
        callbackURL: '/api/auth/google/callback',
      },
      async (_accessToken, _refreshToken, profile, done) => {
        const email = profile.emails?.[0].value;
        console.log(profile);
        if (email) {
          await validateAndUpdateUserDetails(email, {
            photoUrl: profile.photos[0].value,
            name: profile.displayName,
          });
        } else {
          return done(null, false, {
            message: 'No email associated with this google account',
          });
        }
        done(null, { email });
      }
    )
  );
  passport.serializeUser((sessionData: { email: string }, done) => {
    done(null, sessionData);
  });
  passport.deserializeUser((email: Express.User, done) => {
    done(null, email);
  });
  logger.info('--- [ Passport strategies initialized ] ---');
}

function setupRoutes(app: Application) {
  logger.info('--- [ Configuring all routes ] ---');
  const routePrefix = env.app.routePrefix;
  app.use(`${routePrefix}/auth/google`, googleAuthRoutes);
  app.use(`${routePrefix}/session`, sessionRoutes);
  app.use(`${routePrefix}/user`, userRoutes);
  app.use(`${routePrefix}/login`, loginRoutes);
  app.use(`${routePrefix}/register`, registerRoutes);
  logger.info('--- [ All routes configured ] ---');
}

export { setupMiddlewares, initializePassportStrategies, setupRoutes };

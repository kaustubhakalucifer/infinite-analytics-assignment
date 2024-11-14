import { Router } from 'express';
import passport from 'passport';

const googleAuthRoutes = Router();

googleAuthRoutes
  .get(
    '/',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  )
  .get(
    '/callback',
    passport.authenticate('google', {
      failureRedirect: 'http://localhost:4200/login',
    }),
    (_req, res) => {
      res.redirect('http://localhost:4200/assignment/profile');
    }
  );

export default googleAuthRoutes;

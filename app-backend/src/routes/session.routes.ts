import { Router } from 'express';

const sessionRoutes = Router();

sessionRoutes
  .get('/', (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(200).json({ message: 'Unauthorized' });
    }
  })
  .get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }

      // Destroy the session to clear any session data
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to destroy session' });
        }

        // Clear the session cookie on the client
        res.clearCookie('connect.sid'); // 'connect.sid' is the default session cookie name
        return res.status(200).json({ message: 'Logged out successfully' });
      });
    });
  });

export default sessionRoutes;

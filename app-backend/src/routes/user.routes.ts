import { Router } from 'express';
import { userModel } from '../model';
import { updateUserDetails } from '../controller/user.controller';

const userRoutes = Router();

userRoutes
  .get('/', async (req, res) => {
    const data = await userModel.findOne({
      emailAddress: req.user['email'],
    });
    res.status(200).json({ status: true, statusCode: 200, data });
  })
  .patch('/', updateUserDetails);

export default userRoutes;

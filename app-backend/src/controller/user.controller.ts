import { Request, Response } from 'express';
import { userModel } from '../model';

async function updateUserDetails(req: Request, res: Response): Promise<void> {
  try {
    const { name, bio, emailAddress, password, photoUrl, mobileNumber } =
      req.body;
    const updatedUser = await userModel.findOneAndUpdate(
      { emailAddress: req.user['email'] },
      { name, bio, emailAddress, password, photoUrl, mobileNumber },
      { new: true, omitUndefined: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res
        .status(200)
        .json({ message: 'User updated successfully', user: updatedUser });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
}

export { updateUserDetails };

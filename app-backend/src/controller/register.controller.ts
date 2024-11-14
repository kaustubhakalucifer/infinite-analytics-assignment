import { Request, Response } from 'express';
import { userModel } from '../model';
import { hash } from 'bcrypt';

async function register(req: Request, res: Response): Promise<void> {
  const { emailAddress, password } = req.body;

  if (!emailAddress || !password) {
    res.status(400).json({
      status: false,
      statusCode: 400,
      message: 'Invalid request data',
    });
    return;
  }

  try {
    const existingUser = await userModel.findOne({ emailAddress });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }
    await userModel.create({
      emailAddress,
      password: await hash(password, 10),
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export { register };

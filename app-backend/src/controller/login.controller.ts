import { Request, Response } from 'express';
import { userModel } from '../model';
import { compare } from 'bcrypt';

async function login(req: Request, res: Response): Promise<void> {
  const { emailAddress, password } = req.body;

  if (!emailAddress || !password) {
    res.status(400).json({
      status: false,
      statusCode: 400,
      message: 'Invalid request data',
    });
    return;
  }

  const findUser = await userModel.findOne({ emailAddress });
  if (!findUser) {
    res.status(404).json({
      status: false,
      statusCode: 404,
      message: 'Invalid email address / password',
    });
    return;
  }

  if (!(await compare(password, findUser.password))) {
    res.status(404).json({
      status: false,
      statusCode: 404,
      message: 'Invalid email address / password',
    });
    return;
  }
  req.login({ email: findUser.emailAddress }, (err) => {
    if (err) return res.status(500).json({ message: 'Login failed' });
    res.status(200).json({ message: 'Login successful' });
  });
}

export { login };

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { findUserByEmailAndPassword } from '../services/login';


const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmailAndPassword(email, password);

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ status: 'success', token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

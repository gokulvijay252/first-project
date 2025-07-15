import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '../services/userService';
import { generateToken } from '../../utils/jwt';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const token = generateToken({ id: user.id });
    return res.status(200).json({ token, email: user.email });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};


export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, email, hashedPassword);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};


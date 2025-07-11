import db from '../config/db';
import { User } from '../../types/user';


export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows]: any = await db.query('SELECT * FROM login_users WHERE email = ? LIMIT 1', [email]);
  return rows.length > 0 ? rows[0] : null;
};

export const createUser = async (email: string, password: string): Promise<void> => {
  await db.query('INSERT INTO login_users (email, password) VALUES (?, ?)', [email, password]);
};

import db from '../config/db';
import { User, Createuser } from '../../types/user';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows]: any = await db.query('SELECT * FROM login_users WHERE email = ? LIMIT 1', [email]);
  return rows.length > 0 ? rows[0] : null;
};

export const createUser = async (username: string, email: string, password: string): Promise <Createuser | null> => {
  const [result]: any = await db.query(
    `INSERT INTO login_users (username, email, password, status, entered_at, updated_at)
     VALUES (?, ?, ?, 'A', NOW(), NOW())`,
    [username, email, password]
  );
    return {
      username,
      email,
      password,
      status: 'A',
      entered_at: new Date(),
      updated_at: new Date()
    };
};



import db from '../config/db';

export const findUserByEmailAndPassword = async (
  email: string,
  password: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, email FROM users WHERE email = ? AND password = ? LIMIT 1';
    db.query(query, [email, password], (err, results) => {
      if (err) return reject(err);
      resolve(results); // return the first user if found
    });
  });
};



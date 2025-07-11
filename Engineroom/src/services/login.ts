import db from '../config/db';

export const findUserByEmailAndPassword = async (
  email: string,
  password: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, email FROM login_users WHERE email = ? AND password = ? LIMIT 1';
    
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return reject(err);
      }
      if (Array.isArray(results) && results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
};

import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';
import { hash } from 'bcrypt';
import { compare } from 'bcrypt';

export default async function forgotPassword(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = (await db.query('SELECT * FROM users WHERE email = $1', [req.body.email])).rows[0];
    if (!user) {
      throw { message: 'User does not exist' };
    }
    const userPW = user.password;
    const userID = user.id;

    compare(req.body.oldPassword, userPW, async (err, result) => {
      if (!err && !result) {
        throw { message: 'Invalid password or email' };
      }
      if (!err && result) {
        hash(req.body.newPassword, 10, async function (err, hash) {
          await db.query('UPDATE users SET password = $1 WHERE email = $2', [hash, user.email]);

          res.status(200).json({ message: 'Password succesfully changed!' });
        });
      }
    });
  } catch (userErr) {
    console.log('userErr', userErr);
    res.status(401).json(userErr);
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';
import { hash } from 'bcrypt';

export default async function forgotPassword(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = (
      await db.query('SELECT * FROM users WHERE name = $1 AND password_reset_token = $2', [
        req.body.name,
        req.body.token,
      ])
    ).rows[0];

    if (!user) {
      console.log('user not found');
      throw { message: 'Invalid request' };
    }

    const expiresIn = user.password_reset_expires;
    const dateNow = Date.now();
    if (dateNow <= expiresIn) {
      hash(req.body.password, 10, async function (err, hash) {
        // delete the reset token, reset the timer and set new password
        await db.query(
          'UPDATE users SET password_reset_token = $1, password_reset_expires = $2, password = $3 WHERE email = $4',
          ['', 0, hash, user.email]
        );
        // res.writeHead(302, {
        //   Location: 'http://localhost:3000/login',
        // });
        // res.end();
        res.status(200).json({ message: 'password succesfully changed' });
      });
    } else throw { message: 'Token Expired' };
  } catch (userErr) {
    console.log('userErr', userErr);
    res.status(401).json(userErr);
  }
}

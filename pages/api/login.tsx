/* eslint-disable max-len */
/* eslint-disable no-useless-catch */
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';
import db from '../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const user = await db.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
      if (user.rows.length === 0) {
        throw { message: 'User does not exist' };
      }

      const userPW = user.rows[0].password;
      const userID = user.rows[0].id;

      await db.query('UPDATE tokens SET status = False WHERE fk_users_id = $1', [userID]);

      compare(req.body.password, userPW, async (err: boolean, result: boolean) => {
        try {
          if (!err && !result) {
            console.log('error comparing');
            throw { message: 'Invalid password or email' };
          }
          if (!err && result) {
            const claims = { sub: user.rows[0], myPersonName: user.rows[0].email };
            const jwt = sign(claims, '93cb66b7-302b-4596-936c-47b441e5d8f0', {
              expiresIn: '2h',
            });

            const query = {
              text: 'INSERT INTO tokens(token, fk_users_id, status) VALUES($1, $2, $3)',
              values: [jwt, userID, true],
              // rowMode: "array",
            };

            await db.query(query);

            res.setHeader(
              'Set-Cookie',
              cookie.serialize('autho', jwt, {
                sameSite: 'strict',
                maxAge: 7200,
                path: '/',
              })
            );

            res.status(200).json({ message: 'Welcome back!' });
          }
        } catch (userErr) {
          console.log(userErr);
          res.status(401).json(userErr);
        }
      });
    } catch (userErr) {
      console.log('catch error', userErr); // This shows the error ('User does not exist') in the console
      res.status(401).json(userErr);
    }
  }
}

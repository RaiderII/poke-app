/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import { hash } from 'bcrypt';
import db from '../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    hash(req.body.password, 10, async function (err, hash) {
      const query = {
        text: 'INSERT INTO users(name, email, password) VALUES($1, $2, $3)',
        values: [req.body.name, req.body.email, hash],
        // rowMode: "array",
      };

      await db.query(query);
      res.status(200).json({ message: 'User successfully created' });
    });
  } else {
    res.status(405).json({ message: 'We only support POST' });
  }
}

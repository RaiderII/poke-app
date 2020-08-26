import db from '../../lib/db';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  const getTokenPK = await db.query('SELECT fk_users_id FROM tokens where token = $1', [
    req.cookies.autho,
  ]);
  const userID = getTokenPK.rows[0].fk_users_id;

  const invalidateToken = {
    // text: "SELECT * FROM tokens WHERE token = $1",
    text: 'UPDATE tokens SET status = False where fk_users_id = $1',
    values: [userID],
    // rowMode: "array",
  };

  await db.query(invalidateToken);

  res.setHeader('Set-Cookie', 'autho');

  res.json({ message: 'Loged Out!' });
}

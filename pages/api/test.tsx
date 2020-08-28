import { NextApiResponse, NextApiRequest } from 'next';
//const { Pool } = require('pg');
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: '35.238.156.4',
  database: 'postgres',
  password: 'utn1436764',
  port: 5432,
});

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  const query = {
    text: 'UPDATE tokens SET status = False WHERE fk_users_id = $1',
    values: [56],
    // rowMode: "array",
  };

  await pool.query(query);

  const test = (await pool.query('SELECT * FROM tokens where fk_users_id = 61')).rows;

  console.log(test);

  res.json({ message: 'Loged Out!' });
}

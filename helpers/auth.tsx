import { verify } from 'jsonwebtoken';
import { ApiRoutesTypes } from '../lib/ApiRoutesTypes';

export default async (ctx: ApiRoutesTypes, db) => {
  if (ctx.req.headers.cookie !== undefined) {
    const cookie = ctx.req.headers.cookie.split('=')[1];

    const checkStatus = await db.query('SELECT * FROM tokens WHERE token = $1 AND status = True', [
      cookie,
    ]);

    verify(cookie, process.env.SECRET, async (err, decoded) => {
      // no error, valid password and valid token

      if (!err && decoded && checkStatus.rows.length > 0) {
        console.log('redirecting');
        ctx.res.writeHead(302, {
          Location: 'http://localhost:3000/',
        });
        ctx.res.end();
      }
    });
  }
};

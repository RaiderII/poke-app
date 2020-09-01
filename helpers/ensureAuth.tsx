import { parseCookies } from 'nookies';
import db from '../lib/db';

export default function ensureAuth(gssp) {
  return async (ctx) => {
    const cookie = parseCookies(ctx).autho;

    if (!cookie) {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
      return { props: {} };
    }

    const validQuery = {
      text: 'SELECT fk_users_id FROM tokens WHERE token = $1 AND status = true',
      values: [cookie],
    };
    const isValidUser = await db.query(validQuery);

    // no user with valid token is found
    if (isValidUser.rows.length === 0) {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
      return { props: {} };
    }
    return gssp(ctx);
  };
}

import { verify } from 'jsonwebtoken';
import { ApiRoutesTypes } from '../lib/ApiRoutesTypes';
import Router from 'next/router';
import { parseCookies } from 'nookies';

export default async (ctx: ApiRoutesTypes, db) => {
  const cookie = parseCookies(ctx).autho;

  let redirect = false;
  const loginRedirect = () => {
    ctx.res.writeHead(302, {
      Location: '/login',
    });

    ctx.res.end();

    return !redirect;
  };

  if (!cookie) {
    loginRedirect();
    return !redirect;
  }

  if (!ctx.req) {
    loginRedirect();
    return !redirect;
  }
  // cookie expired
  if (ctx.req.headers.cookie === undefined) {
    loginRedirect();
    return !redirect;
  }

  // cookie set to empty string
  if (cookie === '') {
    loginRedirect();
    return !redirect;
  }

  const query = {
    text: 'SELECT fk_users_id FROM tokens WHERE token = $1 AND status = true',
    values: [cookie],
    // rowMode: "array",
  };
  const userId = await db.query(query);

  // no user with valid token is found
  if (userId.rows.length === 0) {
    loginRedirect();
    return !redirect;
  }

  const checkStatus = await db.query('SELECT * FROM tokens WHERE token = $1 AND status = True', [
    cookie,
  ]);

  // check the status (boolean) of the token
  if (checkStatus.rows.length === 0) {
    loginRedirect();
    return !redirect;
  }

  // if the token exists, check if it's correct
  verify(cookie, process.env.SECRET, async (err, decoded) => {
    console.log('decoded');
    if (!err && !decoded) {
      console.log('decoded rejected');
      loginRedirect();
      return !redirect;
    }
  });

  return redirect;
};

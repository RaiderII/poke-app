import { verify } from 'jsonwebtoken';
import { ApiRoutesTypes } from '../lib/ApiRoutesTypes';
import Router from 'next/router';

export default async (ctx: ApiRoutesTypes, db) => {
  const loginRedirect = () => {
    ctx.res.writeHead(302, {
      Location: '/login',
    });

    ctx.res.end();

    return {};
  };

  let test;

  if (!ctx.req) {
    console.log('!ctx.req');
    //Router.replace('/login');
    test = false;
  }
  // cookie expired
  if (ctx.req.headers.cookie === undefined) {
    test = false;
  }

  // get cookie from the header
  const cookie = ctx.req.headers.cookie.split('=')[1];

  // cookie set to empty string
  if (cookie === '') {
    console.log('empty');
    loginRedirect();
  }

  const query = {
    text: 'SELECT fk_users_id FROM tokens WHERE token = $1 AND status = true',
    values: [cookie],
    // rowMode: "array",
  };
  const userId = await db.query(query);

  // no user with valid token is found
  if (userId.rows.length === 0) {
    console.log('no user with valid token');
    test = false;
  }

  const checkStatus = await db.query('SELECT * FROM tokens WHERE token = $1 AND status = True', [
    cookie,
  ]);

  // check the status (boolean) of the token
  if (checkStatus.rows.length === 0) {
    loginRedirect();
  }

  // if the token exists, check if it's correct
  verify(cookie, process.env.SECRET, async (err, decoded) => {
    console.log('decoded');
    if (!err && !decoded) {
      console.log('decoded rejected');
      loginRedirect();
    }
    if (!err && decoded) {
      test = true;
    }
  });

  return test;
};

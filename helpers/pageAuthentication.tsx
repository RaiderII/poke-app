import { verify } from 'jsonwebtoken';
import { ApiRoutesTypes } from '../lib/ApiRoutesTypes';
import Router from 'next/router';

export default async (ctx: ApiRoutesTypes, db) => {
  const loginRedirect = () => {
    // ctx.res.writeHead(302, {
    //   Location: 'https://raider-poke-app.vercel.app/login',
    // });
    // ctx.res.end();
    Router.push('/login');
  };
  // cookie expired
  if (ctx.req.headers.cookie === undefined) {
    loginRedirect();
  }

  // get cookie from the header
  const cookie = ctx.req.headers.cookie.split('=')[1];

  // cookie set to empty string
  if (cookie === '') {
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
    loginRedirect();
  }

  const checkStatus = await db.query('SELECT * FROM tokens WHERE token = $1 AND status = True', [
    cookie,
  ]);
  console.log(checkStatus.rows);
  // check the status (boolean) of the token
  if (checkStatus.rows.length === 0) {
    loginRedirect();
  }

  // if the token exists, check if it's correct
  verify(cookie, process.env.SECRET, async (err, decoded) => {
    // console.log("decoded", decoded);
    if (!err && !decoded) {
      loginRedirect();
    }
  });
};

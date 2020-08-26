/* eslint-disable import/prefer-default-export */
import Router from 'next/router';
import { ApiRoutesTypes } from '../../lib/ApiRoutesTypes';

export async function myGet(url: string, ctx: ApiRoutesTypes) {
  const { cookie } = ctx.req.headers;

  const resp = await fetch(url, {
    headers: {
      cookie,
    },
  });

  if (resp.status === 401 && !ctx.req) {
    Router.replace('/login');
    return {};
  }
  // ctx.req means we're on server side atm
  if (resp.status === 401 && ctx.req) {
    ctx.res.writeHead(302, {
      Location: 'http://localhost:3000/login',
    });
    ctx.res.end();
  }

  const json = await resp.json();
  return json;
}

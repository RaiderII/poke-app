import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import Router from 'next/router';
import { verify } from 'jsonwebtoken';
import db from '../lib/db';
import fetchJson from '../lib/fetchJson';
import { ApiRoutesTypes } from '../lib/ApiRoutesTypes';
import LoginContainer from '../styled-components/Login/LoginContainer';
import BasicLayout from '../styled-components/GlobalStyle';
import LoginBox from '../styled-components/Login/LoginBox';
import Link from 'next/link';

export default function App() {
  const { register, watch, handleSubmit, errors } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  async function handleLogin(data) {
    try {
      await fetchJson('https://raider-poke-app.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      Router.push('/');
      // if (resp.status !== 200) {
      //   setMessage('Invalid user or password');
      // }

      // Router.push('/login');
    } catch (error) {
      console.log(error.data.message);
    }
  }

  return (
    <BasicLayout>
      <LoginContainer>
        <LoginBox>
          <form onSubmit={handleSubmit(handleLogin)}>
            <label>Email</label>
            <input name="email" placeholder="email" type="email" ref={register} />
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="password"
              ref={register({
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                  message: 'Invalid email or password', // <p>error message</p>
                },
              })}
            />
            <Link as={`/forgot-password`} href="/forgot-password">
              <h2>Forgot password?</h2>
            </Link>
            {errors.password && <p>{errors.password.message}</p>}

            <input type="submit" />
          </form>
        </LoginBox>
      </LoginContainer>
    </BasicLayout>
  );
}

export async function getServerSideProps(ctx: ApiRoutesTypes) {
  // check for an active cookie
  if (ctx.req.headers.cookie !== undefined) {
    const cookie = ctx.req.headers.cookie.split('=')[1];

    const checkStatus = await db.query('SELECT * FROM tokens WHERE token = $1 AND status = True', [
      cookie,
    ]);

    verify(cookie, process.env.SECRET, async (err, decoded) => {
      // no error, valid password and valid token
      if (!err && decoded && checkStatus.rows.length > 0) {
        ctx.res.writeHead(302, {
          Location: 'https://raider-poke-app.vercel.app/',
        });
        ctx.res.end();
      }
    });
  }

  return { props: {} };
}

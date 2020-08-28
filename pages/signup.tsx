import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import Router from 'next/router';
import { verify } from 'jsonwebtoken';
import db from '../lib/db';
import { ApiRoutesTypes } from '../lib/ApiRoutesTypes';
import Register from '../styled-components/Register/Register';
import BasicLayout from '../styled-components/GlobalStyle';
import RegisterBox from '../styled-components/Register/RegisterBox';

export default function App({ users, emails }) {
  const { register, watch, handleSubmit, errors } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  console.log(errors);
  console.log(users);

  async function handleLogin(data) {
    const resp = await fetch('https://https://raider-poke-app.vercel.app/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.username,

        password: data.password,
        email: data.email,
      }),
    });

    if (resp.status === 200) {
      Router.push('/Login');
    }
  }

  return (
    <BasicLayout>
      <Register>
        <RegisterBox>
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <input
              type="text"
              placeholder="username"
              name="username"
              ref={register({
                validate: (value) => !users.includes(value) || 'error message', // <p>error message</p>
              })}
            />
            {errors.username && <p>Username already taken</p>}
            <input
              name="password"
              type="password"
              placeholder="password"
              ref={register({
                required: true,
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                  message: `The password must have:\n - 8 characters \n - At least one letter \n And one number`, // <p>error message</p>
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <input
              name="password_repeat"
              type="password"
              placeholder="repeat password"
              ref={register({
                required: true,
                validate: (value) => value === password.current || 'The passwords do not match',
              })}
            />
            {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
            <input
              name="email"
              placeholder="email"
              type="email"
              ref={register({
                required: 'Please insert an email',
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email address',
                },
                validate: (value) => !emails.includes(value) || 'Mail already taken',
              })}
            />
            {errors.email && <p>Email already in use</p>}
            <input type="submit" />
          </form>
        </RegisterBox>
      </Register>
    </BasicLayout>
  );
}

export async function getServerSideProps(ctx: ApiRoutesTypes) {
  // tried to make the auth function works but couldn't
  // auth(ctx, db);
  if (ctx.req.headers.cookie !== undefined) {
    const cookie = ctx.req.headers.cookie.split('=')[1];

    const checkStatus = await db.query('SELECT * FROM tokens WHERE token = $1 AND status = True', [
      cookie,
    ]);

    verify(cookie, process.env.SECRET, async (err, decoded) => {
      // no error, valid password and valid token
      if (!err && decoded && checkStatus.rows.length > 0) {
        ctx.res.writeHead(302, {
          Location: 'http://localhost:3000/',
        });
        ctx.res.end();
      }
    });
  }
  const users = (await db.query('SELECT name FROM users')).rows.map((el) => el.name);
  const emails = (await db.query('SELECT email FROM users')).rows.map((el) => el.email);

  console.log(users);

  return { props: { users, emails } };
}

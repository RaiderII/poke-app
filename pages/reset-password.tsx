import { ApiRoutesTypes } from '../lib/ApiRoutesTypes';
import db from '../lib/db';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import Router from 'next/router';
import fetchJson from '../lib/fetchJson';
import BasicLayout from '../styled-components/GlobalStyle';
import Change from '../styled-components/ChangePassword/Change';
import ChangeBox from '../styled-components/ChangePassword/ChangeBox';

export default function ResetPassword({ status, user, token }) {
  const { register, watch, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState('');
  const password = useRef({});
  password.current = watch('password', '');
  //console.log(status, user);
  console.log(message);

  async function handleLogin(data) {
    try {
      await fetchJson('http://https://raider-poke-app.vercel.app/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          name: user.name,
          password: data.password,
        }),
      });

      Router.push('/login');
    } catch (e) {
      setMessage(e.data.message);
    }
  }
  if (!status) {
    return <div>Token expired</div>;
  } else
    return (
      <BasicLayout>
        <Change>
          <ChangeBox>
            <form onSubmit={handleSubmit(handleLogin)}>
              <input
                name="password"
                type="password"
                placeholder="password"
                ref={register({
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                    message:
                      'The password must have 8 characters, at least one letter and one number', // <p>error message</p>
                  },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
              <input
                name="password_repeat"
                type="password"
                placeholder="repeat password"
                ref={register({
                  validate: (value) => value === password.current || 'The passwords do not match',
                })}
              />
              {errors.password_repeat && <p>{errors.password_repeat.message}</p>}

              <input type="submit" />
            </form>
            <h1>{message}</h1>
          </ChangeBox>
        </Change>
      </BasicLayout>
    );
}

export async function getServerSideProps(ctx: ApiRoutesTypes) {
  if (ctx === undefined) {
    return { props: { status: false } };
  }

  const token = ctx.query.token;

  const user = (await db.query('SELECT * FROM users WHERE password_reset_token = $1', [token]))
    .rows[0];

  if (!user) {
    console.log('user not found');
    return { props: { status: false } };
  }

  return { props: { status: true, user: user, token } };
}

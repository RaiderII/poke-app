import { ApiRoutesTypes } from '../lib/ApiRoutesTypes';
import pageAuthentication from '../helpers/pageAuthentication';
import db from '../lib/db';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import fetchJson from '../lib/fetchJson';
import BasicLayout from '../styled-components/GlobalStyle';
import Change from '../styled-components/ChangePassword/Change';
import ChangeBox from '../styled-components/ChangePassword/ChangeBox';

export default function ChangePassword({ email }) {
  const { register, watch, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState('');
  const password = useRef({});
  password.current = watch('password', '');
  //console.log(status, user);
  console.log('message', message);
  async function handleReset(data) {
    console.log(data);
    try {
      const res = await fetchJson('http://localhost:3000/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: data.old_password,
          newPassword: data.password,
          email,
        }),
      });

      setMessage(res.message);
    } catch (e) {
      setMessage(e.data.message);
    }
  }

  return (
    <BasicLayout>
      <Change>
        <ChangeBox>
          <form onSubmit={handleSubmit(handleReset)}>
            <input
              type="text"
              placeholder="Enter your old password"
              name="old_password"
              ref={register({ required: true })}
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              ref={register({
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
                validate: (value) => value === password.current || 'The passwords do not match',
              })}
            />
            {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
            <h1>{message}</h1>
            <input type="submit" />
          </form>
        </ChangeBox>
      </Change>
    </BasicLayout>
  );
}

export async function getServerSideProps(ctx: ApiRoutesTypes) {
  pageAuthentication(ctx, db);
  const cookie = ctx.req.headers.cookie.split('=')[1];
  console.log(cookie);

  const query = {
    text: 'SELECT fk_users_id FROM tokens WHERE token = $1 AND status = true',
    values: [cookie],
    //  rowMode: "array",
  };
  const userId = (await db.query(query)).rows[0].fk_users_id;
  console.log(userId);

  const email = (await db.query('SELECT email FROM users WHERE id = $1', [userId])).rows[0].email;

  console.log(email);

  return { props: { email } };
}

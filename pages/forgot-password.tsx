import { useState } from 'react';
import fetchJson from '../lib/fetchJson';
import Link from 'next/link';
import BasicLayout from '../styled-components/GlobalStyle';
import Forgot from '../styled-components/ForgotPassword/Forgot';
import ForgotBox from '../styled-components/ForgotPassword/ForgotBox';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetchJson('https://raider-poke-app.vercel.app/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      setMessage(res.message);
    } catch (error) {
      console.log(error);
      setMessage(error.data.message);
    }
  };

  return (
    <BasicLayout>
      <Forgot>
        <ForgotBox>
          <form onSubmit={handleSubmit}>
            <label>
              Enter your email
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <h1>{`  ${message}`}</h1>
            <input type="submit" value="Submit" />
          </form>
        </ForgotBox>
      </Forgot>
    </BasicLayout>
  );
}

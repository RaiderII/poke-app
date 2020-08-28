import { ApiRoutesTypes } from '../lib/ApiRoutesTypes';
import Router from 'next/router';

interface NavBar {
  userName: string;
}

export default function NavBar({ userName }: NavBar) {
  async function handleLogout() {
    await fetch('https://raider-poke-app.vercel.app/api/logout', {
      method: 'POST',
    });
    Router.push('/login');
  }

  return (
    <div>
      <h1>{userName}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

import MenuStyle from '../styled-components/Burger/MenuStyle';
import Router from 'next/router';

interface Props {
  openMenu: boolean;
  userName: string;
}
const Menu = ({ openMenu, userName }: Props) => {
  async function handleLogout() {
    await fetch('http://localhost:3000/api/logout', {
      method: 'POST',
    });
    Router.push('/login');
  }
  return (
    <>
      <MenuStyle openMenu={openMenu}>
        <h1>{userName}</h1>
        <a href="/my-pokemon">My Pokemon</a>
        <a href="/change-password">Change Password</a>
        <a href="/">Home</a>
        <a onClick={handleLogout}>Logout</a>
      </MenuStyle>
    </>
  );
};
export default Menu;

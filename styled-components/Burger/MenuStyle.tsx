import styled from '@xstyled/styled-components';

const MenuStyle = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  backdrop-filter: blur(10px);
  text-align: left;
  padding: 2rem;
  padding-top: 5rem;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  transition: transform 0.3s ease-in-out;
  position: fixed;
  transform: translateX(-100%);
  transform: ${({ openMenu }) => (openMenu ? 'translateX(0)' : 'translateX(-100%)')};

  * {
    top: 1rem;
    align-self: center;
  }
  h1 {
    padding-top: 1rem;
    color: #253526;
    font-size: 4rem;
    border-bottom-style: solid;
    border-bottom-width: thin;
  }
  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #4d6f51;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;

export default MenuStyle;

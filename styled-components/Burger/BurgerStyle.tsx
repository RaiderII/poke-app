import styled from '@xstyled/styled-components';

const BurgerStyle = styled.button`
  position: fixed;
  top: 2rem;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 3.3rem;
  height: 4rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  color: green;

  &:focus {
    outline: none;
  }

  div {
    width: 3.3rem;
    height: 0.5rem;
    background: #1d4f22;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }
`;

export default BurgerStyle;

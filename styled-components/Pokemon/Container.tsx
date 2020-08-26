import styled from '@xstyled/styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  flex-direction: row;
  width: 100%;
  background: #e4eee6;
  padding-bottom: 2.5rem;

  h1 {
    font-size: 2rem;
    letter-spacing: 0.08rem;
  }

  p {
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-size: 1rem;
    color: #5c655e;
    margin-top: 0.4rem;
  }
`;

export default Container;

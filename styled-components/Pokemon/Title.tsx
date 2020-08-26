import styled from '@xstyled/styled-components';

const Title = styled.div`
  display: flex;
  border-radius: 5rem;
  background-color: ${({ name }) => (name ? '#8ecaa2' : '#439063')};
  padding: 0.5rem 2rem;
  margin: 1rem 0 2.3rem 0;

  h1 {
    color: ${({ name }) => (name ? '#E8F5EE' : '#B3D4C0')};
    font-size: 3rem;
  }
`;

export default Title;

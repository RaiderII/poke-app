import styled from '@xstyled/styled-components';

const Abilities = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #ebf0ec;
  width: 100%;
  border-top: 0.4px solid #1d4f22;
  border-bottom: 0.4px solid #1d4f22;
  padding-top: 2rem;
  padding-bottom: 2rem;
  margin-bottom: 1.5rem;

  ul {
    align-self: flex-start;
  }
  li {
    list-style-type: none;
    color: #5c655e;
    padding-top: 0.3rem;
    letter-spacing: 0.7px;
    font-size: 1.5rem;
    text-align: left;
    left: 0;
  }
`;

export default Abilities;

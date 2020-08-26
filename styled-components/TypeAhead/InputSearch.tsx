import styled from '@xstyled/styled-components';

const InputSearch = styled.input`
  position: relative;
  border-radius: 5rem;
  border: none;
  height: 5.2rem;
  width: 100%;
  transform: ${(props) => (props.search ? 'translate(0%)' : 'translate(100%)')};
  transition: 0.5s;

  ::placeholder {
    padding-left: 3rem;
  }

  :focus {
    outline: none;
  }
`;

export default InputSearch;

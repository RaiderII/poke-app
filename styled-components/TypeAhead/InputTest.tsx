import styled from '@xstyled/styled-components';

const InputTest = styled.input`
  position: relative;
  display: flex;
  top: 1rem;
  left: calc(100% - 4.5em);
  -webkit-appearance: textfield;
  -webkit-box-sizing: content-box;
  border: solid 1px #ccc;
  font-family: inherit;
  font-size: 100%;
  border-radius: 25px;
  border-width: 1.4px;
  border-color: borderInputDark;

  background-color: transparent;

  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button {
    display: none;
  }

  width: 4rem;
  height: 4rem;
  color: transparent;
  cursor: pointer;
  transition: all 0.3s;

  :focus {
    outline: none;
    border-radius: 0;
    left: 0;
    width: 99%;
    color: #000;
    cursor: auto;
  }
`;

export default InputTest;

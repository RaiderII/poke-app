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

  outline: ${({ search }) => search && 'none'};
  border-radius: ${({ search }) => search && '0'};
  left: ${({ search }) => search && '0'};
  width: ${({ search }) => search && '99%'};
  color: ${({ search }) => search && '#000'};
  cursor: ${({ search }) => search && 'auto'}; ;;
`;

export default InputTest;

// import styled from 'styled-components';
import styled, { breakpoints } from '@xstyled/styled-components';

const RegisterBox = styled.div`
  display: flex;

  background-color: darkWhite;
  border-radius: 4px;
  flex-direction: column;

  justify-content: center; /* vertical alignment */
  align-items: center;
  max-height: 45rem;
  flex-grow: 1;
  width: xs;

  h1 {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    color: fontColor;
    font-weight: 600;
  }

  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    border: 1px solid white;
    border-color: borderInput;
    background: transparent;
    padding: 10px 15px;
    margin-bottom: 10px;
    font-size: small;

    ::placeholder {
      color: placeholderColor;
    }
  }

  input:last-child {
    top: 1rem;
    margin: 2rem;
    margin-left: 3rem;
    width: 15rem;
    border-radius: 30px;
    border: none;
    color: white;
    background-image: linear-gradient(
      to bottom,
      rgba(20, 230, 118, 0.4290091036414566) 0%,
      rgba(3, 212, 72, 0.48783263305322133) 72%
    );
  }

  p {
    color: #bf1650;
    white-space: pre-line;
    font-size: 1.3rem;
  }

  p::before {
    display: inline;
    content: '⚠ ';
  }

  label {
    line-height: 2;
    text-align: left;
    display: block;
    margin-bottom: 0.7rem;
    margin-top: 2.5rem;
    color: black;
    font-size: 14px;
    font-weight: 600;
    color: rgb(53, 102, 94);
  }
`;

export default RegisterBox;

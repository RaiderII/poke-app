// import styled from 'styled-components';
import styled from '@xstyled/styled-components';
import { breakpoints } from '@xstyled/system';
import { css } from '@xstyled/styled-components';

const RegisterBox = styled.div(
  breakpoints({
    xs: css`
      /* All devices */
      display: flex;

      background-color: darkWhite;
      border-radius: 4px;
      flex-direction: column;
      padding: 8rem 0 4rem 0;

      justify-content: center; /* vertical alignment */
      align-items: center;
      width: xs;
      max-height: 60rem;

      input {
        display: block;
        box-sizing: border-box;
        width: 100%;
        border-radius: 4px;
        border: 1px solid white;
        border-color: borderInput;
        background: transparent;
        padding: 10px 15px;
        margin-bottom: 2rem;
        font-size: small;

        ::placeholder {
          color: placeholderColor;
        }
      }

      input:last-child {
        top: 1rem;
        margin: 2rem;
        margin-left: 3rem;
        margin-top: 5rem;
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
        font-family: 'Lato', sans-serif;
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
    `,
    sm: css`
      /* From md breakpoint */
      padding-top: 3rem;
      height: 70rem;
      width: 55rem;
      align-content: space-between;

      h2 {
        margin-top: 3rem;
        font-size: 1.8rem;
      }

      h1 {
        color: #26c26f;
      }

      label {
        font-size: 2rem;
      }

      input {
        font-size: 2rem;
        width: 40rem;
        height: 5rem;
        margin: 4rem 0 4rem 0;
      }

      input:last-child {
        margin-top: 7rem;
        margin-left: 10rem;
        width: 20rem;
        height: 5rem;
        font-size: 2rem;
      }
    `,
    lg: css`
      /* From lg breakpoint */
    `,
  })
);

export default RegisterBox;

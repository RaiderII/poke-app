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
      font-family: 'Lato', sans-serif;
      border-radius: 4px;
      flex-direction: column;
      padding: 4rem 0 2rem 0;

      justify-content: center; /* vertical alignment */
      align-items: center;
      width: xs;
      max-height: 50rem;

      input {
        display: block;
        box-sizing: border-box;
        width: 100%;
        border-radius: 4px;
        border: 1px solid white;
        border-color: borderInput;
        background: transparent;
        padding: 10px 15px;
        margin-top: 1rem;
        font-size: small;

        ::placeholder {
          color: placeholderColor;
        }
      }

      input::after {
        display: block;
        content: 'test';
      }

      form :nth-child(3) {
        top: 1rem;
        margin: 2rem;
        margin-left: 3rem;
        margin-top: 3rem;
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

      h1 {
        margin-top: 1.2rem;
        font-size: 1.3rem;
        color: #26c26f;
      }

      p {
        color: #bf1650;
        white-space: pre-line;
        font-size: 1.3rem;
        font-family: 'Lato', sans-serif;
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
      height: 60rem;
      width: 55rem;
      align-content: space-around;
      justify-content: space-around;

      h2 {
        margin-top: 3rem;
        font-size: 1.8rem;
      }

      h1 {
        font-size: 2rem;
        color: #26c26f;
      }

      label {
        font-size: 2rem;
      }

      input {
        font-size: 2rem;
        width: 40rem;
        height: 5rem;
        margin: 2rem 0 4rem 0;
      }

      form :nth-child(3) {
        margin-top: 6rem;
        margin-left: 13rem;
      }
    `,
    lg: css`
      /* From lg breakpoint */
    `,
  })
);

export default RegisterBox;

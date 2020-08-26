import styled from '@xstyled/styled-components';
import { breakpoints } from '@xstyled/system';
import { css } from '@xstyled/styled-components';

const LoginBox = styled.div(
  breakpoints({
    xs: css`
      /* All devices */
      display: flex;

      background-color: darkWhite;
      border-radius: 4px;
      flex-direction: column;

      justify-content: center; /* vertical alignment */
      align-items: center;
      height: 55%;
      width: 80%;

      input {
        display: block;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid white;
        border-color: borderInput;
        background: transparent;
        padding: 10px 15px;
        margin-bottom: 10px;
        font-size: 14px;
        outline: none;

        ::placeholder {
          color: placeholderColor;
        }

        :focus {
          outline: none;
          border-color: grey;
        }
      }
      p {
        color: #bf1650;
        font-size: 1.3rem;
      }

      p::before {
        display: inline;
        content: '⚠ ';
      }

      h2 {
        margin-left: 1rem;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;

        :hover {
          color: purple;
        }
      }

      input:last-child {
        top: 1rem;
        margin: 2rem;
        color: white;
        margin-left: 3rem;
        width: 15rem;
        border-radius: 30px;
        border: none;
        background-image: linear-gradient(
          to bottom,
          rgba(16, 219, 111, 0.49343487394957986) 0%,
          rgba(0, 250, 83, 0.5214460784313726) 72%
        );
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
      height: 60rem;
      width: 65rem;
      align-content: space-between;

      h2 {
        margin-top: 3rem;
        font-size: 1.8rem;
      }

      label {
        font-size: 2rem;
      }

      input {
        font-size: 2rem;
        width: 40rem;
        height: 5rem;
        margin-top: 1rem;
      }

      input:last-child {
        margin-top: 7rem;
        margin-left: 12rem;
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

export default LoginBox;

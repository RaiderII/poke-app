import styled from '@xstyled/styled-components';
import { breakpoints } from '@xstyled/system';
import { css } from '@xstyled/styled-components';

const Card = styled.div(
  breakpoints({
    xs: css`
      /* All devices */
      display: flex;
      bottom: 0;
      padding: 2rem 3rem 3rem 3rem;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: calc(100% - 3rem);
      background: #ebf0ec;
      border-radius: 5px 5px 0 0;
      -webkit-box-shadow: 1px 6px 29px -9px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 1px 6px 29px -9px rgba(0, 0, 0, 0.75);
      box-shadow: 1px 6px 29px -9px rgba(0, 0, 0, 0.75);

      div:nth-child(0) {
        background-color: red;
      }

      h1:nth-child(2) {
        color: #3e443f;
        font-size: 3rem;
        padding-bottom: 4rem;
        letter-spacing: 0.1rem;
      }

      img {
        width: 15rem;
      }
    `,
    sm: css`
      /* From md breakpoint */
      width: 75%;
      height: 85rem;

      img {
        width: 25rem;
      }

      h1 {
        font-size: 3.4rem;
      }
    `,
    lg: css`
      /* From lg breakpoint */
      width: 40%;
      height: 80rem;
    `,
  })
);

export default Card;

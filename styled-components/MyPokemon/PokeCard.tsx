import styled from '@xstyled/styled-components';
import { breakpoints } from '@xstyled/system';
import { css } from '@xstyled/styled-components';

const PokeCard = styled.div(
  breakpoints({
    xs: css`
      /* All devices */
      display: flex;
      width: 15rem;
      height: 23rem;
      margin: 2rem 0 2rem 0;
      padding: 1rem;
      flex-direction: column;
      align-content: center;
      opacity: ${({ status }) => status && '0.5'};
      transition: 0.1s;

      border-radius: 1rem;
      align-items: center;
      background-color: #e4eee6;
      -webkit-box-shadow: 1px 6px 29px -9px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 1px 6px 29px -9px rgba(0, 0, 0, 0.75);
      box-shadow: 1px 6px 29px -9px rgba(0, 0, 0, 0.75);

      p {
        text-transform: capitalize;
        font-family: 'Lato', sans-serif;
        font-size: 1.7rem;
        flex-grow: 1;
        color: #10400d;
        font-weight: 600;
        text-shadow: 1px 1px 12px rgba(150, 150, 150, 1);
      }

      a {
        text-decoration: none;
        text-align: center;
        img {
          width: 12rem;
          border-bottom: 0.15rem solid #1d4f22;
        }
      }
    `,
    sm: css`
      /* From md breakpoint */
      margin: 2rem 3rem 2rem 3rem;
    `,
    lg: css`
      /* From lg breakpoint */
    `,
  })
);

export default PokeCard;

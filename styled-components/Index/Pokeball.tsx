import PokeballSVG from '../../public/pokeball.svg';
import styled from '@xstyled/styled-components';
import { breakpoints } from '@xstyled/system';
import { css } from '@xstyled/styled-components';

const Pokeball = styled(PokeballSVG)(
  breakpoints({
    xs: css`
      /* All devices */
      margin-top: 2rem;
      width: 4rem;
      height: 4rem;
      filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
      opacity: ${({ turnedOff, singlePoke }) => (turnedOff || singlePoke) && '0.5'};
      transition: 0.1s;

      :active {
        animation-name: capture;
        animation-duration: 2s;
      }

      @keyframes capture {
        from {
          filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
        }
        to {
          filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3)) brightness(0.1);
        }
      }
    `,
    sm: css`
      /* From md breakpoint */
      width: 6rem;
      height: 6rem;
    `,
    lg: css`
      /* From lg breakpoint */
    `,
  })
);

export default Pokeball;

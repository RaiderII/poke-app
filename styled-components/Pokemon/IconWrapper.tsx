import styled from '@xstyled/styled-components';
import { breakpoints } from '@xstyled/system';
import { css } from '@xstyled/styled-components';

const IconWrapper = styled.div(
  breakpoints({
    xs: css`
      /* All devices */
      display: flex;
      align-items: center;
      justify-content: center;
      justify-content: space-around;
      border-radius: 50px;
      height: 4.5rem;
      width: 4.5rem;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      background: ${({ colorType }) => colorType && colorType};
    `,
    sm: css`
      /* From md breakpoint */
      height: 6rem;
      width: 6rem;
    `,
    lg: css`
      /* From lg breakpoint */
    `,
  })
);

export default IconWrapper;

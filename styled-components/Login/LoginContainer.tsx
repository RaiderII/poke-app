import styled from '@xstyled/styled-components';
import { breakpoints } from '@xstyled/system';
import { css } from '@xstyled/styled-components';

const LoginContainer = styled.div(
  breakpoints({
    xs: css`
      /* All devices */
      display: flex;
      flex-direction: column;
      justify-content: center; /* vertical alignment */
      align-items: center; /* horizontal alignment */
      height: 100vh;
      font-weight: 5;
      font-family: 'Lato', sans-serif;
      background: rgb(59, 154, 113);
      background: linear-gradient(152deg, rgba(59, 154, 113, 1) 0%, rgba(42, 115, 145, 1) 73%);
    `,
    md: css`
      /* From md breakpoint */
    `,
    lg: css`
      /* From lg breakpoint */
    `,
  })
);

export default LoginContainer;

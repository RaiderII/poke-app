import styled from '@xstyled/styled-components';

const ArrowTop = styled.div`
  position: fixed;
  bottom: 4rem;
  right: 17.4rem;
  width: 2.4rem;
  height: 2.4rem;
  z-index: 9;
  display: ${({ showScroll }) => (showScroll ? 'flex' : 'none')};
  background: url(/arrowtop.svg) no-repeat center / contain;
`;

export default ArrowTop;

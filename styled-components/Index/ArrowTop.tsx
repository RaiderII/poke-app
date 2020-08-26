import IconSVG from '../../public/ArrowTop.svg';
import styled from '@xstyled/styled-components';

const ArrowTop = styled(IconSVG)`
  position: fixed;
  bottom: 4rem;
  right: 17.4rem;
  width: 2.4rem;
  height: 2.4rem;
  z-index: 9;
  display: ${({ showScroll }) => (showScroll ? 'flex' : 'none')};
`;

export default ArrowTop;

import styled from '@xstyled/styled-components';

const TypeIcon = styled.div`
  height: 2rem;
  width: 2rem;
  background: url(${({ type }) => `/types/${type}.svg`}) no-repeat center / contain;
`;

export default TypeIcon;

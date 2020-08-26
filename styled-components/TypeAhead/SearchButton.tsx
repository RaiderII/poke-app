import styled from '@xstyled/styled-components';

const SearchButton = styled.button`
  display: ${(props) => props.search && 'none'};
  position: absolute;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border-style: none;
  top: 0;
  right: 0;
  transition: none !important;
`;

export default SearchButton;

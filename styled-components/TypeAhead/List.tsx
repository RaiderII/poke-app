import styled from '@xstyled/styled-components';

const List = styled.div`
  text-transform: capitalize;
  margin-top: 1rem;
  padding-top: 1rem;
  padding-left: 0.5rem;
  overflow: scroll;
  max-height: 20rem;
  color: black;
  background-color: white;
  /* display: ${(props) => !props.search && 'none'}; */
  ul li {
    font-size: 1.7rem;
    padding-top: 3px;

    :hover {
      color: violet;
    }
  }
`;

export default List;

import styled from '@xstyled/styled-components';
interface Props {
  openMenu: boolean;
  turnMenu: Function;
  onClick: (e: Event) => void;
}
const Body = styled.div<any>`
  align-items: center;
  flex-direction: column;
  overflow: ${({ openMenu }) => openMenu && 'hidden'};
  background-color: bgIndex;
  margin: 0;
  margin-bottom: 2rem;
  padding: 0;
  padding-bottom: 4rem;
  color: #effffa;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  justify-content: center;
  text-rendering: optimizeLegibility;
`;

export default Body;

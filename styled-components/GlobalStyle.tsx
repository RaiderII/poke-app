import { createGlobalStyle } from '@xstyled/styled-components';

const GlobalStyle = createGlobalStyle`


* {
    margin: 0;
    padding: 0;
}

*,
*::before,
*::after {
    box-sizing: inherit;
}



html {
    box-sizing: border-box;
    font-size: 62.5%; 
    position: relative;
    font-family: 'Lato', sans-serif;
    
  background: #84CF8C;
}

`;

const BasicLayout = ({ children }: { children: any }) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
};

export default BasicLayout;

'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: #f9fafb;
    min-height: 100vh;
  }
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <GlobalStyle />
        {/* <ThemeProvider theme={theme}> */}
        {/* <CssBaseline /> */}
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}

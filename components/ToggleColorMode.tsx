import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const ToggleColorMode: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleColorMode;
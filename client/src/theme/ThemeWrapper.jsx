import * as React from 'react';
import { themeOptions } from './config';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme(themeOptions);

export function ThemeWrapper({children}) {
  return <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>;
}
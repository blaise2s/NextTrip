// src/components/App.tsx
import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { blue, red } from '@material-ui/core/colors';
import { BrowserRouter } from 'react-router-dom';

import styles from './App.module.scss';
import Header from '../components/header/Header';
import RealTimeDeparture from './real-time-departure/RealTimeDeparture';

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: blue[800]
    },
    secondary: {
      main: red[500]
    }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Header />
        <main className={styles.mainContent}>
          <RealTimeDeparture />
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

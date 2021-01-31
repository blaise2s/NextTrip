// src/components/header/Header.tsx
import React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

export const APP_TITLE = 'NextTrip';

const Header = () => {
  return (
    <AppBar position="sticky" className={styles.header}>
      <Link to="/">
        <Typography id="brand" variant="h4">
          {APP_TITLE}
        </Typography>
      </Link>
    </AppBar>
  );
};

export default Header;

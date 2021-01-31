// src/app/components/real-time-departure/by-stop/ByStop.tsx
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import styles from './ByStop.module.scss';

export interface ByStopProps {
  nextTrip: (stop: string) => void;
}

const ByStop = (props: ByStopProps) => {
  const [stop, setStop] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStop(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSearch = () => {
    if (stop) {
      props.nextTrip(stop);
    }
  };

  return (
    <div>
      <form id="stop-form" onSubmit={handleSubmit} className={styles.form}>
        <TextField
          id="stop-input"
          variant="outlined"
          className={styles.input}
          type="number"
          label="Stop Number"
          onChange={handleChange}
          value={stop}
        />
        <IconButton id="stop-search" onClick={handleSearch}>
          <Search />
        </IconButton>
      </form>
    </div>
  );
};

export default ByStop;

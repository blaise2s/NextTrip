// src/components/real-time-departures/TabLink.tsx
import React, { forwardRef, useMemo } from 'react';
import { Tab, LinkProps, Omit } from '@material-ui/core';
import { Link } from 'react-router-dom';

const TabLink = (props: { to: string; by: string; change: () => void }) => {
  const renderLink = useMemo(
    () =>
      forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
        <Link to={props.to} ref={ref} {...itemProps} />
      )),
    [props.to]
  );

  return (
    <Tab
      onChange={props.change}
      id={`by-${props.by.toLowerCase()}`}
      label={`By ${props.by}`}
      component={renderLink}
    />
  );
};

export default TabLink;

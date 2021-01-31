// src/app/components/real-time-departure/RealTimeDeparture.tsx
import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { Paper, Tabs } from '@material-ui/core';
import { Observable } from 'rxjs/internal/Observable';
import { Route, useHistory, useLocation } from 'react-router-dom';

import styles from './RealTimeDeparture.module.scss';
import ByRoute from './by-route/ByRoute';
import {
  getNextTripForRoute,
  getNextTripForStop
} from '../../services/metro-transit-service';
import { NextTrip } from './metro-transit';
import Schedule from './schedule/Schedule';
import TabPanel from './TabPanel';
import ByStop from './by-stop/ByStop';
import TabLink from './TapLink';

export const REAL_TIME_DEPART_PG_TITLE = 'Real-Time Departures';

// TODO: findDOMNode is deprecated in StrictMode. Use Material UI v5 when released
const RealTimeDeparture = () => {
  const [error, setError] = useState(false);
  const [stop, setStop] = useState('');
  const [tab, setTab] = useState(0);
  const refreshInterval = 15; // Time in seconds
  const stopRefresh = 5 * 60; // Time in seconds
  const [refreshHandle, setRefreshHandle] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const [nextTrip, setNextTrip] = useState<NextTrip>();

  const location = useLocation();
  useEffect(() => {
    setTab(location.pathname === '/' ? 0 : 1);
  }, [location.pathname]);
  const history = useHistory();
  history.listen(loc => handleChangeTab(loc.pathname === '/' ? 0 : 1));

  const clearRefreshInterval = () => {
    if (refreshHandle) {
      clearInterval(refreshHandle);
    }
  };

  const handleRefresh = (observe: Observable<NextTrip>) => {
    const handle = setInterval(
      () => observe.subscribe(nextTrip => setNextTrip(nextTrip)),
      refreshInterval * 1000
    );
    setRefreshHandle(handle);
    setTimeout(() => clearInterval(handle), stopRefresh * 1000);
  };

  const handleNextTrip = (observe: Observable<NextTrip>) => {
    clearRefreshInterval();
    observe.subscribe(
      nextTrip => {
        setError(false);
        setNextTrip(nextTrip);
        handleRefresh(observe);
      },
      () => setError(true)
    );
  };

  const handleNextTripByStop = (stop: string) => {
    setStop(stop);
    handleNextTrip(getNextTripForStop(stop));
  };

  const handleNextTripByRoute = (
    forRoute: string,
    inDirection: string,
    atPlace: string
  ) => {
    handleNextTrip(getNextTripForRoute(forRoute, inDirection, atPlace));
  };

  const handleChangeTab = (tab: number) => {
    setTab(tab);
    clearRefreshInterval();
    setError(false);
    setNextTrip(undefined);
  };

  const ByTabs = () => (
    <Paper square className={styles.byTabs}>
      <Tabs centered variant="standard" value={tab}>
        <TabLink to="/" by="Route" change={() => handleChangeTab(0)} />
        <TabLink to="/stop" by="Stop" change={() => handleChangeTab(1)} />
      </Tabs>
    </Paper>
  );

  return (
    <div>
      <Typography variant="h5" className={styles.pageTitle}>
        {REAL_TIME_DEPART_PG_TITLE}
      </Typography>
      <div className={styles.mainContent}>
        <ByTabs />
        <TabPanel value={tab} index={0}>
          <Route
            path="/"
            exact
            render={() => <ByRoute nextTrip={handleNextTripByRoute} />}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Route
            path="/stop"
            exact
            render={() => <ByStop nextTrip={handleNextTripByStop} />}
          />
        </TabPanel>
        {error ? (
          <div id="invalid-stop">Stop {stop} does not exist</div>
        ) : (
          <Schedule nextTrip={nextTrip} />
        )}
      </div>
    </div>
  );
};

export default RealTimeDeparture;

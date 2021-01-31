// src/app/components/real-time-departure/schedule/Schedule.tsx
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  SvgIcon
} from '@material-ui/core';
import { RssFeed } from '@material-ui/icons';

import styles from './Schedule.module.scss';
import { NextTrip } from '../metro-transit';

export interface ScheduleProps {
  nextTrip: NextTrip | undefined;
}

const Schedule = (props: ScheduleProps) => {
  const ScheduleHeader = () => {
    const headers = ['Route', 'Destination', 'Departs'];
    return (
      <TableHead>
        <TableRow>
          {headers.map(header => (
            <TableCell key={header} id={`table-head-cell-${header}`}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const DepartureTimeCell = ({ departureText }: { departureText: string }) => {
    return departureText.toLowerCase().search(/(min|due)/) > -1 ? (
      <TableCell>
        <div className={styles.arrivingSoon}>
          {departureText}
          <SvgIcon>
            <RssFeed />
          </SvgIcon>
        </div>
      </TableCell>
    ) : (
      <TableCell>{departureText}</TableCell>
    );
  };

  const ScheduleBody = () => {
    return props.nextTrip &&
      props.nextTrip.departures &&
      props.nextTrip.departures.length > 0 ? (
      <TableBody>
        {props.nextTrip?.departures.map((departure, rowIdx) => (
          <TableRow key={rowIdx}>
            <TableCell>{departure.route_short_name}</TableCell>
            <TableCell>{departure.description}</TableCell>
            <DepartureTimeCell departureText={departure.departure_text} />
          </TableRow>
        ))}
      </TableBody>
    ) : (
      <TableBody>
        <div className={styles.noDepartures}>No departures at this time</div>
      </TableBody>
    );
  };

  const ScheduleTable = () => (
    <TableContainer component={Paper}>
      <Table id="schedule-table">
        <ScheduleHeader />
        <ScheduleBody />
      </Table>
    </TableContainer>
  );

  return props.nextTrip ? (
    <div>
      <ScheduleTable />
    </div>
  ) : null;
};

export default Schedule;

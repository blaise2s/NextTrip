// src/app/components/real-time-departure/by-route/ByRoute.tsx
import React, { ChangeEvent, useEffect, useState } from 'react';
import { InputLabel, MenuItem, Select } from '@material-ui/core';

import styles from './ByRoute.module.scss';
import { Direction, Route, Place } from '../metro-transit';
import {
  getRoutes,
  getDirections,
  getPlaces
} from '../../../services/metro-transit-service';

export interface ByRouteProps {
  nextTrip: (forRoute: string, inDirection: string, atPlace: string) => void;
}

export interface LabeledSelectProps {
  label: string;
  changeHandler: (event: ChangeEvent<{ value: unknown }>) => void;
  value: string;
  items: any[];
  indexer: { id: string; desc: string };
  disablingId?: string;
}

const ByRoute = (props: ByRouteProps) => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [routeId, setRouteId] = useState('');
  const [directions, setDirections] = useState<Direction[]>([]);
  const [directionId, setDirectionId] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [placeCode, setPlaceCode] = useState('');

  useEffect(() => {
    getRoutes().subscribe(routes => setRoutes(routes));
  }, []);

  const handleRouteChange = (event: ChangeEvent<{ value: unknown }>) => {
    const selectedRouteId = event.target.value as string;
    setRouteId(selectedRouteId);
    setDirectionId('');
    setPlaceCode('');
    getDirections(selectedRouteId).subscribe(directions =>
      setDirections(directions)
    );
  };

  const handleDirectionChange = (event: ChangeEvent<{ value: unknown }>) => {
    const selectedDirectionId = event.target.value as string;
    setDirectionId(selectedDirectionId);
    setPlaceCode('');
    getPlaces(routeId, selectedDirectionId).subscribe(places =>
      setPlaces(places)
    );
  };

  const handleStopChange = (event: ChangeEvent<{ value: unknown }>) => {
    const selectedPlaceCode = event.target.value as string;
    setPlaceCode(selectedPlaceCode);
    props.nextTrip(routeId, directionId, selectedPlaceCode);
  };

  const selectAttrs = (
    name: string,
    disablingId: string = 'NOT_DISABLED'
  ): { [key: string]: string | boolean; variant: 'outlined' } => {
    const lowerName = name.toLowerCase();
    const disabled = disablingId === '';
    return {
      id: `select-${lowerName}`,
      variant: 'outlined',
      disabled,
      autoWidth: false,
      className: styles.select
    };
  };

  return (
    <div className={styles.byRoute}>
      <InputLabel id="select-route-label">Route</InputLabel>
      <Select
        {...selectAttrs('Route')}
        onChange={handleRouteChange}
        value={routeId}
      >
        {routes.map(({ route_id, route_label }) => (
          <MenuItem id={route_id} key={route_id} value={route_id}>
            {route_label}
          </MenuItem>
        ))}
      </Select>
      <InputLabel id="select-direction-label">Direction</InputLabel>
      <Select
        {...selectAttrs('Direction', routeId)}
        onChange={handleDirectionChange}
        value={directionId}
      >
        {directions.map(({ direction_id, direction_name }) => (
          <MenuItem
            id={`${direction_id}`}
            key={direction_id}
            value={direction_id}
          >
            {direction_name}
          </MenuItem>
        ))}
      </Select>
      <InputLabel id="select-stop-label">Stop</InputLabel>
      <Select
        {...selectAttrs('Stop', directionId)}
        onChange={handleStopChange}
        value={placeCode}
      >
        {places.map(({ place_code, description }) => (
          <MenuItem id={place_code} key={place_code} value={place_code}>
            {description}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default ByRoute;

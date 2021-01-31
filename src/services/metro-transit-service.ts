// src/services/metro-transit-service.ts
import { ajax } from 'rxjs/ajax';
import {
  Direction,
  Route,
  Place,
  NextTrip
} from '../components/real-time-departure/metro-transit';

export const API_VERSION = 'nextripv2';
export const API_BASE = `https://svc.metrotransit.org/${API_VERSION}`;

export const getRoutes = () => {
  return ajax.getJSON<Route[]>(`${API_BASE}/routes`);
};

export const getDirections = (forRoute: string) => {
  return ajax.getJSON<Direction[]>(`${API_BASE}/directions/${forRoute}`);
};

export const getPlaces = (forRoute: string, inDirection: string) => {
  return ajax.getJSON<Place[]>(`${API_BASE}/stops/${forRoute}/${inDirection}`);
};

export const getNextTripForRoute = (
  route: string,
  direction: string,
  place: string
) => {
  return ajax.getJSON<NextTrip>(`${API_BASE}/${route}/${direction}/${place}`);
};

export const getNextTripForStop = (stop: string) => {
  return ajax.getJSON<NextTrip>(`${API_BASE}/${stop}`);
};

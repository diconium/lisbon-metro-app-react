
import { useState, useEffect, createContext, useContext } from 'react';
import { api } from '../api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [stations, setStations] = useState(new Map());
  const [destinations, setDestinations] = useState(new Map());

  useEffect(() => {
    Promise.all([api.getStations(), api.getDestinations()]).then(([stations, destinations]) => {
      const stationsMap = new Map(stations.map(station => [station.id, station]));
      const destinationsMap = new Map(destinations.map(destination => [destination.id?.toString(), destination]));

      setStations(stationsMap);
      setDestinations(destinationsMap);
    });
  }, []);

  return <AppContext.Provider value={{ stations, destinations }}>{children}</AppContext.Provider>
}

export const useDestinations = () => {
  const context = useContext(AppContext);

  if (!context?.destinations) {
    throw new Error('This must be used within a provider!');
  }

  return context.destinations;
}

export const useStations = () => {
  const context = useContext(AppContext);

  if (!context?.stations) {
    throw new Error('This must be used within a provider!');
  }

  return context.stations;
}

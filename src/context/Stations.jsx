
import { useState, useEffect, createContext, useContext } from 'react';
import { api } from '../api';

export const StationsContext = createContext();

export const StationsProvider = ({ children }) => {
  const [stations, setStations] = useState();

  useEffect(() => api.getStations().then(setStations), []);

  return <StationsContext.Provider value={stations}>{children}</StationsContext.Provider>
}

export const useStations = () => {
  const context = useContext(StationsContext);

  if (!context) {
    throw new Error('This must be used withing a provider!');
  }

  return context;
}

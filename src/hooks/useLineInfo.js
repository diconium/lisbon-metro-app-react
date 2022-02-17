import { useState, useEffect, useCallback } from 'react';
import { api } from '../api';
import { useStations, useDestinations } from '../context/App';
import { MINUTES } from '../utils/constants';

export const useLineInfo = (line) => {
  const [lineInfo, setLineInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const stations = useStations();
  const destinations = useDestinations();

  const mapIdsToNames = useCallback((lines) => lines.map(line => {
    const station = stations.get(line.id);
    const destination = destinations.get(line.destination);

    return (station && destination) ? { ...line, id: station.name, destination: destination.name } : line;

  }), [stations, destinations]);

  const fetchLineInfo = useCallback(() => {
    setIsLoading(true);
    api.getLineInfo(line).then(mapIdsToNames).then(setLineInfo).finally(() => setIsLoading(false));
  }, [mapIdsToNames, line]);

  useEffect(() => {
    if (!line) {
      return;
    }

    fetchLineInfo(line);

    const interval = setInterval(() => fetchLineInfo(line), 5 * MINUTES);

    return () => clearInterval(interval);
  }, [fetchLineInfo, line]);

  return { lineInfo, isLoading };
}

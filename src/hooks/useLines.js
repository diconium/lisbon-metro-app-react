import { useState, useEffect } from 'react';
import { api } from '../api';
import { MINUTES } from '../utils/constants';

export const useLines = () => {
  const [lines, setLines] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchLines = () => {
    setIsLoading(true);
    api.getLines().then(setLines).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchLines();

    const interval = setInterval(fetchLines, 5 * MINUTES);

    return () => clearInterval(interval);
  }, []);

  return {lines, isLoading};
}

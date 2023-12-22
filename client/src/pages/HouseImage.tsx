import { useEffect, useState } from 'react';
import axios from 'axios';
import { GETSINGLEIMAGEFORHOUSE } from '../utils/ApiRoutes';

export function useHouseImageData(existingData) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouseImageData = async () => {
      try {
        const response = await axios.get(GETSINGLEIMAGEFORHOUSE, { withCredentials: true });
        existingData.current = response.data;
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHouseImageData();
  }, [existingData]);

  return { isLoading, error };
}

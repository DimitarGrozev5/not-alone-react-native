import { useEffect, useState } from 'react';
import { fetchData } from '../data-fetching/fetch-data';
import { Connection } from '../store/user-data/user-data';
import { useStore } from '../store/useStore';

type ReturnType = {
  connected: Connection[];
  notConnected: Connection[];
};

const emptyResults = {
  connected: [],
  notConnected: [],
};

export const useSearchForUser = (query: string): ReturnType => {
  const [results, setResults] = useState<ReturnType>({ ...emptyResults });
  const token = useStore('userData').token;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let unmounted = false;
    if (query.length < 2) {
      setResults({ ...emptyResults });
      return;
    }

    timer = setTimeout(async () => {
      const route = `/users?query=${encodeURIComponent(query)}`;

      try {
        const results = await fetchData<ReturnType>(route, { token });
        !unmounted && setResults(results);
      } catch (error) {}
    }, 500);

    return () => {
      clearTimeout(timer);
      unmounted = true;
    };
  }, [query, token]);

  return results;
};

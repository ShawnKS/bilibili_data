import { useCallback, useEffect, useState } from 'react';

export type Api<A, T> = () => Promise<T>;

export const useApi = <A, T>(api: Api<A, T>): [T | undefined, boolean, () => void] => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | undefined>(undefined);

  const loadData = useCallback(() => {
    api()
      .then(setData)
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [api]);

  useEffect(loadData, [loadData]);

  return [data, isLoading, loadData];
};

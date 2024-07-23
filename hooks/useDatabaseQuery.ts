import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";

export function useDatabaseQuery(query: string, params: any[]) {
  const [data, setData] = useState<any>();
  const [error, setError] = useState(false);

  const database = useSQLiteContext();

  const getData = useCallback(async () => {
    const result = await database.getAllAsync(query, params);
    setData(result);
  }, [database, query, params]);

  useEffect(() => {
    database.withTransactionAsync(async () => {
      await getData().catch(() => {
        setError(true);
        setData(null);
      });
    });
  }, [database, getData]);

  return {
    data,
    error,
  };
}

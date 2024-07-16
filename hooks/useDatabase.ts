import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";

export function useDatabase(query: string) {
  const [data, setData] = useState<any>();
  const [error, setError] = useState(false);

  const database = useSQLiteContext();

  const getData = useCallback(async () => {
    const result = await database.getAllAsync(query);
    setData(result);
  }, [database, query]);

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

import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";

export function useDatabaseTransaction(query: string, params: any[]) {
  const [success, setSucess] = useState(false);
  const [error, setError] = useState(false);

  const database = useSQLiteContext();

  database.withTransactionAsync(async () => {
    const response = await database
      .runAsync(query, params)
      .catch(() => setError(true));

    if (response && response.changes > 0) {
      setSucess(true);
    }
  });

  return {
    success,
    error,
  };
}

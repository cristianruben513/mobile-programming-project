import Loader from "@/components/Loader";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";

import { config } from "@/config/config";
import { loadDatabase } from "@/utils/load-database";

interface Props {
  children: React.ReactNode;
}

export default function DatabaseProvider({ children }: Props) {
  const [dbLoaded, setDbLoaded] = useState(false);

  useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, []);

  if (!dbLoaded) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <SQLiteProvider databaseName={config.DATABASE_NAME} useSuspense>
        {children}
      </SQLiteProvider>
    </Suspense>
  );
}

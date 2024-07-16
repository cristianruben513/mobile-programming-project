import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

import { config } from "@/config/config";

export const loadDatabase = async () => {
  const dbName = config.DATABASE_NAME;

  const dbAsset = require("../assets/database.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbPath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbPath);

  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true },
    );
    await FileSystem.downloadAsync(dbUri, dbPath);
  }
};

import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

import { config } from "@/config/config";

export const dropDatabase = async () => {
  const db = await SQLite.openDatabaseAsync(config.DATABASE_NAME);
  const dbPath = `${FileSystem.documentDirectory}SQLite/${config.DATABASE_NAME}`;

  try {
    const fileInfo = await FileSystem.getInfoAsync(dbPath);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(dbPath);
      console.log("Database deleted successfully.");
    } else {
      console.log("Database file does not exist.");
    }
  } catch (error) {
    console.error("Error deleting database:", error);
  }
};

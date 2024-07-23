/* eslint-disable @typescript-eslint/no-unused-vars */

import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { createTables } from "./create-tables";
import { insertData } from "./insert-data";
import { displayData } from "./display-data";
import { dropDatabase } from "./drop-databse";

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

  const db = await SQLite.openDatabaseAsync(config.DATABASE_NAME);

  if (!db) {
    console.error("Failed to open database.");
  }
  const init = () => {
    createTables();
    insertData();
    displayData();
    //dropDatabase();
  };

  init();
};

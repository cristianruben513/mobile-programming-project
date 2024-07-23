import * as SQLite from "expo-sqlite";

import { config } from "@/config/config";

export const createTables = async () => {
  const db = await SQLite.openDatabaseAsync(config.DATABASE_NAME);

  if (!db) {
    console.error("Failed to open database.");
  }

  await db.execAsync(`PRAGMA foreign_keys = ON;`);

  const createTableUsersQuery = `
      CREATE TABLE IF NOT EXISTS Users (
        id_user INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        creation_date TEXT NOT NULL
      );
    `;

  const createTableStudents = `
      CREATE TABLE IF NOT EXISTS Students (
        id_student INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        generation TEXT NOT NULL,
        group_index TEXT NOT NULL,
        grade TEXT NOT NULL,
        major TEXT NOT NULL,
        note TEXT NOT NULL,
        id_user INTEGER NOT NULL,
        FOREIGN KEY (id_user) REFERENCES Users(id_user)
      );
    `;

  const createTableTeachers = `
      CREATE TABLE IF NOT EXISTS Teachers (
        id_teacher INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        field TEXT NOT NULL,
        id_user INTEGER NOT NULL,
        FOREIGN KEY (id_user) REFERENCES Users(id_user)
      );
    `;

  const createTableClasses = `
      CREATE TABLE IF NOT EXISTS Classes (
        id_class INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        cover TEXT NOT NULL,
        id_teacher INTEGER NOT NULL,
        FOREIGN KEY (id_teacher) REFERENCES Teachers(id_teacher)
      );
    `;

  const createTableAssists = `
      CREATE TABLE IF NOT EXISTS Assists (
        id_attendance INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        absent INTEGER NOT NULL,
        date TEXT NOT NULL,
        id_student INTEGER NOT NULL,
        id_class INTEGER NOT NULL,
        FOREIGN KEY (id_student) REFERENCES Students(id_student),
        FOREIGN KEY (id_class) REFERENCES Classes(id_class)
      );
    `;

  const createTableGrades = `
      CREATE TABLE IF NOT EXISTS Grades (
        id_grade INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        grade REAL NOT NULL,
        period INTEGER NOT NULL,
        id_student INTEGER NOT NULL,
        id_class INTEGER NOT NULL,
        FOREIGN KEY (id_student) REFERENCES Students(id_student),
        FOREIGN KEY (id_class) REFERENCES Classes(id_class)
      );
    `;

  const queries = [
    createTableUsersQuery,
    createTableStudents,
    createTableTeachers,
    createTableClasses,
    createTableAssists,
    createTableGrades,
  ];

  for (const query of queries) {
    try {
      db.execAsync(query);
    } catch (error) {
      console.error("Error creating table:", error);
    }
  }
};

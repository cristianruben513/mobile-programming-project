import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

import { config } from "@/config/config";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

export const loadDatabase = async () => {
  const dbName = config.DATABASE_NAME;

  const getDatabasePath = () => {
    return `${FileSystem.documentDirectory}SQLite/${dbName}`;
  };

  const dropDatabase = async () => {
    try {
      const dbPath = getDatabasePath();

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

  const db = await SQLite.openDatabaseAsync(config.DATABASE_NAME);

  if (!db) {
    console.error("Failed to open database.");
  }

  await db.execAsync(`PRAGMA foreign_keys = ON;`);

  const createTables = async () => {
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

  const insertData = async () => {
    const insertUsersDataQuery = `
    INSERT OR IGNORE INTO Users (id_user, name, password, email, creation_date) 
    VALUES 
    (1, 'Luis Manuel Valdivia Oceguera', '321', 'email@uppenjamo.com', '01-01-02'), 
    (2, 'Joseph Herrera Leon', '321', 'student@uppenjamo.com', '01-01-2045');
  `;

    const insertStudentsDataQuery = `
    INSERT OR IGNORE INTO Students (id_student, id_user, generation, group_index, grade, major, note) 
    VALUES (1, 2, '2020', 'A', '9', 'Ingenieria en Software', 'N/A');
  `;

    const insertTeachersDataQuery = `
    INSERT OR IGNORE INTO Teachers (id_teacher, field, id_user) 
    VALUES (1, 'Ingenieria en Software', 1);
  `;

    const insertClassesDataQuery = `
    INSERT OR IGNORE INTO Classes (id_class, name, code, cover, id_teacher) 
    VALUES (1, 'Programacion Moviles II', '69420', '', 1);
  `;

    const insertAssistsDataQuery = `
    INSERT OR IGNORE INTO Assists (id_attendance, absent, date, id_student, id_class) 
    VALUES (1, 1, '01-03-2024', 1, 1);
  `;

    const insertGradesDataQuery = `
    INSERT OR IGNORE INTO Grades (id_grade, grade, id_student, id_class) 
    VALUES (1, 9.8, 1, 1);
  `;

    const queries = [
      insertUsersDataQuery,
      insertStudentsDataQuery,
      insertTeachersDataQuery,
      insertClassesDataQuery,
      insertAssistsDataQuery,
      insertGradesDataQuery,
    ];

    for (const query of queries) {
      try {
        db.execAsync(query);
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    }
  };

  const deleteAllData = async () => {
    const deleteUsersDataQuery = `DELETE FROM Users;`;
    const deleteStudentsDataQuery = `DELETE FROM Students;`;
    const deleteTeachersDataQuery = `DELETE FROM Teachers;`;
    const deleteClassesDataQuery = `DELETE FROM Classes;`;
    const deleteAssistsDataQuery = `DELETE FROM Assists;`;
    const deleteGradesDataQuery = `DELETE FROM Grades;`;

    const queries = [
      deleteUsersDataQuery,
      deleteStudentsDataQuery,
      deleteTeachersDataQuery,
      deleteClassesDataQuery,
      deleteAssistsDataQuery,
      deleteGradesDataQuery,
    ];

    for (const query of queries) {
      try {
        db.execAsync(query);
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }

    try {
      db.execAsync(`VACUUM;`);
    } catch (error) {
      console.error("Error resetting auto-increment counters:", error);
    }
  };

  const init = () => {
    createTables();
    insertData();
    //dropDatabase();
    //deleteAllData();
  };

  init();

  interface User {
    id_user: number;
    name: string;
    password: string;
    creation_date: string;
  }

  interface Students {
    id_student: number;
    id_user: number;
    generation: string;
    grade: string;
    major: string;
    note: string;
  }

  interface Teachers {
    id_teacher: number;
    id_user: number;
    field: string;
  }

  interface Classes {
    id_class: number;
    id_teacher: number;
    name: string;
    code: string;
    cover: string;
  }

  interface Assists {
    id_attendance: number;
    id_student: number;
    id_class: number;
    absent: number;
    date: string;
  }

  interface Grades {
    id_grade: number;
    id_student: number;
    id_class: number;
    grade: number;
  }

  const allUsersRows = await db.getAllAsync("SELECT * FROM Users");
  const users = allUsersRows as User[];
  for (const row of users) {
    console.log(row.id_user, row.name, row.password, row.creation_date);
  }

  const allStudentsRows = await db.getAllAsync("SELECT * FROM Students");
  const students = allStudentsRows as Students[];
  for (const row of students) {
    console.log(row.id_user, row.generation, row.grade, row.major, row.note);
  }

  const allTeachersRows = await db.getAllAsync("SELECT * FROM Teachers");
  const teachers = allTeachersRows as Teachers[];
  for (const row of teachers) {
    console.log(row.id_teacher, row.id_user, row.field);
  }

  const allClassesRows = await db.getAllAsync("SELECT * FROM Classes");
  const classes = allClassesRows as Classes[];
  for (const row of classes) {
    console.log(row.id_class, row.id_teacher, row.name, row.code, row.cover);
  }

  const allAssistsRows = await db.getAllAsync("SELECT * FROM Assists");
  const assists = allAssistsRows as Assists[];
  for (const row of assists) {
    console.log(
      row.id_attendance,
      row.id_student,
      row.id_class,
      row.absent,
      row.date
    );
  }

  const allGradesRows = await db.getAllAsync("SELECT * FROM Grades");
  const grades = allGradesRows as Grades[];
  for (const row of grades) {
    console.log(row.id_grade, row.id_student, row.id_class, row.grade);
  }

  const dbAsset = require("../assets/database.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbPath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbPath);

  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbPath);
  }
};

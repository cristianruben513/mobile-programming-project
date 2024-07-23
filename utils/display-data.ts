import * as SQLite from "expo-sqlite";

import { config } from "@/config/config";

export const displayData = async () => {
  const db = await SQLite.openDatabaseAsync(config.DATABASE_NAME);

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
    period: number;
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
    console.log(
      row.id_grade,
      row.id_student,
      row.id_class,
      row.grade,
      row.period
    );
  }
};

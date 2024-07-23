export interface User {
  id_user: number;
  name: string;
  password: string;
  creation_date: string;
}

export interface Student {
  id_student: number;
  id_user: number;
  generation: string;
  grade: string;
  major: string;
  note: string;
}

export interface Teacher {
  id_teacher: number;
  id_user: number;
  field: string;
}

export interface Class {
  id_class: number;
  id_teacher: number;
  name: string;
  code: string;
  cover: string;
}

export interface Assist {
  id_attendance: number;
  id_student: number;
  id_class: number;
  absent: number;
  date: string;
}

export interface Grade {
  id_grade: number;
  id_student: number;
  id_class: number;
  grade: number;
  period: number;
}

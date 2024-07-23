import * as SQLite from "expo-sqlite";

import { config } from "@/config/config";

export const insertData = async () => {
  const db = await SQLite.openDatabaseAsync(config.DATABASE_NAME);

  const insertUsersDataQuery = `
    INSERT OR IGNORE INTO Users (id_user, name, password, email, creation_date) 
    VALUES 
    (1, 'Luis Manuel Valdivia Oceguera', 'contra', 'lmvaldivia@uppenjamo.edu.mx', '22-07-2024'), 
    (2, 'Estefania Carreño Gonzalez', 'contra321', 'ecgonzales@uppenjamo.edu.mx', '22-07-2024'),
    (3, 'Hiram Adonai Espiritu Lopez', 'contra321Lopez', 'haespiritu@uppenjamo.edu.mx', '22-07-2024'), 
    (4, 'Rodrigo Vazquez Arias', '123', 'rvarias@uppenjamo.edu.mx', '22-07-2024'),
    (5, 'Ramiro Ramos Melendez', 'password', 'rrmelendez@uppenjamo.edu.mx', '22-07-2024'),
    (6, 'Maleny Torres Calderon', 'contrasena', 'mtcalderon@uppenjamo.edu.mx', '22-07-2024'),
    (7, 'Antonio', 'asdfhpasdoifh', 'antonio@uppenjamo.edu.mx', '22-07-2024'),
    (8, 'Joseph Herrera Leon', '321', 'student@uppenjamo.edu.mx', '01-01-2045');
  `;

  const insertStudentsDataQuery = `
    INSERT OR IGNORE INTO Students (id_student, id_user, generation, group_index, grade, major, note) 
    VALUES (1, 8, '2020', 'A', '9', 'Ingenieria en Software', 'N/A');
  `;

  const insertTeachersDataQuery = `
    INSERT OR IGNORE INTO Teachers (id_teacher, field, id_user) 
    VALUES 
    (1, 'Ingenieria en Software', 1),
    (2, 'Plasticos', 2),
    (3, 'Ingenieria Industrial', 3),
    (4, 'Licenciatura en Administracion de Empresas', 4),
    (5, 'Maestria en Idiomas', 5),
    (6, 'Psicologia', 6),
    (7, 'Ingenieria en Seguridad de la Informacion', 7);
  `;

  const insertClassesDataQuery = `
    INSERT OR IGNORE INTO Classes (id_class, name, code, cover, id_teacher) 
    VALUES 
    (1, 'Tutorias 9A', '69420', '', 2),
    (2, 'Arquitectura Orientada a Servicios', '48393', '', 3),
    (3, 'Seguridad de la Informacion', '09032', '', 1),
    (4, 'Administracion de Proyectos de Software', '93023', '', 4),
    (5, 'Moviles II', '84932', '', 1),
    (6, 'English 9A', '74832', '', 5),
    (7, 'Expresion Oral y Escrita', '45728', '', 6),
    (8, 'Mineria de Datos', '47382', '', 7);
  `;

  const insertAssistsDataQuery = `
    INSERT OR IGNORE INTO Assists (id_attendance, absent, date, id_student, id_class) 
    VALUES 
    (1, 1, '18-07-2024', 1, 1),
    (2, 1, '18-07-2024', 1, 2),
    (3, 1, '18-07-2024', 1, 4);
  `;

  const insertGradesDataQuery = `
    INSERT OR IGNORE INTO Grades (id_grade, grade, period, id_student, id_class) 
    VALUES 
    (1, 9.8, 1, 1, 1),
    (2, 8, 1, 1, 2),
    (3, 8.7, 1, 1, 3),
    (4, 10, 1, 1, 4),
    (5, 9, 1, 1, 5),
    (6, 8.1, 1, 1, 6),
    (7, 9.9, 1, 1, 7),
    (8, 7, 1, 1, 8);
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

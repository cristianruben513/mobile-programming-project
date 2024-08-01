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
    (1, 'Tutorias 9A', '69420', 'https://images.unsplash.com/photo-1621356986575-05811227a42e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 2),
    (2, 'Arquitectura Orientada a Servicios', '48393', 'https://images.unsplash.com/photo-1625535163131-9d1fc30ea5f5?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 3),
    (3, 'Seguridad de la Informacion', '09032', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1),
    (4, 'Administracion de Proyectos de Software', '93023', 'https://images.unsplash.com/photo-1557200134-3103da7b6bff?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4),
    (5, 'Moviles II', '84932', 'https://images.unsplash.com/photo-1497161884053-1d0d43fe3c61?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1),
    (6, 'English 9A', '74832', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2844&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 5),
    (7, 'Expresion Oral y Escrita', '45728', 'https://images.unsplash.com/photo-1607473129014-0afb7ed09c3a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 6),
    (8, 'Mineria de Datos', '47382', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 7);
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

  const insertStudentsClassesQuery = `
    INSERT OR IGNORE INTO StudentsClasses (id_student, id_class) 
    VALUES 
    (1, 1);
  `;

  const queries = [
    insertUsersDataQuery,
    insertStudentsDataQuery,
    insertTeachersDataQuery,
    insertClassesDataQuery,
    insertAssistsDataQuery,
    insertGradesDataQuery,
    insertStudentsClassesQuery,
  ];

  for (const query of queries) {
    try {
      db.execAsync(query);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }
};

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { config } from "@/config/config";
import { Assist } from "@/types/index";
import { AssistsProps } from "@/types/types";
import { displayData } from "@/utils/display-data";
import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface Student {
  id_student: number;
  name: string;
}

interface Class {
  name: string;
}

const db = SQLite.openDatabaseSync(config.DATABASE_NAME);

const returnClassName = async (classId: number) => {
  const query = `SELECT c.name FROM Classes AS c WHERE c.id_class = ?`;

  try {
    const result = (await db.getFirstAsync(query, [classId])) as Class;
    return result?.name || "";
  } catch (error) {
    console.error("Error fetching class name: ", error);
    return "";
  }
};

const returnStudents = async (classId: number): Promise<Student[]> => {
  const query = `
        SELECT
            s.id_student,
            u.name
        FROM
            Students AS s
        JOIN
            Users AS u ON s.id_user = u.id_user
        JOIN
            StudentsClasses AS sc ON s.id_student = sc.id_student
        WHERE
            sc.id_class = ?
    `;
  try {
    return await db.getAllAsync(query, [classId]);
  } catch (error) {
    console.error("Error fetching students: ", error);
    return [];
  }
};

const insertAssitsDb = async (values: Assist) => {
  try {
    const statementUser = await db.prepareAsync(
      `INSERT INTO Assists (absent, date, id_student, id_class) VALUES (?, ?, ?, ?)`,
    );

    try {
      const result = await statementUser.executeAsync([
        values.absent,
        values.date,
        values.id_student,
        values.id_class,
      ]);
      return result;
    } finally {
      await statementUser.finalizeAsync();
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

const Assists: React.FC<AssistsProps> = ({ route, navigation }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [className, setClassName] = useState<string>("");
  const [assists, setAssists] = useState<{ [key: number]: boolean }>({}); // store attendance for each student

  useEffect(() => {
    const fetchData = async () => {
      const studentsReturned = await returnStudents(1);
      setStudents(studentsReturned);

      const classReturned = await returnClassName(1);
      setClassName(classReturned);
    };

    fetchData();
  }, []);

  const handleFormSubmit = async () => {
    const today = new Date().toISOString().split("T")[0];
    for (const student of students) {
      const isAbsent = assists[student.id_student] || false;
      await insertAssitsDb({
        id_attendance: 0,
        absent: isAbsent ? 0 : 1,
        date: today,
        id_student: student.id_student,
        id_class: 1,
      });
    }
    displayData();
  };

  return (
    <SafeAreaView className="flex-1 h-full">
      <ThemedView className="flex-1 h-full p-8 pt-20">
        <ThemedText className="t.text4xl font-bold text-center mb-2">
          Assists
        </ThemedText>
        <ThemedText className="text-xl text-center mb-5">
          {className}
        </ThemedText>
        <ScrollView>
          <View className="flex-1">
            <View className="flex-row border-b border-gray-300 pb-2 mb-2">
              <ThemedText className="flex-1 font-bold">Student Name</ThemedText>
              <ThemedText className="flex-1 font-bold text-right">
                Present
              </ThemedText>
            </View>
            {students.map((student) => (
              <View
                key={student.id_student}
                className="flex-row items-center border-b border-gray-300 py-2"
              >
                <ThemedText className="flex-1">{student.name}</ThemedText>
                <View className="ml-4">
                  <BouncyCheckbox
                    className="flex-1"
                    onPress={(isChecked: boolean) =>
                      setAssists((prev) => ({
                        ...prev,
                        [student.id_student]: isChecked,
                      }))
                    }
                    fillColor="green"
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity
          className="bg-green-500 mb-2 rounded-lg py-2 px-4 items-center justify-center w-full"
          onPress={handleFormSubmit}
        >
          <Text className="text-white font-bold">Submit</Text>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
};

export default Assists;

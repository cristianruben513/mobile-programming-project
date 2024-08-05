import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { config } from "@/config/config";
import { Grade } from "@/types/index";
import { GradesProps } from "@/types/types";
import { displayData } from "@/utils/display-data";
import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface Student {
  id_student: number;
  name: string;
}

interface Class {
  name: string;
}

const db = SQLite.openDatabaseSync(config.DATABASE_NAME);

const returnClassName = async (classId: number) => {
  const query = `
        SELECT
            c.name
        FROM
            Classes AS c        
        WHERE
            c.id_class = ?
    `;
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

const insertGradesDb = async (values: Grade) => {
  try {
    const statementUser = await db.prepareAsync(
      `INSERT INTO Grades (grade, period, id_student, id_class) VALUES (?, ?, ?, ?)`,
    );

    try {
      const result = await statementUser.executeAsync([
        values.grade,
        values.period,
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

const Grades: React.FC<GradesProps> = ({ route, navigation }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [className, setClassName] = useState<string>("");
  const [grades, setGrades] = useState<{ [key: number]: number }>({});
  const [selectedPeriod, setSelectedPeriod] = useState<string>("first");

  useEffect(() => {
    const fetchData = async () => {
      const studentsReturned = await returnStudents(1);
      setStudents(studentsReturned);

      const classReturned = await returnClassName(1);
      setClassName(classReturned);
    };

    fetchData();
  }, []);

  const colorScheme = useColorScheme();

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 4,
      color: colorScheme === "dark" ? "white" : "black",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: "gray",
      borderRadius: 8,
      color: colorScheme === "dark" ? "white" : "black",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

  const handleFormSubmit = async () => {
    for (const student of students) {
      const gradeString = grades[student.id_student]?.toString() || "";
      const gradeNumber = parseFloat(gradeString);
      if (!isNaN(gradeNumber) && gradeNumber > 0 && gradeNumber <= 10) {
        await insertGradesDb({
          id_grade: 0,
          grade: gradeNumber,
          period: selectedPeriod === "first" ? 1 : 2,
          id_student: student.id_student,
          id_class: 1,
        });
      } else {
        console.warn(
          `Grade for student ID ${student.id_student} is invalid: ${gradeNumber}`,
        );
      }
    }
    displayData();
  };

  return (
    <SafeAreaView className="flex-1">
      <ThemedView className="flex-1 p-4 pt-12">
        <ThemedText className="text-2xl font-bold text-center mb-2">
          Grades
        </ThemedText>
        <ThemedText className="text-xl text-center mb-4">
          {className}
        </ThemedText>
        <ThemedText className="text-lg mb-2" type="subtitle">
          Period
        </ThemedText>
        <RNPickerSelect
          onValueChange={(value) => setSelectedPeriod(value)}
          items={[
            { label: "First Period", value: "first" },
            { label: "Second Period", value: "second" },
          ]}
          style={pickerSelectStyles}
          value={selectedPeriod}
        />
        <ScrollView>
          <View className="flex-1`">
            <View className="flex-row border-b border-gray-300 pb-2 mb-2">
              <ThemedText className="flex-1 font-bold">Student Name</ThemedText>
              <ThemedText className="flex-1 font-bold text-right">
                Grade
              </ThemedText>
            </View>
            {students.map((student) => (
              <View
                key={student.id_student}
                className="flex-row border-b border-gray-300 py-2"
              >
                <ThemedText className="flex-1">{student.name}</ThemedText>
                <View className="ml-4">
                  <TextInput
                    className="border rounded-lg border-gray-300 p-1 w-20"
                    style={{
                      color: colorScheme === "dark" ? "white" : "black",
                    }}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setGrades((prev) => ({
                        ...prev,
                        [student.id_student]: parseFloat(text) || 0,
                      }))
                    }
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity
          className="bg-green-500 rounded py-2 px-4 items-center mt-4"
          onPress={handleFormSubmit}
        >
          <Text className="text-white font-bold">Submit</Text>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
};

export default Grades;

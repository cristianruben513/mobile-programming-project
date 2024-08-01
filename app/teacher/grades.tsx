import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TextInput, useColorScheme, TouchableOpacity } from "react-native";
import { Grade } from "@/types/index";
import { GradesProps } from "@/types/types";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as SQLite from "expo-sqlite";
import { config } from "@/config/config";
import { displayData } from "@/utils/display-data";
import RNPickerSelect from "react-native-picker-select";

interface Student {
    id_student: number;
    name: string;
}

interface Class {
    name: string
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
        const result = await db.getFirstAsync(query, [classId]) as Class;
        return result?.name || '';
    } catch (error) {
        console.error("Error fetching class name: ", error);
        return '';
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
                values.id_class
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
    const [className, setClassName] = useState<string>('');
    const [grades, setGrades] = useState<{ [key: number]: number }>({});
    const [selectedPeriod, setSelectedPeriod] = useState<string>('first');

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
            const gradeString = grades[student.id_student]?.toString() || '';
            const gradeNumber = parseFloat(gradeString);
            if (!isNaN(gradeNumber) && gradeNumber > 0 && gradeNumber <= 10) {
                await insertGradesDb({
                    id_grade: 0,
                    grade: gradeNumber,
                    period: selectedPeriod === 'first' ? 1 : 2, // Map 'first' to 1 and 'second' to 2
                    id_student: student.id_student,
                    id_class: 1
                });
            } else {
                console.warn(`Grade for student ID ${student.id_student} is invalid: ${gradeNumber}`);
            }
        }
        displayData();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.innerContainer}>
                <ThemedText style={styles.title}>Grades</ThemedText>
                <ThemedText style={styles.className}>{className}</ThemedText>
                <ThemedText type="subtitle">Period</ThemedText>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedPeriod(value)}
                    items={[
                        { label: 'First Period', value: 'first' },
                        { label: 'Second Period', value: 'second' }
                    ]}
                    style={pickerSelectStyles}
                    value={selectedPeriod}
                />
                <ScrollView>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <ThemedText style={styles.tableHeaderText}>Student Name</ThemedText>
                            <ThemedText style={[styles.tableHeaderText, { marginLeft: 200 }]}>Grade</ThemedText>
                        </View>
                        {students.map((student) => (
                            <View key={student.id_student} style={styles.tableRow}>
                                <ThemedText style={styles.tableCell}>{student.name}</ThemedText>
                                <TextInput
                                    style={[styles.tableCellInput, { marginRight: 45, color: colorScheme === "dark" ? "white" : "black" }]}
                                    keyboardType="numeric"
                                    onChangeText={(text) => setGrades(prev => ({ ...prev, [student.id_student]: parseFloat(text) || 0 }))}
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleFormSubmit}
                >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ThemedView>
        </SafeAreaView>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    innerContainer: {
        flex: 1,
        height: '100%',
        padding: 16,
        paddingTop: 60
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    className: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    table: {
        flex: 1,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 8,
        marginBottom: 8,
    },
    tableHeaderText: {
        flex: 1,
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 8,
    },
    tableCell: {
        flex: 1,
    },
    tableCellInput: {
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 6,
        width: 50,
    },
    submitButton: {
        backgroundColor: 'green',
        marginBottom: 8,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Grades;

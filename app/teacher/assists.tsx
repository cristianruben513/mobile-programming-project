import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Assist } from "@/types/index";
import { AssistsProps } from "@/types/types";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as SQLite from "expo-sqlite";
import { config } from "@/config/config";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { displayData } from "@/utils/display-data";

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

const Assists: React.FC<AssistsProps> = ({ route, navigation }) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [className, setClassName] = useState<string>('');
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
        const today = new Date().toISOString().split('T')[0];
        for (const student of students) {
            const isAbsent = assists[student.id_student] || false;
            await insertAssitsDb({
                id_attendance: 0,
                absent: isAbsent ? 0 : 1,
                date: today,
                id_student: student.id_student,
                id_class: 1
            });
        }
        displayData();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.innerContainer}>
                <ThemedText style={styles.title}>Assists</ThemedText>
                <ThemedText style={styles.className}>{className}</ThemedText>
                <ScrollView>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <ThemedText style={styles.tableHeaderText}>Student Name</ThemedText>
                            <ThemedText style={styles.tableHeaderText}>Present</ThemedText>
                        </View>
                        {students.map((student) => (
                            <View key={student.id_student} style={styles.tableRow}>
                                <ThemedText style={styles.tableCell}>{student.name}</ThemedText>
                                <BouncyCheckbox
                                    style={styles.tableCell}
                                    onPress={(isChecked: boolean) => setAssists(prev => ({ ...prev, [student.id_student]: isChecked }))}
                                    fillColor="green"
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

export default Assists;

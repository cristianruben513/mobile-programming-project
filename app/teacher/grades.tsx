import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TextInput, useColorScheme } from "react-native";
import { GradesProps } from "@/types/types";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as SQLite from "expo-sqlite";
import { config } from "@/config/config";

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

const Grades: React.FC<GradesProps> = ({ route, navigation }) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [className, setClassName] = useState<string>('');

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

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.innerContainer}>
                <ThemedText style={styles.title}>Grades</ThemedText>
                <ThemedText style={styles.className}>{className}</ThemedText>
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
                                    style={[styles.tableCellInput, { marginRight: 45, color: colorScheme === "dark" ? "white" : "black", }]}
                                    keyboardType="numeric"
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
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
    tableCellInput: {

        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 6,
        width: 50,
    },
});

export default Grades;

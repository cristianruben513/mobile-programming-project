
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import RNPickerSelect from "react-native-picker-select";
import * as SQLite from 'expo-sqlite';
import { config } from "@/config/config";

// Open or create the SQLite database
const db = SQLite.openDatabaseAsync(config.DATABASE_NAME)

    // Define FormValues type
    interface FormValues {
        name: string;
        email: string;
        password: string;
        role: string;
        generation?: string;
        group?: string;
        grade?: string;
        major?: string;
        field?: string;
    }

const SignUpSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Password too short!").required("Required"),
    role: Yup.string().required("Role is required"),
});

interface SignUpProps {
    setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialRoles = [
    { label: "Student", value: "student" },
    { label: "Teacher", value: "teacher" },
];

const grade = [
    { label: "First", value: "first" },
    { label: "Second", value: "second" },
    { label: "Third", value: "third" },
    { label: "Fourth", value: "fourth" },
    { label: "Fifth", value: "fifth" },
    { label: "Sixth", value: "sixth" },
    { label: "Seventh", value: "seventh" },
    { label: "Eighth", value: "eighth" },
    { label: "Ninth", value: "ninth" },
    { label: "Tenth", value: "tenth" },
];

const generation = [
    { label: "2018", value: "2018" },
    { label: "2019", value: "2019" },
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
    { label: "2024", value: "2024" },
];

const group = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
];

const major = [
    { label: "Licenciatura en Administracion y Gestion Empresarial", value: "Licenciatura en Administracion y Gestion Empresarial" },
    { label: "Licenciatura en Ingenieria en Logistica y Transporte", value: "Licenciatura en Ingenieria en Logistica y Transporte" },
    { label: "Licenciatura en Ingenieria en Software", value: "Licenciatura en Ingenieria en Software" },
    { label: "Licenciatura en Ingenieria Agroindustrial", value: "Licenciatura en Ingenieria Agroindustrial" },
    { label: "Licenciatura en Ingenieria en Biotecnologia", value: "Licenciatura en Ingenieria en Biotecnologia" },
    { label: "Licenciatura en Ingenieria Industrial", value: "Licenciatura en Ingenieria Industrial" },
    { label: "Licenciatura en Ingenieria Mecatronica", value: "Licenciatura en Ingenieria Mecatronica" },
    { label: "Licenciatura en Ingenieria Automotriz", value: "Licenciatura en Ingenieria Automotriz" },
    { label: "Posgrado en Maestria en Administracion", value: "Posgrado en Maestria en Administracion" },
];

const SignUp: React.FC<SignUpProps> = ({ setIsSignedUp }) => {
    const [selectedRole, setSelectedRole] = useState<string>("");

    const handleFormSubmit = (values: FormValues) => {
        try {
            // Prepare the SQL statement
            // const statement = `INSERT INTO Users (name, email, password, role, generation, group, grade, major, field) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            // db.transaction(tx => {
            //     tx.executeSql(
            //         statement,
            //         [values.name, values.email, values.password, values.role, values.generation || null, values.group || null, values.grade || null, values.major || null, values.field || null],
            //         () => {
            //             console.log("User added successfully");
            //             setIsSignedUp(true);
            //         },
            //         (_, error) => {
            //             console.error("Error inserting user:", error);
            //             return false;
            //         }
            //     );
            // });
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    return (
        <Formik
        initialValues={{
            email: "",
            password: "",
            role: "",
            name: "",
            generation: "",
            group: "",
            grade: "",
            major: "",
            field: ""
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => handleFormSubmit(values)}
    >
        {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
        }) => (
            <View style={styles.container}>
                <Text>Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                />
                {errors.name && touched.name ? (
                    <Text style={styles.errorText}>{errors.name}</Text>
                ) : null}
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                />
                {errors.email && touched.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry
                />
                {errors.password && touched.password ? (
                    <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
                <Text>Role</Text>
                <RNPickerSelect
                    onValueChange={(value) => {
                        setFieldValue("role", value);
                        setSelectedRole(value);
                    }}
                    items={initialRoles}
                    style={pickerSelectStyles}
                    value={values.role}
                />
                {errors.role && touched.role ? (
                    <Text style={styles.errorText}>{errors.role}</Text>
                ) : null}

                {values.role === "student" && (
                    <>
                        <Text>Generation</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setFieldValue("generation", value)}
                            items={generation}
                            style={pickerSelectStyles}
                            value={values.generation}
                        />
                        {errors.generation && touched.generation ? (
                            <Text style={styles.errorText}>{errors.generation}</Text>
                        ) : null}

                        <Text>Group</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setFieldValue("group", value)}
                            items={group}
                            style={pickerSelectStyles}
                            value={values.group}
                        />
                        {errors.group && touched.group ? (
                            <Text style={styles.errorText}>{errors.group}</Text>
                        ) : null}

                        <Text>Grade</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setFieldValue("grade", value)}
                            items={grade}
                            style={pickerSelectStyles}
                            value={values.grade}
                        />
                        {errors.grade && touched.grade ? (
                            <Text style={styles.errorText}>{errors.grade}</Text>
                        ) : null}

                        <Text>Major</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setFieldValue("major", value)}
                            items={major}
                            style={pickerSelectStyles}
                            value={values.major}
                        />
                        {errors.major && touched.major ? (
                            <Text style={styles.errorText}>{errors.major}</Text>
                        ) : null}
                    </>
                )}

                {values.role === "teacher" && (
                    <>
                        <Text>Field</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange("field")}
                            onBlur={handleBlur("field")}
                            value={values.field}
                        />
                        {errors.field && touched.field ? (
                            <Text style={styles.errorText}>{errors.field}</Text>
                        ) : null}
                    </>
                )}

                <Button onPress={() => handleSubmit()} title="Sign Up" />
            </View>
        )}
    </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    errorText: {
        color: "red",
        marginBottom: 12,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    inputAndroid: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default SignUp;
import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as SQLite from 'expo-sqlite';
import { config } from "@/config/config";

const db = SQLite.openDatabaseSync(config.DATABASE_NAME);

interface FormValues {
    email: string;
    password: string;
}

const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Password too short!").required("Required"),
});


const checkUserCredentials = async (values: FormValues) => {
    try {
        await db.withTransactionAsync(async () => {
            const result = await db.getFirstAsync('SELECT * FROM users WHERE email = ? AND password = ?', values.email, values.password) as { rows: FormValues[] };

            if (result && result.rows && result.rows.length > 0) {
                console.log('Count:', result.rows.length);
            } else {
                console.log('No matching user found.');
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
    }
}


export default function SignIn() {

    const handleFormSubmit = (values: FormValues) => {
        checkUserCredentials(values)
    };

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validationSchema={SignInSchema}
            onSubmit={(values) => handleFormSubmit(values)}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
            }) => (
                <View style={styles.container}>
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

                    <Button onPress={() => handleSubmit()} title="Sign In" />
                </View>
            )}
        </Formik>
    );
}

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

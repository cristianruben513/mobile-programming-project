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
        const result = await db.getFirstAsync('SELECT * FROM users WHERE email = ? AND password = ?', values.email, values.password) as { rows: FormValues[] };
        return result;
    } catch (error) {
        console.error("Unexpected error:", error);
        return false;
    }
};

interface SignUpProps {
    setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
    setFirstTimeRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignIn({ setIsSignedUp, setFirstTimeRegister }: SignUpProps) {

    const handleFormSubmit = async (values: FormValues) => {
        const isValid = await checkUserCredentials(values);
        if (isValid) {
            setIsSignedUp(true);
        } else {
            console.log('Invalid credentials');
        }
    };

    const changePage = () => {
        setFirstTimeRegister(true);
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
                    <Button onPress={() => changePage()} title="Don't have an account? Sign Up"/>
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
import React from "react";
import { Text, TextInput, TouchableOpacity, SafeAreaView, useColorScheme } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as SQLite from 'expo-sqlite';
import { config } from "@/config/config";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

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

    const colorScheme = useColorScheme();

    const textColor = colorScheme === 'dark' ? 'text-white' : 'text-black';

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
                <SafeAreaView className="flex-1 h-full">
                    <ThemedView className="flex-1 justify-center h-full p-6">
                        <ThemedText type="title" style={{ fontSize: 30, marginBottom: 10 }}>Sign In</ThemedText>
                        <ThemedText>Email</ThemedText>
                        <TextInput
                            className="text-white border border-neutral-400 rounded-lg p-6 py-4 mb-6"
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            style={
                                { color: colorScheme === 'dark' ? 'white' : 'black' }
                            }
                        />
                        {errors.email && touched.email ? (
                            <Text className="text-red-500 mb-6">{errors.email}</Text>
                        ) : null}

                        <ThemedText>Password</ThemedText>
                        <TextInput
                            className="text-white border border-neutral-400 rounded-lg p-6 py-4  mb-6"
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                            secureTextEntry
                        />
                        {errors.password && touched.password ? (
                            <Text className="text-red-500 mb-6">{errors.password}</Text>
                        ) : null}

                        <TouchableOpacity
                            className="bg-green-600 mb-8 rounded-xl py-4 px-6 w-full items-center justify-center"
                            onPress={() => handleSubmit}
                        >
                            <Text className="text-white font-bold">Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-blue-700 rounded-xl py-4 px-6 w-full items-center justify-center"
                            onPress={changePage}
                        >
                            <Text className="text-white font-bold">Don't have an account? Sign Up</Text>
                        </TouchableOpacity>
                    </ThemedView>
                </SafeAreaView>

            )}
        </Formik>
    );
}
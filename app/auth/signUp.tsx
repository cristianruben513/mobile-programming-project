import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import RNPickerSelect from "react-native-picker-select";

const SignUpSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Password too short!").required("Required"),
    role: Yup.string().required("Role is required"),
});

interface SignUpProps {
    setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const roles = [
    { label: "Student", value: "student" },
    { label: "Teacher", value: "teacher" },
];

const SignUp: React.FC<SignUpProps> = ({ setIsSignedUp }) => {
    return (
        <Formik
            initialValues={{ email: "", password: "", role: "", name: "" }}
            validationSchema={SignUpSchema}
            onSubmit={(values) => {
                console.log(values);
                // Set the sign-up status to true
                setIsSignedUp(true);
            }}
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
                        onValueChange={(value) => setFieldValue("role", value)}
                        items={roles}
                        style={pickerSelectStyles}
                        value={values.role}
                    />
                    {errors.role && touched.role ? (
                        <Text style={styles.errorText}>{errors.role}</Text>
                    ) : null}
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

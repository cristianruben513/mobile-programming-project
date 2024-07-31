import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { config } from "@/config/config";
import * as SQLite from "expo-sqlite";
import { Formik } from "formik";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import Input from "../Input";

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
    const result = (await db.getFirstAsync(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      values.email,
      values.password,
    )) as { rows: FormValues[] };
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

export default function SignIn({
  setIsSignedUp,
  setFirstTimeRegister,
}: SignUpProps) {
  const handleFormSubmit = async (values: FormValues) => {
    const isValid = await checkUserCredentials(values);
    if (isValid) {
      setIsSignedUp(true);
    } else {
      console.log("Invalid credentials");
    }
  };

  const changePage = () => {
    setFirstTimeRegister(true);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
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
        <SafeAreaView className="flex-1">
          <ThemedView className="flex-1 p-6">
            <ThemedText type="title" style={{ fontSize: 30, marginBottom: 10 }}>
              Sign In
            </ThemedText>

            <Input
              placeholder="email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              errors={errors.email as string}
              touched={touched.email as boolean}
            />

            <Input
              placeholder="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              errors={errors.password as string}
              touched={touched.password as boolean}
              secureTextEntry
            />

            <TouchableOpacity
              className="bg-green-600 mb-8 rounded-xl py-4 px-6 w-full items-center justify-center"
              onPress={() => handleSubmit()}
            >
              <Text className="text-white font-bold">Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="rounded-xl w-full items-center justify-center"
              onPress={changePage}
            >
              <Text className="text-blue-600 font-bold">
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </ThemedView>
        </SafeAreaView>
      )}
    </Formik>
  );
}

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { config } from "@/config/config";
import { useIsAuth } from "@/stores/useIsAuth";
import { useUserStore } from "@/stores/useUserStore";
import * as SQLite from "expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { Formik } from "formik";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

import Input from "../Input";

const db = SQLite.openDatabaseSync(config.DATABASE_NAME);

interface FormValues {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(2, "Password too short!").required("Required"),
});

export default function SignIn() {
  const { setAuth } = useIsAuth();
  const { setUser } = useUserStore();

  const database = useSQLiteContext();

  const query = `
  SELECT 
      u.id_user AS userId,
      u.name AS userName,
      u.password AS userPassword,
      u.email AS userEmail,
      u.creation_date AS userCreationDate,
      COALESCE(t.id_teacher, s.id_student) AS roleId,
      CASE 
          WHEN t.id_teacher IS NOT NULL THEN 'Maestro'
          WHEN s.id_student IS NOT NULL THEN 'Estudiante'
          ELSE 'unknown'
      END AS userRole
  FROM 
      Users u
      LEFT JOIN Teachers t ON u.id_user = t.id_user
      LEFT JOIN Students s ON u.id_user = s.id_user
  WHERE 
      u.id_user = ?;
`;

  const checkUserCredentials = async (values: FormValues) => {
    try {
      const result = await db.getFirstAsync(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        values.email,
        values.password,
      );

      return result;
    } catch (error) {
      console.error("Unexpected error:", error);
      return false;
    }
  };

  const handleFormSubmit = async (values: FormValues) => {
    const isValid: any = await checkUserCredentials(values);
    const dataUser = await database.getAllAsync(query, [
      isValid && isValid.id_user,
    ]);
    setUser(dataUser[0]);

    if (isValid) {
      setAuth(true);
    } else {
      console.log("Invalid credentials");
    }
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
              Iniciar Sesion
            </ThemedText>

            <View className="gap-3 mt-10">
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
              />

              <TouchableOpacity
                className="bg-green-600 rounded-xl py-4 px-6 w-full items-center justify-center"
                onPress={() => handleSubmit()}
              >
                <Text className="text-white font-bold">Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="rounded-xl w-full items-center justify-center"
                onPress={() => console.log("registro")}
              >
                <Text className="text-blue-600 font-bold">
                  Don't have an account? Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </SafeAreaView>
      )}
    </Formik>
  );
}

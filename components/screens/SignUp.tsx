import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { config } from "@/config/config";
import { displayData } from "@/utils/display-data";
import * as SQLite from "expo-sqlite";
import { Formik } from "formik";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Yup from "yup";
import Input from "../Input";
import Picker from "../Picker";

const db = SQLite.openDatabaseSync(config.DATABASE_NAME);

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
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password too short!").required("Required"),
  role: Yup.string().required("Role is required"),
});

interface SignUpProps {
  setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
  setFirstTimeRegister: React.Dispatch<React.SetStateAction<boolean>>;
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
  {
    label: "Licenciatura en Administracion y Gestion Empresarial",
    value: "Licenciatura en Administracion y Gestion Empresarial",
  },
  {
    label: "Licenciatura en Ingenieria en Logistica y Transporte",
    value: "Licenciatura en Ingenieria en Logistica y Transporte",
  },
  {
    label: "Licenciatura en Ingenieria en Software",
    value: "Licenciatura en Ingenieria en Software",
  },
  {
    label: "Licenciatura en Ingenieria Agroindustrial",
    value: "Licenciatura en Ingenieria Agroindustrial",
  },
  {
    label: "Licenciatura en Ingenieria en Biotecnologia",
    value: "Licenciatura en Ingenieria en Biotecnologia",
  },
  {
    label: "Licenciatura en Ingenieria Industrial",
    value: "Licenciatura en Ingenieria Industrial",
  },
  {
    label: "Licenciatura en Ingenieria Mecatronica",
    value: "Licenciatura en Ingenieria Mecatronica",
  },
  {
    label: "Licenciatura en Ingenieria Automotriz",
    value: "Licenciatura en Ingenieria Automotriz",
  },
  {
    label: "Posgrado en Maestria en Administracion",
    value: "Posgrado en Maestria en Administracion",
  },
];

const insertDb = async (values: FormValues) => {
  try {
    const statementUser = await db.prepareAsync(
      `INSERT INTO Users (name, email, password, creation_date) VALUES (?, ?, ?, ?)`,
    );
    const statementStudent = await db.prepareAsync(
      `INSERT INTO Students (id_user, generation, group_index, grade, major, note) VALUES (?, ?, ?, ?, ?, ?)`,
    );
    const statementTeacher = await db.prepareAsync(
      `INSERT INTO Teachers (id_user, field) VALUES (?, ?)`,
    );

    try {
      const result = await statementUser.executeAsync([
        values.name,
        values.email,
        values.password,
        new Date().toISOString(),
      ]);

      const userId = result.lastInsertRowId;

      if (values.role === "student") {
        await statementStudent.executeAsync([
          userId,
          values.generation || "",
          values.group || "",
          values.grade || "",
          values.major || "",
          "N/A",
        ]);
      } else if (values.role === "teacher") {
        await statementTeacher.executeAsync([userId, values.field || ""]);
      }
    } finally {
      await statementUser.finalizeAsync();
      await statementStudent.finalizeAsync();
      await statementTeacher.finalizeAsync();
      displayData();
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

export default function SignUp({
  setIsSignedUp,
  setFirstTimeRegister,
}: SignUpProps) {
  const handleFormSubmit = (values: FormValues) => {
    insertDb(values)
      .then(() => {
        setIsSignedUp(true);
      })
      .catch((error) => {
        console.error("Failed to insert data into the database:", error);
      });
  };

  const changePage = () => {
    setFirstTimeRegister(false);
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
        field: "",
      }}
      validationSchema={SignUpSchema}
      onSubmit={handleFormSubmit}
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
        <SafeAreaView className="flex-1 h-full">
          <ThemedView className="flex-1 h-full p-6">
            <ThemedText type="title" style={{ fontSize: 30, marginBottom: 10 }}>
              Registrate
            </ThemedText>

            <View className="gap-6 mt-8">
              <Input
                placeholder="Name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                errors={errors.name as string}
                touched={touched.name as boolean}
              />

              <Input
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                errors={errors.email as string}
                touched={touched.email as boolean}
              />

              <Input
                placeholder="Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                errors={errors.password as string}
                touched={touched.password as boolean}
                secureTextEntry
              />

              <Picker
                placeholder="Role"
                onValueChange={(value) => setFieldValue("role", value)}
                items={initialRoles}
                errors={errors.role as string}
                touched={touched.role as boolean}
                value={values.role}
              />
            </View>

            {values.role === "student" && (
              <>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Picker
                      placeholder="Generation"
                      onValueChange={(value) =>
                        setFieldValue("generation", value)
                      }
                      items={generation}
                      errors={errors.generation as string}
                      touched={touched.generation as boolean}
                      value={values.generation}
                    />
                  </View>
                  <View style={styles.column}>
                    <Picker
                      placeholder="Group"
                      onValueChange={(value) => setFieldValue("group", value)}
                      items={group}
                      errors={errors.group as string}
                      touched={touched.group as boolean}
                      value={values.group}
                    />
                  </View>
                </View>

                <Picker
                  placeholder="Grade"
                  onValueChange={(value) => setFieldValue("grade", value)}
                  items={grade}
                  errors={errors.grade as string}
                  touched={touched.grade as boolean}
                  value={values.grade}
                />

                <Picker
                  placeholder="Major"
                  onValueChange={(value) => setFieldValue("major", value)}
                  items={major}
                  errors={errors.major as string}
                  touched={touched.major as boolean}
                  value={values.major}
                />
              </>
            )}

            {values.role === "teacher" && (
              <View className="mt-6">
                <Input
                  placeholder="Field"
                  onChangeText={handleChange("field")}
                  onBlur={handleBlur("field")}
                  value={values.field}
                  errors={errors.field as string}
                  touched={touched.field as boolean}
                />
              </View>
            )}

            <View className="gap-6 mt-8">
              <TouchableOpacity
                className="bg-green-600 my-8 rounded-xl py-4 px-6 w-full items-center justify-center"
                onPress={() => handleSubmit()}
              >
                <Text className="text-white font-bold">Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="rounded-xl px-6 w-full items-center justify-center"
                onPress={changePage}
              >
                <Text className="text-blue-800 font-bold">
                  Already have an account? Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </SafeAreaView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  column: {
    flex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
});

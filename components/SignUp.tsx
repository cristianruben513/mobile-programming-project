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
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as Yup from "yup";

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
  const colorScheme = useColorScheme();

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 4,
      color: colorScheme === "dark" ? "white" : "black",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: "gray",
      borderRadius: 8,
      color: colorScheme === "dark" ? "white" : "black",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

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
          <ThemedView className="flex-1 justify-center h-full p-4">
            <ThemedText type="title" style={{ fontSize: 30, marginBottom: 10 }}>
              Sign Up
            </ThemedText>
            <ThemedText type="subtitle">Name</ThemedText>
            <TextInput
              className="text-white border border-neutral-400 rounded-lg p-6 py-4  mb-6"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {errors.name && touched.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
            <ThemedText type="subtitle">Email</ThemedText>
            <TextInput
              className="text-white border border-neutral-400 rounded-lg p-6 py-4  mb-6"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <ThemedText type="subtitle">Password</ThemedText>
            <TextInput
              className="text-white border border-neutral-400 rounded-lg p-6 py-4  mb-6"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <ThemedText type="subtitle">Role</ThemedText>
            <RNPickerSelect
              onValueChange={(value) => {
                setFieldValue("role", value);
              }}
              items={initialRoles}
              style={pickerSelectStyles}
              value={values.role}
            />
            {errors.role && touched.role ? (
              <ThemedText className="text-red-500 mb-6">
                {errors.role}
              </ThemedText>
            ) : null}

            {values.role === "student" && (
              <>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <ThemedText type="subtitle">Generation</ThemedText>
                    <RNPickerSelect
                      onValueChange={(value) =>
                        setFieldValue("generation", value)
                      }
                      items={generation}
                      style={pickerSelectStyles}
                      value={values.generation}
                    />
                    {errors.generation && touched.generation ? (
                      <Text style={styles.errorText}>{errors.generation}</Text>
                    ) : null}
                  </View>
                  <View style={styles.column}>
                    <ThemedText type="subtitle">Group</ThemedText>
                    <RNPickerSelect
                      onValueChange={(value) => setFieldValue("group", value)}
                      items={group}
                      style={pickerSelectStyles}
                      value={values.group}
                    />
                    {errors.group && touched.group ? (
                      <Text className="text-red-500 mb-6">{errors.group}</Text>
                    ) : null}
                  </View>
                </View>
                <ThemedText type="subtitle">Grade</ThemedText>
                <RNPickerSelect
                  onValueChange={(value) => setFieldValue("grade", value)}
                  items={grade}
                  style={pickerSelectStyles}
                  value={values.grade}
                />
                {errors.grade && touched.grade ? (
                  <Text className="text-red-500 mb-6">{errors.grade}</Text>
                ) : null}
                <ThemedText type="subtitle">Major</ThemedText>
                <RNPickerSelect
                  onValueChange={(value) => setFieldValue("major", value)}
                  items={major}
                  style={pickerSelectStyles}
                  value={values.major}
                />
                {errors.major && touched.major ? (
                  <Text className="text-red-500 mb-6">{errors.major}</Text>
                ) : null}
              </>
            )}

            {values.role === "teacher" && (
              <>
                <ThemedText type="subtitle">Field</ThemedText>
                <TextInput
                  className="text-white border border-neutral-400 rounded-lg p-6 py-4  mb-6"
                  onChangeText={handleChange("field")}
                  onBlur={handleBlur("field")}
                  value={values.field}
                />
                {errors.field && touched.field ? (
                  <Text className="text-red-500 mb-6">{errors.field}</Text>
                ) : null}
              </>
            )}

            <TouchableOpacity
              className="bg-green-600 mb-8 rounded-xl py-4 px-6 w-full items-center justify-center"
              onPress={() => handleSubmit()}
            >
              <Text className="text-white font-bold">Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-blue-700 rounded-xl py-4 px-6 w-full items-center justify-center"
              onPress={changePage}
            >
              <Text className="text-white font-bold">
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
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
  },
  column: {
    flex: 1,
    marginHorizontal: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
});

import Input from "@/components/Input";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { config } from "@/config/config";
import { Class } from "@/types/index";
import { displayData } from "@/utils/display-data";
import * as ImagePicker from "expo-image-picker";
import * as SQLite from "expo-sqlite";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

const db = SQLite.openDatabaseSync(config.DATABASE_NAME);

const classSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  cover: Yup.string().required("Required"),
});

const insertDb = async (values: Class) => {
  try {
    const statementUser = await db.prepareAsync(
      `INSERT INTO Classes (name, code, cover, id_teacher) VALUES (?, ?, ?, ?)`,
    );

    try {
      const result = await statementUser.executeAsync([
        values.name,
        values.code,
        values.cover,
        values.id_teacher,
      ]);
    } finally {
      await statementUser.finalizeAsync();
      displayData();
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

const generatedCode = Math.random().toString(36).substring(2, 7).toUpperCase();

export default function InsertClass() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    };

    requestPermissions();
  }, []);

  const handleFormSubmit = (values: Class) => {
    values.code = generatedCode;
    values.id_teacher = 1; // TODO: Change according to navigation
    insertDb(values);
  };

  const handleImagePicker = async (
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets?.[0]?.uri;
      if (imageUri) {
        setFieldValue("cover", imageUri);
        setSelectedImage(imageUri);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        cover: "",
        code: "",
        id_teacher: 0,
        id_class: 0,
      }}
      validationSchema={classSchema}
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
        <SafeAreaView style={{ flex: 1, height: "100%" }}>
          <ThemedView style={{ flex: 1, height: "100%", padding: 24 }}>
            <ThemedText type="title" style={{ fontSize: 30, marginBottom: 10 }}>
              Create class
            </ThemedText>

            <View style={{ marginTop: 32, gap: 24 }}>
              <Input
                placeholder="Class Name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                errors={errors.name}
                touched={touched.name}
              />

              <Button
                title="Choose Image"
                onPress={() => handleImagePicker(setFieldValue)}
              />

              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={{ width: 100, height: 100, marginTop: 16 }}
                />
              )}

              <ThemedText>Class code: {generatedCode}</ThemedText>
            </View>

            <View style={{ marginTop: 32, gap: 24 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  marginVertical: 32,
                  borderRadius: 24,
                  paddingVertical: 16,
                  paddingHorizontal: 24,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => handleSubmit()}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Create
                </Text>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </SafeAreaView>
      )}
    </Formik>
  );
}

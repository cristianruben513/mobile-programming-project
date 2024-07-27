import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useUserStore } from "@/stores/useUserStore";
import { Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";

export default function TabTwoScreen() {
  const [codigo, setCodigo] = useState("");
  const [errorInsert, setErrorInsert] = useState(false);
  const [successInsert, setSuccessInsert] = useState(false);

  const { user } = useUserStore();

  const database = useSQLiteContext();

  const query = `INSERT INTO StudentsClasses (id_student, id_class) VALUES (?, ?)`;

  const handleJoinClass = async () => {
    await database
      .runAsync(query, [user.roleId, codigo])
      .then(() => setSuccessInsert(true))
      .catch((error) => {
        console.error("Error inserting data:", error);
        setErrorInsert(true);
      });
  };

  return (
    <SafeAreaView className="flex-1 p-6">
      <ThemedView className="p-6 gap-6 flex-1">
        <ThemedText type="title">Codigo de clase</ThemedText>

        <TextInput
          className="border border-neutral-400 rounded-lg p-6 py-4"
          placeholder="Introduce el codigo de la clase"
          keyboardType="numeric"
          onChange={(e) => {
            setCodigo(e.nativeEvent.text);
          }}
          maxLength={2}
        />

        <TouchableOpacity
          disabled={codigo.length < 1}
          className="bg-green-600 rounded-xl py-4 px-6 w-full items-center justify-center disabled:bg-gray-500 disabled:opacity-75"
          onPress={handleJoinClass}
        >
          <Text className="text-white font-bold">Unirme a clase</Text>
        </TouchableOpacity>

        {errorInsert && (
          <View className="border-4 border-dotted border-red-600 justify-center items-center bg-red-100 rounded-xl h-[200px] gap-4">
            <Ionicons name="alert-circle" size={48} color="red" />
            <Text className="text-lg font-bold text-red-600 text-center">
              Error al unirte a la clase
            </Text>
          </View>
        )}

        {successInsert && (
          <View className="border-4 border-dotted border-green-600 justify-center items-center bg-green-100 rounded-xl h-[200px] gap-4">
            <Ionicons name="checkmark-circle" size={48} color="green" />
            <Text className="text-lg font-bold text-green-600 text-center">
              Te has unido a la clase
            </Text>
          </View>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

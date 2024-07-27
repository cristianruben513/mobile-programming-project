import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import Loader from "@/components/Loader";

import { useDatabaseQuery } from "@/hooks/useDatabaseQuery";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";

export default function TabTwoScreen() {
  const [codigo, setCodigo] = useState("");
  const [errorInsert, setErrorInsert] = useState(false);
  const [successInsert, setSuccessInsert] = useState(false);

  const database = useSQLiteContext();

  const queryUser = `SELECT 
    u.id_user,
    s.id_student,
    u.name,
    u.email,
    CASE 
        WHEN s.id_student IS NOT NULL THEN 'Alumno'
        WHEN t.id_teacher IS NOT NULL THEN 'Maestro'
        ELSE 'Desconocido'
    END AS rol,
      t.field AS clase_impartida
    FROM Users u
    LEFT JOIN Students s ON u.id_user = s.id_user
    LEFT JOIN Teachers t ON u.id_user = t.id_user
    where u.id_user = 8;`;

  const query = `INSERT INTO StudentsClasses (id_user, id_class) VALUES (?, ?)`;

  const { data: dataUser, error } = useDatabaseQuery(queryUser, []);

  if (error || !dataUser) return <Loader />;

  const handleJoinClass = async () => {
    const { id_user } = dataUser[0];

    await database
      .runAsync(query, [id_user, codigo])
      .then(() => setSuccessInsert(true))
      .catch(() => setErrorInsert(true));
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
          maxLength={5}
        />

        <TouchableOpacity
          disabled={codigo.length !== 5}
          className="bg-green-600 rounded-xl py-4 px-6 w-full items-center justify-center disabled:bg-gray-500 disabled:opacity-75"
          onPress={handleJoinClass}
        >
          <Text className="text-white font-bold">Unirme a clase</Text>
        </TouchableOpacity>

        {errorInsert && (
          <ThemedText className="text-lg font-bold text-red-600">
            Error al unirte a la clase
          </ThemedText>
        )}

        {successInsert && (
          <ThemedText className="text-lg font-bold text-green-600">
            Te has unido a la clase
          </ThemedText>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

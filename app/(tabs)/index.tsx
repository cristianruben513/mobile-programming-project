import { SafeAreaView, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";

export default function HomeScreen() {
  const materias = [
    {
      name: "Programacion Movil",
      id: 1,
    },
    {
      name: "Bases de datos",
      id: 2,
    },
  ];

  return (
    <SafeAreaView className="flex-1">
      <ThemedView className="flex-1 gap-6 p-6">
        <ThemedText type="title" className="mb-4">
          Mis asignaturas
        </ThemedText>

        {materias.map((materia) => (
          <TouchableOpacity
            key={materia.id}
            className="border rounded-md border-sky-400 bg-sky-100 p-4"
            onPress={() => {
              router.push({
                pathname: "/materias/details",
                params: { materia: materia.name },
              });
            }}
          >
            <ThemedText type="defaultSemiBold">{materia.name}</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </SafeAreaView>
  );
}

import { SafeAreaView, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";

import { subjects } from "@/assets/data/dummyData";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ThemedView className="flex-1 gap-6 p-6">
        {subjects.map((materia) => (
          <Link href={`/materias/${materia.id}`} key={materia.id} asChild>
            <TouchableOpacity
              key={materia.id}
              className="border rounded-md border-sky-400 bg-sky-100 p-4"
            >
              <ThemedText type="defaultSemiBold">{materia.name}</ThemedText>
            </TouchableOpacity>
          </Link>
        ))}
      </ThemedView>
    </SafeAreaView>
  );
}

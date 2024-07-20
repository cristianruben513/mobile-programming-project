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
              className="border rounded-lg border-sky-300/80 bg-sky-50 p-4"
            >
              <ThemedText type="title">{materia.name}</ThemedText>
              <ThemedText className=" font-light mt-1">
                {materia.teacher}
              </ThemedText>
            </TouchableOpacity>
          </Link>
        ))}
      </ThemedView>
    </SafeAreaView>
  );
}

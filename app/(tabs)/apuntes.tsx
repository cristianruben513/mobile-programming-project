import { SafeAreaView } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ThemedView className="gap-2 flex-1 p-6">
        <ThemedText type="title">Apuntes</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

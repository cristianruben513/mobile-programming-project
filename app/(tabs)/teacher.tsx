import { ThemedView } from "@/components/ThemedView";
import { useUserStore } from "@/stores/useUserStore";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const Button = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link href={href} asChild>
      <TouchableOpacity className=" border-2 border-dotted border-purple-500 bg-purple-100 px-6 py-5 rounded-lg justify-between items-center flex-row">
        <Text className="text-lg font-bold">{text}</Text>
        <Ionicons size={24} name="arrow-forward" />
      </TouchableOpacity>
    </Link>
  );
};

export default function Teacher() {
  const { user } = useUserStore();

  return (
    <SafeAreaView className="flex-1">
      <ThemedView className="flex-1 gap-6 p-6">
        {user.userRole === "Estudiante" && (
          <View className="flex-1 justify-center items-center">
            <Text>No tienes permisos necesarios</Text>
          </View>
        )}

        {user.userRole === "Maestro" && (
          <>
            <Button href="/teacher/assists" text="Asistencias" />
            <Button href="/teacher/grades" text="Calificaciones" />
            <Button href="/teacher/insert-class" text="Nueva clase" />
            <Button href="/teacher/selection" text="Selection" />
          </>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

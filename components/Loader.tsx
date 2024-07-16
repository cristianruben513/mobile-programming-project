import { ActivityIndicator, View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function Loader() {
  return (
    <View className="flex-1 justify-center items-center gap-4">
      <ActivityIndicator size="large" />
      <ThemedText>Cargando ...</ThemedText>
    </View>
  );
}

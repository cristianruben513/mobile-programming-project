import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView>
      <TouchableOpacity
        className="flex-row gap-2"
        onPress={() => setIsOpen((value) => !value)}
      >
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
        />
      </TouchableOpacity>
      {isOpen && <ThemedView className="mt-2 ml-6">{children}</ThemedView>}
    </ThemedView>
  );
}

// Icon families and icons on the web at https://icons.expo.fyi/

import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type ComponentProps } from "react";
import { Text, useColorScheme, View } from "react-native";

interface Props {
  title: string;
  color: string;
  focused: boolean;
  iconName: ComponentProps<typeof Ionicons>["name"];
}

export function TabBarItem({ color, title, focused, iconName }: Props) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Ionicons name={iconName} color={color} size={28} />
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 2,
          borderRadius: 30,
          backgroundColor: focused
            ? Colors[colorScheme ?? "light"].tint
            : "transparent",
        }}
      >
        <Text
          style={{
            color: focused ? "#fff" : "#717171",
            fontWeight: focused ? "bold" : "normal",
            fontSize: 10,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}

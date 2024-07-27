import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import DatabaseProvider from "@/providers/database-provider";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <DatabaseProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="materias" />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="user"
            options={{
              headerShown: true,
              presentation: "modal",
              title: "Detalles del usuario",
            }}
          />
        </Stack>
      </ThemeProvider>
    </DatabaseProvider>
  );
}

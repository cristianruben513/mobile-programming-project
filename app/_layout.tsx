import DatabaseProvider from "@/providers/database-provider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

import { useIsAuth } from "@/stores/useIsAuth";
import "react-native-reanimated";
import "../global.css";
import AuthNavigator from "./auth/_layout";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const { auth } = useIsAuth();

  if (!auth) {
    return (
      <DatabaseProvider>
        <AuthNavigator />
      </DatabaseProvider>
    );
  }

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
          <Stack.Screen name="camera" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </DatabaseProvider>
  );
}

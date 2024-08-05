import DatabaseProvider from "@/providers/database-provider";
import { Stack } from "expo-router";
import React from "react";

import { useIsAuth } from "@/stores/useIsAuth";
import "react-native-reanimated";
import "../global.css";
import AuthNavigator from "./auth/_layout";

export default function RootLayout() {
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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="materias" />
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
    </DatabaseProvider>
  );
}

import React, { useEffect, useState } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import DatabaseProvider from "@/providers/database-provider";
import "react-native-reanimated";
import "../global.css";
import SignUp from './signUp';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (!isSignedUp) {
    return <SignUp setIsSignedUp={setIsSignedUp} />;
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
        </Stack>
      </ThemeProvider>
    </DatabaseProvider>
  );
}

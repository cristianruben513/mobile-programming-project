import { Stack } from "expo-router";
import React from "react";

const TeacherRootLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="selection" initialParams={{ class_id: 1 }} />
      <Stack.Screen name="grades" initialParams={{ class_id: 1 }} />
      <Stack.Screen name="assists" initialParams={{ class_id: 1 }} />
    </Stack>
  );
};

export default TeacherRootLayout;

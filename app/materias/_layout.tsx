import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ title: "Ejemplo" }} name="details" />
    </Stack>
  );
}

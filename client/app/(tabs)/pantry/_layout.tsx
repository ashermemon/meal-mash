import { NEWCOLORS } from "@/constants/NewTheme";
import { Stack } from "expo-router";

export default function PantryLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: NEWCOLORS.backgroundColor },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="setup" />
      <Stack.Screen name="dashboard" />
    </Stack>
  );
}

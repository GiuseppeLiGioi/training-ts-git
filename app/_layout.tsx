import { FavoritesProvider } from "@/context/favoritesContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <FavoritesProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "HomePage" }} />
          <Stack.Screen name="favorites" options={{ title: "Preferiti" }} />
        </Stack>
      </FavoritesProvider>
    </>
  );
}

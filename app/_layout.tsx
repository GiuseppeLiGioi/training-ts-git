import { FavoritesProvider } from "@/context/FavoritesContext";
import { PersonalQuoteProvider } from "@/context/PersonalQuoteContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <FavoritesProvider>
        <PersonalQuoteProvider>
          <Stack>
            <Stack.Screen name="index" options={{ title: "HomePage" }} />
            <Stack.Screen name="favorites" options={{ title: "Preferiti" }} />
            <Stack.Screen name="personals" options={{ title: "Personali" }} />
          </Stack>
          <Toast />
        </PersonalQuoteProvider>
      </FavoritesProvider>
    </>
  );
}

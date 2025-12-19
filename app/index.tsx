import RandomQuote from "@/components/my/RandomQuote";
import { FavoritesContext } from "@/context/FavoritesContext";
import useQuote from "@/hooks/my/useQuote";
import useToastFavorites from "@/hooks/my/useToastFavorites";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { useContext, useMemo } from "react";
import {
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";

export default function HomeScreen() {
  const { quote, loading, error, fetchQuote } = useQuote();
  const { favoriteIds } = useContext(FavoritesContext);
  const { handleToggleFavorite } = useToastFavorites();
  const router = useRouter();
  const isFavorite = useMemo(
    () => (quote ? favoriteIds.includes(quote.id) : false),
    [quote, favoriteIds]
  );

  async function copyToClipboard() {
    await Clipboard.setStringAsync(
      quote ? `${quote.quote} - ${quote.author}` : ""
    );
  }

  function shareTextQuote() {
    if (quote) {
      Share.share({
        message: `Citazione casuale: ${quote.quote} - Autore citazione: ${quote.author}`,
      });
    }
  }

  console.log(favoriteIds);

  return (
    <SafeAreaView style={{ flex: 1, padding: 8 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <RandomQuote
          quote={quote}
          loading={loading}
          error={error}
          onNewQuote={fetchQuote}
          onCopy={copyToClipboard}
          onShare={shareTextQuote}
          toggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
        />
        <TouchableOpacity
          style={styles.buttonFavorites}
          onPress={() => router.push("/favorites")}
        >
          <Text style={styles.textButton}>Citazioni Preferite</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonFavorites: {
    backgroundColor: "#4a4e69",
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    width: moderateScale(200),
    alignItems: "center",
  },
  textButton: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontWeight: "600",
    textAlign: "center",
  },
});

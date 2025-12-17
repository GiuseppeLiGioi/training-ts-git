import RandomQuote from "@/components/my/RandomQuote";
import useFavorites from "@/hooks/my/useFavorites";
import useQuote from "@/hooks/my/useQuote";
import * as Clipboard from "expo-clipboard";
import { useMemo } from "react";
import { Share, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { quote, loading, error, fetchQuote } = useQuote();
  const { toggleFavorite, favoriteIds } = useFavorites();
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
      <RandomQuote
        quote={quote}
        loading={loading}
        error={error}
        onNewQuote={fetchQuote}
        onCopy={copyToClipboard}
        onShare={shareTextQuote}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

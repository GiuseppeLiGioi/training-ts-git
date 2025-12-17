import RandomQuote from "@/components/my/RandomQuote";
import useQuote from "@/hooks/my/useQuote";
import * as Clipboard from "expo-clipboard";
import { Share, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { quote, loading, error, fetchQuote } = useQuote();

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

  return (
    <SafeAreaView style={{ flex: 1, padding: 8 }}>
      <RandomQuote
        quote={quote}
        loading={loading}
        error={error}
        onNewQuote={fetchQuote}
        onCopy={copyToClipboard}
        onShare={shareTextQuote}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

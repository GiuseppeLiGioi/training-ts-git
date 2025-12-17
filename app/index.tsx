import RandomQuote from "@/components/my/RandomQuote";
import useQuote from "@/hooks/my/useQuote";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { quote, loading, error, fetchQuote } = useQuote();
  return (
    <SafeAreaView style={{ flex: 1, padding: 8 }}>
      <RandomQuote
        quote={quote}
        loading={loading}
        error={error}
        onNewQuote={fetchQuote}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

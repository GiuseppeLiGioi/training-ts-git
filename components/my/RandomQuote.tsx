import { Quote } from "@/types/quote";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type RandomQuoteProps = {
  quote: Quote | undefined;
  loading: boolean;
  error: string | null;
  onNewQuote: () => void;
  onShare?: () => void;
  onCopy?: () => void;
};

export default function RandomQuote({
  quote,
  loading,
  error,
  onNewQuote,
  onShare,
  onCopy,
}: RandomQuoteProps) {
  return (
    <View style={styles.containerBoxQuote}>
      <Text style={styles.titleBox}>GENERA UNA CITAZIONE CASUALE!</Text>
      {loading && <Text>Caricamento in corso...</Text>}
      {error && <Text>Errore: {error}</Text>}
      {quote && loading === false && (
        <View style={styles.containerQuote}>
          <Text style={styles.quote}>Citazione casuale: {quote.quote}</Text>
          <Text style={styles.author}>Autore Citazione: {quote.author}</Text>
        </View>
      )}
      <View style={styles.conatinerBottomBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("share")}
        >
          <Ionicons name="share" size={24} color={"#6d6c6cff"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => onNewQuote()}>
          <Text style={styles.textButton}>GENERA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("copy")}
        >
          <Ionicons name="copy" size={24} color={"#6d6c6cff"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerBoxQuote: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  titleBox: {
    fontSize: 22,
    textAlign: "center",
  },
  containerQuote: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  quote: {
    fontSize: 16,
    textAlign: "center",
    color: "black",
  },
  author: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
  },
  conatinerBottomBox: {
    padding: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  button: {
    padding: 12,
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 12,
  },
  textButton: {
    fontSize: 14,
    textAlign: "center",
    color: "black",
  },
});

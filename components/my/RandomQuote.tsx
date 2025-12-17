import { Quote } from "@/types/quote";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

type RandomQuoteProps = {
  quote: Quote | undefined;
  loading: boolean;
  error: string | null;
  onNewQuote: () => void;
  onShare: () => void;
  onCopy: () => void;
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
      {quote && loading === false && !error && (
        <View style={styles.containerQuote}>
          <Text style={styles.quote}>Citazione casuale: {quote.quote}</Text>
          <Text style={styles.author}>Autore Citazione: {quote.author}</Text>
        </View>
      )}
      <View style={styles.conatinerBottomBox}>
        <TouchableOpacity style={styles.button} onPress={() => onShare()}>
          <Ionicons name="share" size={moderateScale(24)} color={COLOR_ICON} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => onNewQuote()}>
          <Text style={styles.textButton}>GENERA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => onCopy()}>
          <Ionicons name="copy" size={moderateScale(24)} color={COLOR_ICON} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Color variables
const COLOR_PRIMARY = "#22223b";
const COLOR_SECONDARY = "#4a4e69";
const COLOR_BACKGROUND = "#fff";
const COLOR_QUOTE_BG = "#ecececff";
const COLOR_BUTTON_BG = "#f7f7f7ff";
const COLOR_ICON = "#6d6c6cff";
const COLOR_BORDER = "#f5f5f5ff";

const styles = StyleSheet.create({
  containerBoxQuote: {
    padding: moderateScale(20),
    margin: moderateScale(16),
    backgroundColor: COLOR_BACKGROUND,
    borderRadius: moderateScale(20),
    shadowColor: "black",
    shadowOffset: { width: 0, height: moderateScale(4) },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(12),
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(16),
    borderWidth: 1,
    borderColor: COLOR_BORDER,
  },
  titleBox: {
    fontSize: moderateScale(22),
    textAlign: "center",
    fontWeight: "700",
    color: COLOR_PRIMARY,
    letterSpacing: 0.5,
    marginBottom: moderateScale(8),
  },
  containerQuote: {
    padding: moderateScale(12),
    backgroundColor: COLOR_QUOTE_BG,
    borderRadius: moderateScale(14),
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(8),
    width: "100%",
    borderWidth: 1,
    borderColor: COLOR_BORDER,
    marginBottom: moderateScale(8),
  },
  quote: {
    fontSize: moderateScale(18),
    textAlign: "center",
    color: COLOR_PRIMARY,
    fontStyle: "italic",
    marginBottom: moderateScale(4),
    lineHeight: moderateScale(26),
  },
  author: {
    fontSize: moderateScale(16),
    textAlign: "center",
    color: COLOR_SECONDARY,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  conatinerBottomBox: {
    padding: moderateScale(6),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: moderateScale(16),
    width: "100%",
    marginTop: moderateScale(8),
  },
  button: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(18),
    borderWidth: moderateScale(1.5),
    borderColor: COLOR_SECONDARY,
    borderRadius: moderateScale(8),
    backgroundColor: COLOR_BUTTON_BG,
    marginHorizontal: moderateScale(2),
    shadowColor: COLOR_SECONDARY,
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(4),
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    minWidth: moderateScale(44),
    minHeight: moderateScale(44),
  },

  textButton: {
    fontSize: moderateScale(15),
    textAlign: "center",
    color: COLOR_PRIMARY,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

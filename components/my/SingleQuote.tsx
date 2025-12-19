import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
const COLOR_SECONDARY = "#4a4e69";
const COLOR_PRIMARY = "#22223b";
const COLOR_CARD = "#fff";
const COLOR_CARD_BORDER = "#ececec";
type SingleQuoteProps = {
  author: string;
  quote: string;
  onRemove: () => void;
};
export default function SingleQuote({
  author,
  quote,
  onRemove,
}: SingleQuoteProps) {
  return (
    <View style={styles.containerSingleFav}>
      <Ionicons
        name="trash-outline"
        size={moderateScale(24)}
        color={COLOR_SECONDARY}
        style={styles.starIcon}
        onPress={onRemove}
      />
      <Text style={styles.quoteFav}>Citazione casuale: {quote}</Text>
      <Text style={styles.authorFav}>Autore Citazione: {author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerSingleFav: {
    backgroundColor: COLOR_CARD,
    borderRadius: moderateScale(16),
    padding: moderateScale(18),
    marginVertical: moderateScale(10),
    marginHorizontal: moderateScale(4),
    shadowColor: COLOR_PRIMARY,
    shadowOffset: { width: 0, height: moderateScale(4) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(8),
    elevation: 4,
    borderWidth: 1,
    borderColor: COLOR_CARD_BORDER,
    position: "relative",
  },
  starIcon: {
    position: "absolute",
    top: moderateScale(8),
    right: moderateScale(6),
  },
  quoteFav: {
    fontSize: moderateScale(18),
    color: COLOR_PRIMARY,
    fontStyle: "italic",
    marginBottom: moderateScale(10),
    textAlign: "center",
    marginTop: moderateScale(22),
    lineHeight: moderateScale(26),
  },
  authorFav: {
    color: COLOR_SECONDARY,
    fontSize: moderateScale(16),
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.2,
    marginTop: moderateScale(2),
  },
});

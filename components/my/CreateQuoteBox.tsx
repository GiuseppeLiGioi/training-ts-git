import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

type CreateBoxQuoteProps = {
  title: string;
  textButton: string;
  onPress: () => void;
};

export default function CreateBoxQuote({
  title,
  textButton,
  onPress,
}: CreateBoxQuoteProps) {
  return (
    <View style={styles.containerBoxQuote}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.textButton}>{textButton}</Text>
      </TouchableOpacity>
    </View>
  );
}

const COLOR_PRIMARY = "#22223b";
const COLOR_SECONDARY = "#43aa8b";
const COLOR_CARD = "#fff";
const COLOR_CARD_BORDER = "#ececec";

const styles = StyleSheet.create({
  containerBoxQuote: {
    backgroundColor: COLOR_CARD,
    borderRadius: moderateScale(18),
    padding: moderateScale(22),
    marginVertical: moderateScale(18),
    marginHorizontal: moderateScale(8),
    shadowColor: COLOR_PRIMARY,
    shadowOffset: { width: 0, height: moderateScale(4) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(8),
    elevation: 4,
    borderWidth: 1,
    borderColor: COLOR_CARD_BORDER,
    alignItems: "center",
  },
  title: {
    color: COLOR_PRIMARY,
    fontSize: moderateScale(20),
    fontWeight: "700",
    marginBottom: moderateScale(18),
    textAlign: "center",
    letterSpacing: 0.3,
  },
  button: {
    backgroundColor: COLOR_SECONDARY,
    borderRadius: moderateScale(14),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(32),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLOR_PRIMARY,
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.12,
    shadowRadius: moderateScale(6),
    elevation: 3,
    borderWidth: 1,
    borderColor: COLOR_CARD_BORDER,
  },
  textButton: {
    color: COLOR_CARD,
    fontSize: moderateScale(16),
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    textAlign: "center",
  },
});

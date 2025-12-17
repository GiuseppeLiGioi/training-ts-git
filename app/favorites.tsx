import { FavoritesContext } from "@/context/favoritesContext";
import { quotes } from "@/mock/quotes";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

export default function Favorites() {
  const { favoriteIds, removeFavoriteQuote } = useContext(FavoritesContext);
  const favoritesQuotes = useMemo(
    () => quotes.filter((q) => favoriteIds.includes(q.id)),
    [favoriteIds]
  );
  return (
    <View style={styles.containerFavoritesQuote}>
      <FlatList
        data={favoritesQuotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.containerSingleFav}>
            <Ionicons
              name="trash-outline"
              size={moderateScale(24)}
              color={COLOR_SECONDARY}
              style={styles.starIcon}
              onPress={() => removeFavoriteQuote(item.id)}
            />
            <Text style={styles.quoteFav}>Citazione casuale: {item.quote}</Text>
            <Text style={styles.authorFav}>
              Autore Citazione: {item.author}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

// Color variables
const COLOR_PRIMARY = "#22223b";
const COLOR_SECONDARY = "#4a4e69";
const COLOR_BACKGROUND = "#f7f7f7";
const COLOR_CARD = "#fff";
const COLOR_CARD_BORDER = "#ececec";

const styles = StyleSheet.create({
  containerFavoritesQuote: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(8),
  },
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

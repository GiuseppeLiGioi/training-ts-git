import { FavoritesContext } from "@/context/favoritesContext";
import { quotes } from "@/mock/quotes";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

export default function Favorites() {
  const {
    favoriteIds,
    removeFavoriteQuote,
    isLoadingFavorites,
    errorFavorites,
    removeAllFavorites,
    fetchFavorites,
  } = useContext(FavoritesContext);
  useEffect(() => {
    const load = async () => {
      try {
        await fetchFavorites();
      } catch (error) {
        console.error("errore nel caricamento dei preferiti", error);
      }
    };
    load();
  }, []);

  const favoritesQuotes = useMemo(
    () => quotes.filter((q) => favoriteIds.includes(q.id)),
    [favoriteIds, quotes]
  );
  return (
    <>
      <View style={styles.containerFavoritesQuote}>
        {isLoadingFavorites && <Text>Caricamento preferiti...</Text>}
        {errorFavorites && (
          <Text>errore nel tentativo di recuperare i preferiti...</Text>
        )}
        {!errorFavorites &&
          !isLoadingFavorites &&
          favoritesQuotes.length > 0 && (
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
                  <Text style={styles.quoteFav}>
                    Citazione casuale: {item.quote}
                  </Text>
                  <Text style={styles.authorFav}>
                    Autore Citazione: {item.author}
                  </Text>
                </View>
              )}
            />
          )}
      </View>

      <TouchableOpacity
        style={styles.removeAllButton}
        onPress={() => removeAllFavorites()}
      >
        <Text style={styles.textAllButton}>Clear All</Text>
      </TouchableOpacity>
    </>
  );
}

// Color variables
const COLOR_PRIMARY = "#22223b";
const COLOR_SECONDARY = "#4a4e69";
const COLOR_BACKGROUND = "#f7f7f7";
const COLOR_CARD = "#fff";
const COLOR_CARD_BORDER = "#ececec";

const styles = StyleSheet.create({
  removeAllButton: {
    backgroundColor: COLOR_SECONDARY,
    borderRadius: moderateScale(24),
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(32),
    alignItems: "center",
    justifyContent: "center",
    marginVertical: moderateScale(18),
    marginHorizontal: moderateScale(24),
    shadowColor: COLOR_PRIMARY,
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.12,
    shadowRadius: moderateScale(6),
    elevation: 3,
    borderWidth: 1,
    borderColor: COLOR_CARD_BORDER,
  },
  textAllButton: {
    color: COLOR_CARD,
    fontSize: moderateScale(18),
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    textAlign: "center",
  },
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

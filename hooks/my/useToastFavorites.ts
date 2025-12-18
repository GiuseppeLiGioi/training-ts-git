import { FavoritesContext } from "@/context/favoritesContext";
import { useContext } from "react";
import Toast from "react-native-toast-message";
export default function useToastFavorites() {
  const {
    removeAllFavorites,
    removeFavoriteQuote,
    toggleFavorite,
    favoriteIds,
  } = useContext(FavoritesContext);

  const handleToggleFavorite = (id: string) => {
    const isNowFavorite: boolean = !favoriteIds.includes(id);
    toggleFavorite(id);
    Toast.show({
      type: "success",
      text1: isNowFavorite ? "Aggiunta ai preferiti" : "Rimossa dai preferiti",
      visibilityTime: 1000,
      position: "bottom",
      text1Style: { fontSize: 17, fontWeight: "700" },
    });
  };

  const handleRemoveQuote = (id: string) => {
    removeFavoriteQuote(id);
    Toast.show({
      type: "success",
      text1: "Citazione rimossa dai preferiti",
      visibilityTime: 1000,
      position: "bottom",
      text1Style: { fontSize: 17, fontWeight: "700" },
    });
  };

  const handleRemoveAllFavorites = () => {
    removeAllFavorites();
    Toast.show({
      type: "success",
      text1: "Citazioni rimosse dai preferiti",
      visibilityTime: 1000,
      position: "bottom",
      text1Style: { fontSize: 17, fontWeight: "700" },
    });
  };

  return { handleRemoveAllFavorites, handleRemoveQuote, handleToggleFavorite };
}

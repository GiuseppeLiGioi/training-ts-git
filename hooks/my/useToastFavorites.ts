import { FavoritesContext } from "@/context/favoritesContext";
import { useContext, useRef } from "react";
import { moderateScale } from "react-native-size-matters";
import Toast from "react-native-toast-message";
export default function useToastFavorites() {
  const {
    removeAllFavorites,
    removeFavoriteQuote,
    toggleFavorite,
    favoriteIds,
    setFavoriteIds,
  } = useContext(FavoritesContext);

  const UNDO_TIMEOUT = 4000;

  //ref for undo logic:
  const snapshotRef = useRef<string[] | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearUndo = () => {
    snapshotRef.current = null;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const showUndoToast = (onUndo: () => void, message: string) => {
    Toast.show({
      type: "success",
      text1: `✅ ${message}`,
      text2: "RIPRISTINA MODIFICHE",
      visibilityTime: UNDO_TIMEOUT,
      onPress: onUndo,
      position: "bottom",
      text1Style: {
        fontSize: moderateScale(17),
        fontWeight: "700",
        textAlign: "center",
        letterSpacing: 0.5,
        color: "black",
      },
      text2Style: {
        fontSize: moderateScale(15),
        fontWeight: "600",
        color: "#5b99fd",
        textAlign: "center",
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(12),
        backgroundColor: "#e1eaff",
        borderRadius: moderateScale(12),
        alignSelf: "center",
        letterSpacing: 0.5,
      },
    });

    // timer automatico per pulire snapshot se non clicca UNDO
    timeoutRef.current = setTimeout(clearUndo, UNDO_TIMEOUT);
  };

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
    snapshotRef.current = [...favoriteIds];
    removeFavoriteQuote(id);
    showUndoToast(() => {
      if (snapshotRef.current) {
        setFavoriteIds(snapshotRef.current);
        clearUndo();
      }
    }, "Citazione rimossa");
  };

  const handleRemoveAllFavorites = () => {
    snapshotRef.current = [...favoriteIds];
    removeAllFavorites();
    showUndoToast(() => {
      if (snapshotRef.current) {
        setFavoriteIds(snapshotRef.current);
        clearUndo();
      }
    }, "Tutte le citazioni rimosse");
  };

  return { handleRemoveAllFavorites, handleRemoveQuote, handleToggleFavorite };
}

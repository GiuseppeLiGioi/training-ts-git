import { PersonalQuoteContext } from "@/context/PersonalQuoteContext";
import { PersonalQuote } from "@/types/quote";
import { useContext, useRef } from "react";
import { moderateScale } from "react-native-size-matters";
import Toast from "react-native-toast-message";
export default function useToastFavorites() {
  const {
    addPersonalQuote,
    removePersonalQuote,
    personalQuotes,
    setPersonalQuotes,
  } = useContext(PersonalQuoteContext);

  const UNDO_TIMEOUT = 4000;

  const snapshotRef = useRef<PersonalQuote[] | null>(null);
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
      text1: message,
      text2: "RIPRISTINA MODIFICHE",
      visibilityTime: UNDO_TIMEOUT,
      onPress: onUndo,
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
    timeoutRef.current = setTimeout(clearUndo, UNDO_TIMEOUT);
  };

  const handleAddPersonalQuote = (
    quote: Omit<PersonalQuote, "id" | "createdAt">
  ) => {
    addPersonalQuote(quote);
    Toast.show({
      type: "success",
      text1: "Citazione personale aggiunta",
      visibilityTime: 1000,
      position: "bottom",
    });
  };

  const handleRemovePersonalQuote = (id: string) => {
    snapshotRef.current = [...personalQuotes];
    removePersonalQuote(id);
    showUndoToast(() => {
      if (snapshotRef.current) {
        setPersonalQuotes(snapshotRef.current);
        clearUndo();
      }
    }, "citazione personale rimossa");
  };

  return { handleAddPersonalQuote, handleRemovePersonalQuote };
}

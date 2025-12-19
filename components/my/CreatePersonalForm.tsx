import useToastPersonalQuotes from "@/hooks/my/useToastPersonalQuotes";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
type CreatePersonalFormProps = {
  onClose: () => void;
};
//colors
const COLOR_PRIMARY = "#22223b";
const COLOR_SECONDARY = "#4a4e69";
const COLOR_ACCENT = "#f2e9b8";
const COLOR_CARD = "#fff";
const COLOR_CARD_BORDER = "#ececec";

export default function CreatePersonalForm({
  onClose,
}: CreatePersonalFormProps) {
  const [description, setDescription] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const { handleAddPersonalQuote } = useToastPersonalQuotes();

  const handleSubmit = () => {
    if (!description.trim()) return;
    handleAddPersonalQuote({ quote: description, author: author || "Anonimo" });
    setDescription("");
    setAuthor("");
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>COMPILA I CAMPI DELLA TUA CITAZIONE</Text>

      <Text style={styles.label}>Testo della citazione</Text>
      <TextInput
        style={styles.input}
        placeholder="Inserisci il testo della citazione..."
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={COLOR_PRIMARY}
      />

      <Text style={styles.label}>Autore (opzionale)</Text>
      <TextInput
        style={styles.input}
        placeholder="Inserisci il nome dell'autore..."
        value={author}
        onChangeText={setAuthor}
        placeholderTextColor={COLOR_PRIMARY}
      />

      <View style={styles.rowButtons}>
        <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
          <Text style={styles.textRemove}>Chiudi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleSubmit}>
          <Text style={styles.textAdd}>Salva</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  label: {
    alignSelf: "flex-start",
    color: COLOR_PRIMARY,
    fontSize: moderateScale(14),
    fontWeight: "600",
    marginBottom: moderateScale(4),
    marginLeft: moderateScale(2),
  },
  input: {
    minWidth: "100%",
    backgroundColor: COLOR_ACCENT,
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(14),
    fontSize: moderateScale(15),
    color: COLOR_PRIMARY,
    borderWidth: 1,
    borderColor: COLOR_CARD_BORDER,
    marginBottom: moderateScale(14),
    shadowColor: COLOR_PRIMARY,
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(3),
    elevation: 1,
  },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(12),
    marginTop: moderateScale(8),
  },
  buttonAdd: {
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
  buttonClose: {
    backgroundColor: COLOR_ACCENT,
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
  textAdd: {
    color: COLOR_ACCENT,
    fontSize: moderateScale(16),
    fontWeight: "700",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  textRemove: {
    color: COLOR_SECONDARY,
    fontSize: moderateScale(16),
    fontWeight: "700",
    letterSpacing: 0.5,
    textAlign: "center",
  },
});

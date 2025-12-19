import CreateBoxQuote from "@/components/my/CreateQuoteBox";
import CreateQuoteModal from "@/components/my/CreateQuoteModal";
import SingleQuote from "@/components/my/SingleQuote";
import { PersonalQuoteContext } from "@/context/PersonalQuoteContext";
import useToastPersonalQuotes from "@/hooks/my/useToastPersonalQuotes";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
export default function Peronals() {
  const { personalQuotes, fetchPersonals, isLoadingPersonals, errorPersonals } =
    useContext(PersonalQuoteContext);
  const { handleRemovePersonalQuote, handleRemoveAllPersonalQuotes } =
    useToastPersonalQuotes();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      try {
        await fetchPersonals();
      } catch (error) {
        console.error(
          "errore nel caricamento delle citazioni personali",
          error
        );
      }
    };
    load();
  }, []);
  return (
    <View style={styles.containerPersonalsQuote}>
      <View style={{ flex: 1 }}>
        <CreateBoxQuote
          title="CREA UNA NUOVA CITAZIONE"
          textButton="CREA CITAZIONE"
          onPress={() => setIsModalVisible(true)}
        />
        {isLoadingPersonals && (
          <Text style={styles.loadingText}>
            Caricamento citazioni personali in corso...
          </Text>
        )}
        {errorPersonals && (
          <Text style={styles.errorText}>
            Errore nel caricamento delle citazioni personali...
          </Text>
        )}
        {!errorPersonals &&
          !isLoadingPersonals &&
          personalQuotes.length > 0 && (
            <FlatList
              data={personalQuotes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <SingleQuote
                  quote={item.quote}
                  author={item.author}
                  onRemove={() => handleRemovePersonalQuote(item.id)}
                />
              )}
            />
          )}
      </View>
      <TouchableOpacity
        style={styles.removeAllButton}
        onPress={() => handleRemoveAllPersonalQuotes()}
      >
        <Text style={styles.textAllButton}>Clear All</Text>
      </TouchableOpacity>
      <CreateQuoteModal
        onClose={() => setIsModalVisible(false)}
        visible={isModalVisible}
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
  containerPersonalsQuote: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(8),
  },
  loadingText: {},
  errorText: {},
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
});

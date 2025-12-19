import CreateBoxQuote from "@/components/my/CreateQuoteBox";
import CreateQuoteModal from "@/components/my/CreateQuoteModal";
import SingleQuote from "@/components/my/SingleQuote";
import { PersonalQuoteContext } from "@/context/PersonalQuoteContext";
import useToastPersonalQuotes from "@/hooks/my/useToastPersonalQuotes";
import { useContext, useState } from "react";
import { FlatList } from "react-native";
export default function Peronals() {
  const { personalQuotes } = useContext(PersonalQuoteContext);
  const { handleRemovePersonalQuote } = useToastPersonalQuotes();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  return (
    <>
      <CreateBoxQuote
        title="CREA UNA NUOVA CITAZIONE"
        textButton="CREA CITAZIONE"
        onPress={() => setIsModalVisible(true)}
      />

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

      <CreateQuoteModal
        onClose={() => setIsModalVisible(false)}
        visible={isModalVisible}
      />
    </>
  );
}

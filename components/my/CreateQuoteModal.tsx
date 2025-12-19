import { Modal, StyleSheet, View } from "react-native";
import CreatePersonalForm from "./CreatePersonalForm";
type CreateQuoteModalprops = {
  visible: boolean;
  onClose: () => void;
};

export default function CreateQuoteModal({
  visible,
  onClose,
}: CreateQuoteModalprops) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <CreatePersonalForm onClose={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
    padding: 12,
  },
});

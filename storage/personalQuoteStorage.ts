import { PersonalQuote } from "@/types/quote";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PERSONALS_KEY = "personals";

export const savePersonals = async (quote: PersonalQuote[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(PERSONALS_KEY, JSON.stringify(quote));
  } catch (error) {
    console.error(error);
  }
};

export const loadPersonals = async (): Promise<PersonalQuote[]> => {
  try {
    const data = await AsyncStorage.getItem(PERSONALS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(
      "errore nella lettura delle citazioni personali dallo storage",
      error
    );
    return [];
  }
};

export const removePersonals = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(PERSONALS_KEY);
  } catch (error) {
    console.error("errore nella rimozione delle citazioni dallo storage:", {
      error,
    });
  }
};

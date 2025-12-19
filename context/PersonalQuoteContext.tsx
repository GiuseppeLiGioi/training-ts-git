import { loadPersonals, savePersonals } from "@/storage/personalQuoteStorage";
import { PersonalQuote } from "@/types/quote";
import { createContext, ReactNode, useState } from "react";

type PersonalContextType = {
  personalQuotes: PersonalQuote[];
  setPersonalQuotes: React.Dispatch<React.SetStateAction<PersonalQuote[]>>;
  addPersonalQuote: (quote: Omit<PersonalQuote, "id" | "createdAt">) => void;
  removePersonalQuote: (id: string) => void;
  fetchPersonals: () => Promise<void>;
  removeAllPersonalQuotes: () => Promise<void>;
  isLoadingPersonals: boolean;
  errorPersonals: string | null;
};
export const PersonalQuoteContext = createContext<PersonalContextType>({
  personalQuotes: [],
  setPersonalQuotes: () => {},
  addPersonalQuote: () => {},
  removePersonalQuote: () => {},
  fetchPersonals: async () => {},
  removeAllPersonalQuotes: async () => {},
  isLoadingPersonals: false,
  errorPersonals: null,
});

export function PersonalQuoteProvider({ children }: { children: ReactNode }) {
  const [personalQuotes, setPersonalQuotes] = useState<PersonalQuote[]>([]);
  const [isLoadingPersonals, setIsLoadingPersonals] = useState<boolean>(false);
  const [errorPersonals, setErrorPersonals] = useState<string | null>(null);

  const fetchPersonals = async (): Promise<void> => {
    setIsLoadingPersonals(true);
    setErrorPersonals(null);
    try {
      const storedPersonals = await loadPersonals();
      setPersonalQuotes(storedPersonals);
    } catch (error) {
      console.error(error);
      setErrorPersonals((error as Error).message);
    } finally {
      setIsLoadingPersonals(false);
    }
  };

  const addPersonalQuote = async (
    quote: Omit<PersonalQuote, "id" | "createdAt">
  ): Promise<void> => {
    const newQuote: PersonalQuote = {
      ...quote,
      id: String(Date.now()),
      createdAt: new Date(),
    };
    const updatedQuotes = [...personalQuotes, newQuote];
    setPersonalQuotes(updatedQuotes);
    await savePersonals(updatedQuotes);
  };

  const removePersonalQuote = async (id: string): Promise<void> => {
    const updatedQuotes = personalQuotes.filter((p) => p.id !== id);
    setPersonalQuotes(updatedQuotes);
    await savePersonals(updatedQuotes);
  };

  const removeAllPersonalQuotes = async (): Promise<void> => {
    setPersonalQuotes([]);
    await savePersonals([]);
  };

  return (
    <PersonalQuoteContext.Provider
      value={{
        personalQuotes,
        setPersonalQuotes,
        addPersonalQuote,
        removePersonalQuote,
        fetchPersonals,
        isLoadingPersonals,
        errorPersonals,
        removeAllPersonalQuotes,
      }}
    >
      {children}
    </PersonalQuoteContext.Provider>
  );
}

import { PersonalQuote } from "@/types/quote";
import { createContext, ReactNode, useState } from "react";

type PersonalContextType = {
  personalQuotes: PersonalQuote[];
  setPersonalQuotes: React.Dispatch<React.SetStateAction<PersonalQuote[]>>;
  addPersonalQuote: (quote: Omit<PersonalQuote, "id" | "createdAt">) => void;
  removePersonalQuote: (id: string) => void;
};
export const PersonalQuoteContext = createContext<PersonalContextType>({
  personalQuotes: [],
  setPersonalQuotes: () => {},
  addPersonalQuote: () => {},
  removePersonalQuote: () => {},
});

export function PersonalQuoteProvider({ children }: { children: ReactNode }) {
  const [personalQuotes, setPersonalQuotes] = useState<PersonalQuote[]>([]);

  const addPersonalQuote = (
    quote: Omit<PersonalQuote, "id" | "createdAt">
  ): void => {
    const newQuote: PersonalQuote = {
      ...quote,
      id: String(Date.now()),
      createdAt: new Date(),
    };
    setPersonalQuotes((prev) => [...prev, newQuote]);
  };

  const removePersonalQuote = (id: string): void => {
    setPersonalQuotes((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PersonalQuoteContext.Provider
      value={{
        personalQuotes,
        setPersonalQuotes,
        addPersonalQuote,
        removePersonalQuote,
      }}
    >
      {children}
    </PersonalQuoteContext.Provider>
  );
}

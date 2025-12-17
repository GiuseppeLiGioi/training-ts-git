import { createContext, ReactNode, useState } from "react";

type FavoritesContextType = {
  toggleFavorite: (id: string) => void;
  favoriteIds: string[];
  removeFavoriteQuote: (id: string) => void;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favoriteIds: [],
  toggleFavorite: () => [],
  removeFavoriteQuote: () => [],
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const toggleFavorite = (id: string): void => {
    if (favoriteIds.includes(id)) {
      setFavoriteIds((prev) => prev.filter((f) => f !== id));
    } else {
      setFavoriteIds((prev) => [...prev, id]);
    }
  };

  const removeFavoriteQuote = (id: string): void => {
    if (favoriteIds.includes(id)) {
      setFavoriteIds((prev) => prev.filter((q) => q !== id));
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ toggleFavorite, favoriteIds, removeFavoriteQuote }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

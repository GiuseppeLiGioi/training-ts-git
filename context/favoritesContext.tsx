import {
  loadFavorites,
  removeFavorites,
  saveFavorites,
} from "@/storage/favoritesStorage";
import { createContext, ReactNode, useState } from "react";
type FavoritesContextType = {
  toggleFavorite: (id: string) => void;
  favoriteIds: string[];
  removeFavoriteQuote: (id: string) => void;
  removeAllFavorites: () => Promise<void>;
  isLoadingFavorites: boolean;
  errorFavorites: string | null;
  fetchFavorites: () => Promise<void>;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favoriteIds: [],
  toggleFavorite: () => {},
  removeFavoriteQuote: () => {},
  removeAllFavorites: async () => {},
  isLoadingFavorites: false,
  errorFavorites: null,
  fetchFavorites: async () => {},
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState<boolean>(false);
  const [errorFavorites, setErrorFavorites] = useState<string | null>(null);

  const fetchFavorites = async (): Promise<void> => {
    setIsLoadingFavorites(true);
    setErrorFavorites(null);
    try {
      const storedIds = await loadFavorites();
      setFavoriteIds(storedIds);
    } catch (error) {
      console.error(error);
      setErrorFavorites((error as Error).message);
    } finally {
      setIsLoadingFavorites(false);
    }
  };

  //toggleFavorite function to set data on LocalState and storage.
  const toggleFavorite = async (id: string): Promise<void> => {
    const newIds = favoriteIds.includes(id)
      ? favoriteIds.filter((p) => p !== id)
      : [...favoriteIds, id];
    setFavoriteIds(newIds);
    await saveFavorites(newIds);
  };

  const removeFavoriteQuote = async (id: string): Promise<void> => {
    if (!favoriteIds.includes(id)) return;
    const newIds = favoriteIds.filter((f) => f !== id);
    setFavoriteIds(newIds);
    await saveFavorites(newIds);
  };

  const removeAllFavorites = async (): Promise<void> => {
    setFavoriteIds([]);
    await removeFavorites();
  };

  return (
    <FavoritesContext.Provider
      value={{
        toggleFavorite,
        favoriteIds,
        removeFavoriteQuote,
        removeAllFavorites,
        isLoadingFavorites,
        errorFavorites,
        fetchFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

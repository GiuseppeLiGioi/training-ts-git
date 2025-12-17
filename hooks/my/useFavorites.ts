import { useState } from "react";

export default function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const toggleFavorite = (id: string): void => {
    if (favoriteIds.includes(id)) {
      setFavoriteIds((prev) => prev.filter((f) => f !== id));
    } else {
      setFavoriteIds((prev) => [...prev, id]);
    }
  };

  return { favoriteIds, toggleFavorite };
}

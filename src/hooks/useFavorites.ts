import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const FAVORITES_STORAGE_KEY = "@pharmacy-popular/favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    async function loadFavorites() {
      const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);

      if (!stored) {
        return;
      }

      setFavorites(JSON.parse(stored) as string[]);
    }

    loadFavorites().catch(() => undefined);
  }, []);

  async function toggleFavorite(medicineId: string) {
    const updatedFavorites = favorites.includes(medicineId)
      ? favorites.filter((id) => id !== medicineId)
      : [...favorites, medicineId];

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
  }

  return {
    favorites,
    toggleFavorite,
  };
}

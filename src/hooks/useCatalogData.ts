import { useEffect, useState } from "react";

import type { Medicine, Pharmacy } from "../types/pharmacy";
import { fetchBootstrapData } from "../services/api";

type CatalogDataState = {
  medicines: Medicine[];
  pharmacies: Pharmacy[];
  isLoading: boolean;
  error: string | null;
};

export function useCatalogData() {
  const [state, setState] = useState<CatalogDataState>({
    medicines: [],
    pharmacies: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const data = await fetchBootstrapData();

        if (!isMounted) {
          return;
        }

        setState({
          medicines: data.medicines,
          pharmacies: data.pharmacies,
          isLoading: false,
          error: null,
        });
      } catch {
        if (!isMounted) {
          return;
        }

        setState((current) => ({
          ...current,
          isLoading: false,
          error: "Nao foi possivel carregar os dados.",
        }));
      }
    }

    void load();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}

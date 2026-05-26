import { useEffect, useState } from "react";

import type { Medicine, Pharmacy } from "../types/pharmacy";
import { API_BASE_URL, fetchBootstrapData } from "../services/api";

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
        const { medicines, pharmacies } = await fetchBootstrapData();

        if (!isMounted) {
          return;
        }

        setState({
          medicines,
          pharmacies,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setState((current) => ({
          ...current,
          isLoading: false,
          error:
            error instanceof Error
              ? `Nao foi possivel carregar os dados da API em ${API_BASE_URL} (${error.message}).`
              : `Nao foi possivel carregar os dados da API em ${API_BASE_URL}.`,
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

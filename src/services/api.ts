import { mockMedicines, mockPharmacies } from "../data/mockData";
import type { Medicine, Pharmacy } from "../types/pharmacy";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:3001/api";

type BootstrapResponse = {
  medicines: Medicine[];
  pharmacies: Pharmacy[];
};

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchBootstrapData(): Promise<BootstrapResponse> {
  try {
    return await requestJson<BootstrapResponse>("/bootstrap");
  } catch (error) {
    console.warn("Falha ao carregar dados da API, usando mocks locais.", error);
    return {
      medicines: mockMedicines,
      pharmacies: mockPharmacies,
    };
  }
}

export { API_BASE_URL };

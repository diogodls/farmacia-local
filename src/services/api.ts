import Constants from "expo-constants";
import { NativeModules, Platform } from "react-native";

import type { Medicine, Pharmacy } from "@/types/pharmacy";

function extractHost(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const trimmedValue = value.trim();
  const withoutProtocol = trimmedValue.replace(/^https?:\/\//i, "");
  const host = withoutProtocol.split(/[/:]/)[0];

  if (!host || host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0") {
    return null;
  }

  return host;
}

function getDevServerHost() {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    return window.location.hostname;
  }

  const expoHost =
    extractHost(Constants.expoConfig?.hostUri) ??
    extractHost((Constants as unknown as { manifest2?: { extra?: { expoGo?: { debuggerHost?: string } } } }).manifest2?.extra?.expoGo?.debuggerHost) ??
    extractHost((Constants as unknown as { manifest?: { debuggerHost?: string } }).manifest?.debuggerHost);

  if (expoHost) {
    return expoHost;
  }

  const scriptURL = NativeModules.SourceCode?.scriptURL;
  return extractHost(typeof scriptURL === "string" ? scriptURL : null);
}

function resolveApiBaseUrl() {
  const configuredUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  const host = getDevServerHost();

  if (host) {
    return `http://${host}:3001/api`;
  }

  return "http://127.0.0.1:3001/api";
}

const API_BASE_URL = resolveApiBaseUrl();

type BootstrapResponse = {
  medicines: Medicine[];
  pharmacies: Pharmacy[];
};

type MedicineQuery = {
  search?: string;
  tipo?: string;
  componente?: string;
  cid?: string;
  activeOnly?: "true" | "false";
  limit?: number;
};

type PharmacyQuery = {
  search?: string;
  cidade?: string;
  medicineId?: string | number;
  limit?: number;
};

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

function toQueryString(query?: Record<string, string | number | undefined>) {
  if (!query) {
    return "";
  }

  const params = Object.entries(query)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join("&");

  return params ? `?${params}` : "";
}

export async function fetchBootstrapData(): Promise<BootstrapResponse> {
  return requestJson<BootstrapResponse>("/bootstrap");
}

export async function fetchMedicines(query?: MedicineQuery): Promise<Medicine[]> {
  return requestJson<Medicine[]>(`/medicines${toQueryString(query)}`);
}

export async function fetchMedicineById(id: string | number): Promise<Medicine> {
  return requestJson<Medicine>(`/medicines/${id}`);
}

export async function fetchPharmacies(query?: PharmacyQuery): Promise<Pharmacy[]> {
  const normalizedQuery = query?.medicineId
    ? { ...query, medicineId: String(query.medicineId) }
    : query;
  return requestJson<Pharmacy[]>(`/pharmacies${toQueryString(normalizedQuery)}`);
}

export async function fetchPharmacyById(id: string | number): Promise<Pharmacy> {
  return requestJson<Pharmacy>(`/pharmacies/${id}`);
}

export async function fetchCids(): Promise<{ codigo: string; descricao: string; categoria: string | null }[]> {
  return requestJson<{ codigo: string; descricao: string; categoria: string | null }[]>("/cids");
}

export { API_BASE_URL };

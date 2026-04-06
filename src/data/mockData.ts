import mockBackend from "./mockBackend.json";
import type { Medicine, Pharmacy } from "../types/pharmacy";

export const mockMedicines = mockBackend.medicines as Medicine[];
export const mockPharmacies = mockBackend.pharmacies as Pharmacy[];
